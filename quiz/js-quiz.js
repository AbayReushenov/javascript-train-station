const process = require('process')
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const questions = [
    // Раздел 1
    {
        q: '1. Что выведет выражение `typeof null`?',
        options: ["a) 'null'", "b) 'undefined'", "c) 'object'", "d) 'null' (но с приведением типов)"],
        answer: 'c',
        expl: "Исторический баг JS: typeof null возвращает 'object'.",
    },
    {
        q: '2. В чём разница между `==` и `===`?',
        options: [
            'a) `==` не существует, это опечатка',
            'b) `==` выполняет приведение типов, `===` — нет',
            'c) `===` всегда возвращает false для строк',
            'd) Оба одинаковы, но `===` медленнее',
        ],
        answer: 'b',
        expl: 'Строгое сравнение `===` не приводит типы, в отличие от `==`.',
    },
    {
        q: "3. Что выведет `0 || 'Hello'`?",
        options: ['a) 0', "b) 'Hello'", 'c) false', 'd) undefined'],
        answer: 'b',
        expl: 'Оператор || возвращает первый truthy-операнд; 0 — falsy.',
    },
    {
        q: '4. Для чего предназначен оператор `??` (нулевое слияние)?',
        options: [
            'a) Выбирает правый операнд, если левый falsy',
            'b) Выбирает правый операнд, если левый null или undefined',
            'c) Эквивалентно `||`, но только для чисел',
            'd) Для слияния строк',
        ],
        answer: 'b',
        expl: '?? проверяет только null/undefined, в отличие от ||.',
    },
    {
        q: "5. Что выведет `'5' - 2`?",
        options: ["a) '3'", 'b) 3', "c) '52'", 'd) NaN'],
        answer: 'b',
        expl: 'Минус приводит строку к числу.',
    },
    {
        q: '6. Какой приоритет у операторов `&&` и `||`?',
        options: [
            'a) `||` выше `&&`',
            'b) `&&` выше `||`',
            'c) Они равны, левоассоциативны',
            'd) `&&` правоассоциативен',
        ],
        answer: 'b',
        expl: '`&&` имеет более высокий приоритет, чем `||`.',
    },
    {
        q: "7. Что выведет `true && false ? 'a' : 'b'`?",
        options: ["a) 'a'", "b) 'b'", 'c) false', 'd) undefined'],
        answer: 'b',
        expl: "true && false = false, false ? 'a' : 'b' = 'b'.",
    },
    {
        q: "8. Что вернёт `Number('  123  ')`?",
        options: ['a) NaN', 'b) 123', "c) '123'", 'd) 0'],
        answer: 'b',
        expl: 'Number() игнорирует пробелы.',
    },
    {
        q: '9. В чём особенность оператора `+` для разных типов?',
        options: [
            'a) Всегда арифметика',
            'b) Для строк — конкатенация, для чисел — сложение',
            'c) Только для boolean',
            'd) Вызывает ошибку при смешанных типах',
        ],
        answer: 'b',
        expl: 'Если один операнд — строка, + конкатенирует.',
    },
    {
        q: '10. Что выведет `[] == 0`?',
        options: ['a) false', 'b) true (из-за приведения к числу)', 'c) 0', 'd) TypeError'],
        answer: 'b',
        expl: "[] приводится к '' (пустая строка), '' == 0 → true.",
    },
    {
        q: '11. Какой оператор используется для строгого сравнения?',
        options: ['a) ==', 'b) !=', 'c) ===', 'd) ||'],
        answer: 'c',
        expl: '=== сравнивает значение и тип.',
    },
    {
        q: '12. Что выведет `NaN === NaN`?',
        options: ['a) true', 'b) false', 'c) undefined', 'd) NaN'],
        answer: 'b',
        expl: 'NaN не равен самому себе по спецификации IEEE 754.',
    },

    // Раздел 2
    {
        q: '13. Сколько примитивных типов данных в JavaScript?',
        options: ['a) 5', 'b) 6', 'c) 7', 'd) 8 (включая object)'],
        answer: 'c',
        expl: 'number, string, boolean, null, undefined, symbol, bigint.',
    },
    {
        q: "14. Какой тип данных имеет `typeof 'hello'`?",
        options: ["a) 'string'", "b) 'text'", "c) 'object'", "d) 'primitive'"],
        answer: 'a',
        expl: "typeof возвращает 'string' для строк.",
    },
    {
        q: '15. Что является falsy-значениями в JavaScript?',
        options: [
            'a) Только false и 0',
            "b) 0, '', null, undefined, NaN",
            'c) Все числа меньше 1',
            "d) [], {}, 'false'",
        ],
        answer: 'b',
        expl: 'Эти значения в boolean-контексте дают false.',
    },
    {
        q: '16. Чем отличается null от undefined?',
        options: [
            'a) null — примитив, undefined — объект',
            'b) null — намеренное отсутствие, undefined — неинициализировано',
            'c) Они полностью равны даже по `===`',
            'd) undefined falsy, null — truthy',
        ],
        answer: 'b',
        expl: 'Семантическая разница; null == undefined, но !==.',
    },
    {
        q: '17. Что выведет `typeof []`?',
        options: ["a) 'array'", "b) 'object'", "c) 'list'", "d) 'undefined'"],
        answer: 'b',
        expl: 'Массивы — объекты; используйте Array.isArray.',
    },
    {
        q: '18. Для чего используется BigInt?',
        options: [
            'a) Для дробных чисел',
            'b) Для целых произвольной точности',
            'c) Для строк длиннее 100 символов',
            'd) Только для символов',
        ],
        answer: 'b',
        expl: 'BigInt для больших целых, суффикс n.',
    },
    {
        q: '19. Как проверить, является ли значение массивом?',
        options: [
            "a) `typeof arr === 'array'`",
            'b) `Array.isArray(arr)`',
            'c) `arr instanceof Array` (но с оговорками)',
            'd) a и b верны, но c нет',
        ],
        answer: 'b',
        expl: 'Array.isArray — надёжный способ.',
    },
    {
        q: '20. Что вернёт `Boolean([])`?',
        options: ['a) false', 'b) true', 'c) undefined', 'd) []'],
        answer: 'b',
        expl: 'Пустой массив truthy.',
    },
    {
        q: '21. Какой тип у Symbol?',
        options: ["a) 'symbol'", "b) 'uniqueid'", "c) 'object'", "d) 'string' (при преобразовании)"],
        answer: 'a',
        expl: "typeof Symbol() === 'symbol'.",
    },
    {
        q: '22. Почему `0.1 + 0.2 !== 0.3`?',
        options: [
            'a) Из-за неточности плавающей точки',
            'b) JavaScript не поддерживает дроби',
            'c) Ошибка в синтаксисе',
            'd) Всегда точно в JS',
        ],
        answer: 'a',
        expl: 'Number использует double-precision float.',
    },
    {
        q: "23. Что выведет `String(Symbol('id'))`?",
        options: ["a) 'id'", 'b) Symbol(id) (как описание)', 'c) TypeError', 'd) undefined'],
        answer: 'c',
        expl: 'Symbol не может быть преобразован в строку неявно; используйте .toString().',
    },
    {
        q: '24. Какой метод для детального определения типа объекта?',
        options: [
            'a) `typeof`',
            'b) `Object.prototype.toString.call(obj)`',
            'c) `instanceof`',
            'd) Все вышеперечисленные',
        ],
        answer: 'b',
        expl: 'toString.call возвращает [object Array], etc.',
    },

    // Раздел 3
    {
        q: '25. В чём разница между `let` и `var`?',
        options: [
            'a) `let` поднимается, `var` — нет',
            'b) `let` блочная область, `var` — функциональная',
            'c) `const` равен `let`',
            'd) `var` нельзя переопределять',
        ],
        answer: 'b',
        expl: '`let` уважает блоки {}, `var` — нет.',
    },
    {
        q: '26. Что такое hoisting?',
        options: [
            'a) Подъём объявлений переменных и функций',
            'b) Ошибка в JavaScript',
            'c) Только для const',
            'd) Для стрелочных функций',
        ],
        answer: 'a',
        expl: 'Объявления перемещаются в начало области.',
    },
    {
        q: '27. Что вернёт функция без `return`?',
        options: ['a) null', 'b) undefined', 'c) 0', "d) 'empty'"],
        answer: 'b',
        expl: 'По умолчанию возвращает undefined.',
    },
    {
        q: '28. Как объявить стрелочную функцию?',
        options: ['a) `function () {}`', 'b) `() => {}`', 'c) `const fn = new Function()`', 'd) Только a'],
        answer: 'b',
        expl: 'Стрелочные функции — ES6-синтаксис.',
    },
    {
        q: '29. Что такое `this` в стрелочной функции?',
        options: [
            'a) undefined',
            'b) Лексическое из внешней области',
            'c) Аргумент функции',
            'd) Всегда global объект',
        ],
        answer: 'b',
        expl: 'this не привязывается, берётся из лексической среды.',
    },
    {
        q: '30. В чём Temporal Dead Zone (TDZ)?',
        options: [
            'a) Область, где let/const недоступны до объявления',
            'b) Только для var',
            'c) Для функций',
            'd) Не существует в JS',
        ],
        answer: 'a',
        expl: 'Ссылка на let/const до init → ReferenceError.',
    },
    {
        q: '31. Какой тип объявления функции поднимается полностью?',
        options: ['a) Function Expression', 'b) Arrow Function', 'c) Function Declaration', 'd) Все'],
        answer: 'c',
        expl: "Function Declaration hoist'ится целиком.",
    },
    {
        q: '32. Что такое замыкание?',
        options: [
            'a) Функция внутри функции',
            'b) Функция, помнящая внешние переменные',
            'c) Ошибка ссылки на this',
            'd) Только для var',
        ],
        answer: 'b',
        expl: 'Замыкание захватывает лексическое окружение.',
    },
    {
        q: '33. Можно ли использовать `new` со стрелочной функцией?',
        options: [
            'a) Да, как конструктор',
            'b) Нет, syntax error',
            'c) Только если с bind',
            'd) Да, но this игнорируется',
        ],
        answer: 'b',
        expl: 'Стрелки не предназначены для new.',
    },
    {
        q: '34. Как объявить константу?',
        options: ['a) `var x = 1`', 'b) `let x = 1`', 'c) `const x = 1`', 'd) `x = 1` (без ключевого слова)'],
        answer: 'c',
        expl: 'const предотвращает переназначение.',
    },
    {
        q: '35. Что выведет `console.log(a)` до `let a = 1` в том же блоке?',
        options: ['a) undefined', 'b) ReferenceError (TDZ)', 'c) 0', 'd) null'],
        answer: 'b',
        expl: 'Temporal Dead Zone для let/const.',
    },
]

let current = 0
let score = 0

function askQuestion() {
    if (current >= questions.length) {
        console.log(
            '\nТест завершён! Ваш счёт: ' +
                score +
                '/' +
                questions.length +
                ' (' +
                ((score / questions.length) * 100).toFixed(1) +
                '%)'
        )
        rl.close()
        return
    }

    const q = questions[current]
    console.log('\n' + q.q)
    q.options.forEach(function (opt) {
        console.log(opt)
    })

    rl.question('Ваш ответ (a/b/c/d) или q для выхода: ', function (answer) {
        const userAnswer = answer.toLowerCase().trim()
        if (userAnswer === 'q') {
            console.log('\nТест прерван. Счёт: ' + score + '/' + current)
            rl.close()
            return
        }
        if (userAnswer === q.answer) {
            score++
            console.log('Правильно!')
        } else {
            console.log('Неправильно. Правильный ответ: ' + q.answer + '. Объяснение: ' + q.expl)
        }
        current++
        // Небольшая задержка для читаемости
        setTimeout(askQuestion, 500)
    })
}

console.log('Начало теста по базовому JavaScript. Отвечайте a, b, c или d.\n')
askQuestion()
