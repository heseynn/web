
const bank = {
    easy: [
        new ChoiceQuestion("radio", "Який тип має значення false?", ["boolean", "number", "string"], ["boolean"]),
        new ChoiceQuestion("radio", "Що поверне document.getElementById('name'), якщо такого елемента немає?", ["null", "0", "порожній рядок"], ["null"]),
        new ChoiceQuestion("radio", "Чому дорівнює вираз 2 + '3'?", ["Рядок '23'", "Число 5", "Число 23"], ["Рядок '23'"]),
        new ChoiceQuestion("checkbox", "Оберіть ключові слова для оголошення змінних у JavaScript.", ["let", "const", "int", "define"], ["let", "const"]),
        new ChoiceQuestion("checkbox", "Які елементи форми мають властивість value?", ["input", "textarea", "h1", "footer"], ["input", "textarea"]),
        new ChoiceQuestion("select", "Яка властивість показує, чи позначено прапорець?", ["checked", "value", "disabled"], ["checked"]),
        new ChoiceQuestion("select", "Який знак використовують для доступу до властивості за записом user.name?", ["Крапку", "Кому", "Двокрапку"], ["Крапку"]),
        new TextQuestion("code", "Оголосіть змінну score через let і надайте їй число 0.", ["let score = 0"]),
        new TextQuestion("code", "Запишіть вираз, що читає властивість name об’єкта student.", ["student.name", "student['name']"]),
        new TextQuestion("blank", "Впишіть назву властивості, щоб прочитати текст із поля.\nconst name = input.____;", ["value"]),
        new TextQuestion("blank", "Впишіть ключове слово для оголошення функції.\n____ show() { return 1; }", ["function"]),
        new TextQuestion("debug", "Виправте регістр назви методу. Запишіть весь рядок.\nconsole.Log(5);", ["console.log(5)"]),
        new TextQuestion("debug", "Виправте службове слово. Запишіть весь рядок.\nlett group = 'ТР-51';", ["let group = 'ТР-51'"]),
        new MatchQuestion("Поєднайте елемент форми з його призначенням.", [
            ["textarea", "Багаторядкове введення"], ["select", "Випадаючий список"], ["button", "Кнопка"]
        ]),
        new MatchQuestion("Поєднайте значення з його типом.", [
            ["42", "number"], ["'Київ'", "string"], ["true", "boolean"]
        ])
    ],
    medium: [
        new ChoiceQuestion("radio", "Що поверне [2, 4, 6].find(n => n > 3)?", ["4", "6", "[4, 6]"], ["4"]),
        new ChoiceQuestion("radio", "Яке значення отримає b?\nconst a = { n: 1 }; const copy = a; copy.n = 3; const b = a.n;", ["3", "1", "undefined"], ["3"]),
        new ChoiceQuestion("radio", "Яка подія виникає на формі під час її відправлення?", ["submit", "input", "load"], ["submit"]),
        new ChoiceQuestion("checkbox", "Які методи створюють новий масив?", ["map", "filter", "push", "forEach"], ["map", "filter"]),
        new ChoiceQuestion("checkbox", "Які команди додадуть клас active, якщо зараз його немає?", ["box.classList.add('active')", "box.classList.toggle('active')", "box.classList.contains('active')", "box.classList.remove('active')"], ["box.classList.add('active')", "box.classList.toggle('active')"]),
        new ChoiceQuestion("select", "Яким методом отримати всі елементи, що відповідають CSS-селектору?", ["querySelectorAll", "querySelector", "getElementById"], ["querySelectorAll"]),
        new ChoiceQuestion("select", "Що поверне form.checkValidity(), якщо обов’язкове текстове поле порожнє й активне?", ["false", "true", "null"], ["false"]),
        new TextQuestion("code", "Запишіть виклик методу масиву names, який додає в кінець рядок 'Оля'.", ["names.push('Оля')"]),
        new TextQuestion("code", "Змініть текст елемента title на 'Готово' через textContent.", ["title.textContent = 'Готово'"]),
        new TextQuestion("blank", "Впишіть метод, який залишає лише додатні числа.\nconst positive = nums.____(n => n > 0);", ["filter"]),
        new TextQuestion("blank", "Заповніть пропуск назвою властивості.\nconst user = { age: 19 };\nconst { ____ } = user;\nconsole.log(age);", ["age"]),
        new TextQuestion("debug", "Виправте виклик методу, який скасовує стандартну дію події.\nevent.preventdefault();", ["event.preventDefault()"]),
        new TextQuestion("debug", "Потрібно знайти елемент саме за класом note. Виправте селектор і запишіть весь виклик.\ndocument.querySelector('note');", ["document.querySelector('.note')"]),
        new MatchQuestion("Поєднайте метод масиву з результатом його роботи.", [
            ["map", "Масив перетворених значень"], ["find", "Перший відповідний елемент або undefined"], ["some", "Чи виконується умова хоча б для одного елемента"]
        ]),
        new MatchQuestion("Поєднайте властивість із даними, які вона містить.", [
            ["event.target", "Елемент, на якому виникла подія"], ["form.elements", "Колекція елементів форми"], ["select.value", "Значення вибраної опції"]
        ])
    ],
    hard: [
        new ChoiceQuestion("radio", "Що виведе цей код?\nconst a = [1, 2, 3];\nconsole.log(a.filter(n => n > 1).reduce((s, n) => s + n, 0));", ["5", "6", "[2, 3]"], ["5"]),
        new ChoiceQuestion("radio", "Користувач натиснув span усередині button. Обробник click задано на батьківському ul. Що містить event.currentTarget всередині цього обробника?", ["ul", "span", "button"], ["ul"]),
        new ChoiceQuestion("radio", "Що поверне new Student().label()?\nclass User { label() { return 'U'; } }\nclass Student extends User { label() { return super.label() + 'S'; } }", ["'US'", "'S'", "'SU'"], ["'US'"]),
        new ChoiceQuestion("checkbox", "Після виконання обох рядків які твердження правильні?\nconst a = { points: 1 };\nconst b = a; b.points = 5;", ["a.points дорівнює 5", "a === b дає true", "a.points дорівнює 1", "b є незалежною копією a"], ["a.points дорівнює 5", "a === b дає true"]),
        new ChoiceQuestion("checkbox", "Обробник submit викликав event.preventDefault(). Які твердження правильні?", ["Стандартне відправлення форми скасовано", "Наступні рядки обробника виконуються", "Браузер автоматично очищає поля", "Подія автоматично припиняє спливати"], ["Стандартне відправлення форми скасовано", "Наступні рядки обробника виконуються"]),
        new ChoiceQuestion("select", "У localStorage за ключем user лежить рядок з коректним JSON-об’єктом. Що поверне саме об’єкт?", ["JSON.parse(localStorage.getItem('user'))", "localStorage.getItem('user')", "JSON.stringify('user')"], ["JSON.parse(localStorage.getItem('user'))"]),
        new ChoiceQuestion("select", "До списку після завантаження додають нові кнопки. Де закріпити один обробник click, щоб використати спливання?", ["На спільному батьківському списку", "Лише на першій кнопці", "На об’єкті localStorage"], ["На спільному батьківському списку"]),
        new TextQuestion("code", "Запишіть виклик setItem, який збереже об’єкт result як JSON під ключем 'last' у localStorage.", ["localStorage.setItem('last', JSON.stringify(result))"]),
        new TextQuestion("code", "Одним рядком через const і деструктуризацію отримайте властивість points об’єкта result у змінну score.", ["const { points: score } = result"]),
        new TextQuestion("blank", "Впишіть один вираз для числового сортування за спаданням.\nnums.sort((a, b) => ____);", ["b - a"]),
        new TextQuestion("blank", "Чим викликати конструктор батьківського класу? Впишіть одне слово.\nclass Student extends User {\n    constructor(name) { ____(name); }\n}", ["super"]),
        new TextQuestion("debug", "Стрілкова функція в map повертає undefined. Замініть блок після стрілки виразом і запишіть виправлений виклик.\nnums.map(n => { n * 2; });", ["nums.map(n => n * 2)", "nums.map((n) => n * 2)", "nums.map(n => (n * 2))", "nums.map((n) => (n * 2))"]),
        new TextQuestion("debug", "Для перевірки порожнього рядка потрібне строге порівняння. Виправте лише оператор і запишіть весь рядок.\nif (field.value = '') return;", ["if (field.value === '') return"]),
        new MatchQuestion("Поєднайте етап перетягування з дією обробника.", [
            ["dragstart", "Записати значення через setData"], ["dragover", "Дозволити скидання через preventDefault"], ["drop", "Прочитати значення та застосувати відповідь"]
        ]),
        new MatchQuestion("До кожного виразу підберіть значення, якщо const a = [2, 4, 6].", [
            ["a.find(n => n > 2)", "4"], ["a.filter(n => n > 2).length", "2"], ["a.reduce((s, n) => s + n, 0)", "12"]
        ])
    ]
};
