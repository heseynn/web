
function shuffle(items) {
    const copy = items.slice();
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = copy[i];
        copy[i] = copy[j];
        copy[j] = temp;
    }
    return copy;
}

function makeElement(tag, text) {
    const element = document.createElement(tag);
    element.textContent = text;
    return element;
}

function fillSelect(select, values) {
    select.add(new Option("Оберіть відповідь", ""));
    values.forEach(value => select.add(new Option(value, value)));
}

class Question {
    constructor(type, prompt) {
        this.type = type;
        this.prompt = prompt;
    }

    render(number) {
        const block = document.createElement("fieldset");
        block.appendChild(makeElement("legend", "Завдання " + number));
        const prompt = makeElement("p", this.prompt);
        prompt.className = "prompt";
        block.appendChild(prompt);
        return block;
    }
}


class ChoiceQuestion extends Question {
    constructor(type, prompt, options, answers) {
        super(type, prompt);
        this.options = options;
        this.answers = answers;
    }

    render(number) {
        const block = super.render(number);
        const options = shuffle(this.options);
        if (this.type === "select") {
            const select = document.createElement("select");
            select.setAttribute("aria-label", this.prompt);
            fillSelect(select, options);
            block.appendChild(select);
        } else {
            options.forEach(value => {
                const label = document.createElement("label");
                label.className = "choice";
                const input = document.createElement("input");
                input.type = this.type;
                input.name = "question-" + number;
                input.value = value;
                label.append(input, value);
                block.appendChild(label);
            });
        }
        return block;
    }

    check(block) {
        if (this.type === "select") {
            return block.querySelector("select").value === this.answers[0];
        }
        const checked = Array.from(block.querySelectorAll("input:checked"));
        // Сортування дозволяє порівняти вибір незалежно від порядку варіантів.
        const chosen = checked.map(input => input.value).sort();
        const expected = this.answers.slice().sort();
        return chosen.length === expected.length &&
            chosen.every((value, index) => value === expected[index]);
    }

    solution() {
        return this.answers.join(", ");
    }
}

class TextQuestion extends Question {
    constructor(type, prompt, answers) {
        super(type, prompt);
        this.answers = answers;
    }

    static normalize(value) {
        const code = value.trim().replace(/;$/, "");
        const parts = code.match(/'[^'\n]*'|"[^"\n]*"|[\w$\u0400-\u04ff]+|===|=>|\+\+|--|\S/g) || [];
        return JSON.stringify(parts.map(part => {
            if (part.startsWith('"')) {
                return "'" + part.slice(1, -1) + "'";
            }
            return part;
        }));
    }

    render(number) {
        const block = super.render(number);
        const input = document.createElement(this.type === "blank" ? "input" : "textarea");
        input.className = "entry";
        input.setAttribute("aria-label", this.prompt);
        input.spellcheck = false;
        block.appendChild(input);
        const feedback = makeElement("p", "");
        feedback.className = "feedback";
        feedback.setAttribute("aria-live", "polite");
        block.appendChild(feedback);
        return block;
    }

    check(block) {
        const value = TextQuestion.normalize(block.querySelector(".entry").value);
        return this.answers.some(answer => TextQuestion.normalize(answer) === value);
    }

    solution() {
        return this.answers[0];
    }
}

class MatchQuestion extends Question {
    constructor(prompt, pairs) {
        super("match", prompt);
        this.pairs = pairs;
    }

    render(number) {
        const block = super.render(number);
        block.appendChild(makeElement("p", "Перетягніть відповіді до відповідних рядків або виберіть їх зі списків."));
        const tokens = document.createElement("div");
        tokens.className = "tokens";
        const values = shuffle(this.pairs.map(pair => pair[1]));
        values.forEach(value => {
            const token = makeElement("span", value);
            token.className = "token";
            token.draggable = true;
            token.addEventListener("dragstart", event => {
                event.dataTransfer.setData("text/plain", value);
            });
            tokens.appendChild(token);
        });
        block.appendChild(tokens);
        shuffle(this.pairs).forEach(([term]) => {
            const row = makeElement("label", term);
            row.className = "pair";
            const select = document.createElement("select");
            select.dataset.term = term;
            fillSelect(select, values);
            row.appendChild(select);
            row.addEventListener("dragover", event => event.preventDefault());
            row.addEventListener("drop", event => {
                event.preventDefault();
                const value = event.dataTransfer.getData("text/plain");
                if (values.includes(value)) select.value = value;
            });
            block.appendChild(row);
        });
        return block;
    }

    check(block) {
        const selects = Array.from(block.querySelectorAll("select"));
        return selects.every(select => {
            const pair = this.pairs.find(item => item[0] === select.dataset.term);
            return select.value === pair[1];
        });
    }

    solution() {
        return this.pairs.map(([term, value]) => term + " — " + value).join("; ");
    }
}

class Quiz {
    constructor(pool) {
        const selected = [];
        const mixed = shuffle(pool);
        mixed.forEach(question => {
            if (!selected.find(item => item.type === question.type)) selected.push(question);
        });
        const remaining = mixed.filter(question => !selected.includes(question));
        this.questions = shuffle(selected.concat(remaining.slice(0, 10 - selected.length)));
    }

    render(container) {
        container.textContent = "";
        this.questions.forEach((question, index) => {
            container.appendChild(question.render(index + 1));
        });
    }

    grade(blocks) {
        return this.questions.map((question, index) => question.check(blocks[index]));
    }
}

const start = document.getElementById("start");
const startForm = document.getElementById("start-form");
const test = document.getElementById("test");
const container = document.getElementById("questions");
const result = document.getElementById("result");
const previous = document.getElementById("previous");
const storageKey = "lr4-variant15-results";
let quiz;
let results = [];

var pointsPerAnswer = 1;

function describe(record) {
    const {student, group, level, points, total} = record;
    return student + " (" + group + "), " + level + " рівень — " + points + " із " + total + " балів.";
}

function showPrevious() {
    if (results.length === 0) return;
    previous.textContent = "Остання спроба: " + describe(results[results.length - 1]);
    previous.hidden = false;
}


try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (Array.isArray(saved)) results = saved.filter(record => record && typeof record.points === "number");
    showPrevious();
} catch {
    previous.hidden = true;
}

startForm.addEventListener("input", event => event.target.setCustomValidity(""));
startForm.addEventListener("submit", event => {
    event.preventDefault();
    for (const field of [startForm.elements.student, startForm.elements.group]) {
        field.value = field.value.trim();
        if (field.value.length === 0) {
            field.setCustomValidity("Заповніть це поле.");
            field.reportValidity();
            return;
        }
    }
    const level = startForm.elements.level;
    quiz = new Quiz(bank[level.value]);
    quiz.render(container);
    document.getElementById("test-heading").textContent = level.selectedOptions[0].text + " рівень";
    start.hidden = true;
    test.hidden = false;
    document.getElementById("test-heading").focus();
});


container.addEventListener("input", event => {
    if (!event.target.matches(".entry")) return;
    const block = event.target.closest("fieldset");
    const index = Array.from(container.children).indexOf(block);
    const feedback = block.querySelector(".feedback");
    if (!event.target.value.trim()) {
        feedback.textContent = "";
        return;
    }
    const correct = quiz.questions[index].check(block);
    feedback.textContent = correct ? "Правильно." : "Поки що відповідь не збігається зі зразком.";
    feedback.style.color = correct ? "#166534" : "#9a3412";
});

test.addEventListener("submit", event => {
    event.preventDefault();
    const grades = quiz.grade(container.children);
    const points = grades.reduce((sum, correct) => sum + (correct ? pointsPerAnswer : 0), 0);
    const level = startForm.elements.level;
    const record = {
        student: startForm.elements.student.value,
        group: startForm.elements.group.value,
        level: level.selectedOptions[0].text,
        points: points,
        total: grades.length
    };
    document.getElementById("score").textContent = describe(record);
    const review = document.getElementById("review");
    review.textContent = "";
    quiz.questions.forEach((question, index) => {
        const item = makeElement("li", question.prompt + " — ");
        item.appendChild(makeElement("strong", grades[index] ? "Правильно." : "0 балів."));
        if (!grades[index]) item.append(" Правильна відповідь: " + question.solution());
        review.appendChild(item);
    });
    results.push(record);
    try {
        localStorage.setItem(storageKey, JSON.stringify(results));
        document.getElementById("storage-note").hidden = true;
    } catch {
        document.getElementById("storage-note").hidden = false;
    }
    test.hidden = true;
    result.hidden = false;
    document.getElementById("result-heading").focus();
});

document.getElementById("again").addEventListener("click", () => {
    result.hidden = true;
    start.hidden = false;
    showPrevious();
    startForm.elements.student.focus();
});
