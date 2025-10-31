const process = require('process')
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const questions = [
    // Раздел 1: Объекты и массивы
    {
        q: '1. Как создать пустой массив в JavaScript?',
        options: ['a) new Object()', 'b) []', 'c) new Array(0)', 'd) {}'],
        answer: 'b',
        expl: '[] — литерал массива, простой и эффективный способ.',
    },
    {
        q: '2. Что вернёт `arr.length` для массива `arr = [1, 2, 3]`?',
        options: ['a) 3', 'b) 4 (считая индекс 0)', 'c) undefined', "d) 'length'"],
        answer: 'a',
        expl: 'length возвращает количество элементов.',
    },
    {
        q: '3. Как добавить элемент в конец массива?',
        options: ["a) arr.unshift('x')", "b) arr.push('x')", "c) arr.pop('x')", "d) arr.shift('x')"],
        answer: 'b',
        expl: 'push добавляет в конец.',
    },
    {
        q: '4. Что делает метод `arr.splice(1, 2)` для массива `[1, 2, 3, 4]`?',
        options: [
            'a) Удаляет первый элемент',
            'b) Удаляет элементы с индекса 1, количество 2: возвращает [2, 3]',
            'c) Добавляет 1 и 2 в начало',
            'd) Разворачивает массив',
        ],
        answer: 'b',
        expl: 'splice удаляет/вставляет по индексу.',
    },
    {
        q: '5. Как создать объект с свойствами?',
        options: ["a) new Array({name: 'John'})", "b) {name: 'John', age: 30}", 'c) []', "d) 'name: John'"],
        answer: 'b',
        expl: '{} — литерал объекта.',
    },
    {
        q: "6. Что вернёт `obj.hasOwnProperty('key')`?",
        options: [
            'a) true, если ключ существует в объекте (не в прототипе)',
            'b) Значение свойства',
            'c) Все ключи объекта',
            'd) false всегда',
        ],
        answer: 'a',
        expl: 'Проверяет собственные свойства.',
    },
    {
        q: '7. Как получить все ключи объекта?',
        options: ['a) Object.values(obj)', 'b) Object.keys(obj)', 'c) Object.entries(obj)', 'd) obj.length'],
        answer: 'b',
        expl: 'keys возвращает массив ключей.',
    },
    {
        q: '8. Что делает `arr.map(x => x * 2)` для `[1, 2, 3]`?',
        options: ['a) [1, 2, 3]', 'b) [2, 4, 6]', 'c) Удаляет элементы', 'd) Сортирует'],
        answer: 'b',
        expl: 'map преобразует каждый элемент.',
    },
    {
        q: '9. Разница между `Object.assign({}, obj)` и `{...obj}`?',
        options: [
            'a) Оба создают глубокую копию',
            'b) Оба поверхностные; spread — ES6',
            'c) assign модифицирует оригинал',
            'd) Нет разницы',
        ],
        answer: 'b',
        expl: 'Оба поверхностные, spread короче.',
    },
    {
        q: '10. Что вернёт `arr.filter(x => x > 1)` для `[0, 1, 2]`?',
        options: ['a) [0, 1, 2]', 'b) [^2]', 'c) [1, 2]', 'd) undefined'],
        answer: 'b',
        expl: 'filter оставляет элементы по условию.',
    },
    {
        q: '11. Как удалить свойство из объекта?',
        options: ['a) delete obj.prop', "b) obj.pop('prop')", "c) obj.splice('prop')", 'd) obj = {}'],
        answer: 'a',
        expl: 'delete удаляет свойства.',
    },
    {
        q: '12. Что делает `arr.reduce((sum, x) => sum + x, 0)` для `[1, 2, 3]`?',
        options: ['a) [1, 3, 6]', 'b) 6', "c) '123'", 'd) [^6]'],
        answer: 'b',
        expl: 'reduce аккумулирует значение.',
    },
    {
        q: '13. Как проверить, пустой ли объект?',
        options: [
            'a) Object.keys(obj).length === 0',
            'b) obj.length === 0',
            'c) obj === {}',
            'd) a и c (но c ненадёжно)',
        ],
        answer: 'a',
        expl: 'keys.length — надёжно.',
    },
    {
        q: '14. Что вернёт `JSON.stringify({a: 1})`?',
        options: ["a) '{a: 1}'", 'b) \'{"a":1}\'', 'c) [a:1]', 'd) undefined'],
        answer: 'b',
        expl: 'Преобразует в JSON-строку.',
    },
    {
        q: '15. Разница между массивом и объектом?',
        options: [
            'a) Массив — упорядоченный, индексы числовые; объект — ключ-значение',
            'b) Нет разницы, оба коллекции',
            'c) Объект всегда массив',
            'd) Массив не может содержать объекты',
        ],
        answer: 'a',
        expl: 'Массивы — специальные объекты с числовыми ключами.',
    },
    {
        q: '16. Что делает `arr.forEach(console.log)` для `[1, 2]`?',
        options: ['a) Выводит 1 0, 2 1 (элемент, индекс)', 'b) Только элементы: 1, 2', 'c) Ничего', 'd) Ошибку'],
        answer: 'a',
        expl: 'forEach передаёт элемент, индекс, массив.',
    },

    // Раздел 2: Работа с сетью
    {
        q: '17. Что такое Fetch API?',
        options: [
            'a) Метод для локального хранения',
            'b) Современный способ HTTP-запросов (Promise-based)',
            'c) Для рендеринга HTML',
            'd) Устаревший XMLHttpRequest',
        ],
        answer: 'b',
        expl: 'Fetch — нативный API для сетевых запросов.',
    },
    {
        q: '18. Как сделать GET-запрос с fetch?',
        options: [
            'a) fetch(url).then(res => res.json())',
            "b) fetch(url, {method: 'GET'})",
            "c) XMLHttpRequest.open('GET')",
            'd) a и b верны',
        ],
        answer: 'd',
        expl: 'Оба способа работают; method по умолчанию GET.',
    },
    {
        q: '19. Что возвращает `fetch(url)`?',
        options: ['a) JSON напрямую', 'b) Promise<Response>', 'c) Массив данных', 'd) undefined'],
        answer: 'b',
        expl: 'Promise, который резолвится в Response объект.',
    },
    {
        q: '20. Как обработать ошибку в fetch?',
        options: [
            'a) fetch(url).catch(err => console.log(err))',
            'b) Response.ok проверяет статус (200-299)',
            'c) Оба',
            'd) fetch не имеет ошибок',
        ],
        answer: 'c',
        expl: 'catch для сетевых ошибок, ok для HTTP-статусов.',
    },
    {
        q: '21. Что такое async/await в контексте сети?',
        options: [
            'a) Синхронный код для асинхронных запросов',
            'b) Только для циклов',
            'c) Устаревший способ',
            'd) Для POST',
        ],
        answer: 'a',
        expl: 'Делает Promise-код читаемым как синхронный.',
    },
    {
        q: '22. Как отправить POST с fetch?',
        options: [
            "a) fetch(url, {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'}})",
            'b) fetch(url, {data})',
            'c) XMLHttpRequest.send(data)',
            'd) a верно',
        ],
        answer: 'd',
        expl: 'Укажите method, body и headers.',
    },
    {
        q: '23. Что делает `res.json()`?',
        options: [
            'a) Парсит JSON из Response body',
            'b) Отправляет JSON',
            'c) Проверяет статус',
            'd) Закрывает соединение',
        ],
        answer: 'a',
        expl: 'Парсит body как JSON.',
    },
    {
        q: '24. Разница между fetch и XMLHttpRequest?',
        options: [
            'a) Fetch — Promise, XHR — callback',
            'b) XHR поддерживает progress события лучше',
            'c) Оба одинаковы в Node.js',
            'd) a и b',
        ],
        answer: 'd',
        expl: 'Fetch современнее, но XHR имеет больше опций.',
    },
    {
        q: '25. Как прервать fetch-запрос?',
        options: ['a) AbortController с signal', 'b) fetch.cancel()', 'c) Не поддерживается', 'd) XHR.abort() только'],
        answer: 'a',
        expl: 'AbortController.signal в опциях fetch.',
    },
    {
        q: '26. Что такое CORS?',
        options: [
            'a) Ограничение кросс-доменных запросов',
            'b) Метод шифрования',
            'c) Тип заголовка',
            'd) Для Node.js',
        ],
        answer: 'a',
        expl: 'Cross-Origin Resource Sharing — безопасность браузера.',
    },
    {
        q: '27. Как получить статус ответа?',
        options: ['a) res.status', 'b) res.ok', 'c) res.json().status', 'd) a и b'],
        answer: 'd',
        expl: 'status — код, ok — boolean успеха.',
    },
    {
        q: '28. Что вернёт fetch для 404?',
        options: ['a) Ошибку Promise.reject', 'b) Response с ok=false', 'c) undefined', 'd) Автоматический retry'],
        answer: 'b',
        expl: 'Fetch не реджектит на HTTP-ошибки.',
    },
    {
        q: '29. Как использовать fetch в Node.js?',
        options: ['a) Требует node-fetch или undici', 'b) Встроено с Node 18+', 'c) Только в браузере', 'd) a и b'],
        answer: 'd',
        expl: 'В новых версиях — нативно, иначе polyfill.',
    },
    {
        q: '30. Что такое WebSockets vs HTTP?',
        options: [
            'a) WebSockets — двунаправленный, persistent; HTTP — request-response',
            'b) Оба одинаковы',
            'c) WebSockets только для чата',
            'd) HTTP быстрее',
        ],
        answer: 'a',
        expl: 'WebSockets для real-time.',
    },

    // Раздел 3: Наследование и замыкания
    {
        q: '31. Что такое прототипное наследование?',
        options: [
            'a) Объекты наследуют от других объектов через __proto__',
            'b) Только классы',
            'c) Как в Java',
            'd) Не используется в JS',
        ],
        answer: 'a',
        expl: 'JS — прототипный язык.',
    },
    {
        q: '32. Как создать класс в ES6?',
        options: ['a) class MyClass {}', 'b) function MyClass() {}', 'c) Оба', 'd) new Object()'],
        answer: 'c',
        expl: 'class — сахар над функциями-конструкторами.',
    },
    {
        q: '33. Что делает `extends`?',
        options: ['a) Наследование классов', 'b) Расширение массивов', 'c) Для функций', 'd) Устарело'],
        answer: 'a',
        expl: 'Child extends Parent.',
    },
    {
        q: '34. Что такое `super()` в конструкторе?',
        options: ['a) Вызов родительского конструктора', 'b) Статический метод', 'c) Замыкание', 'd) this'],
        answer: 'a',
        expl: 'Обязателен в extends перед this.',
    },
    {
        q: '35. Что такое замыкание?',
        options: ['a) Функция, захватывающая внешние переменные', 'b) Наследование', 'c) Цикл', 'd) Ошибка'],
        answer: 'a',
        expl: 'Лексическая область видимости.',
    },
    {
        q: '36. Пример замыкания: счётчик.',
        options: [
            'a) function counter() { let i=0; return () => ++i; }',
            'b) class Counter {}',
            'c) obj.proto = {}',
            'd) fetch()',
        ],
        answer: 'a',
        expl: 'Внутренняя функция помнит i.',
    },
    {
        q: '37. Что возвращает `instanceof`?',
        options: [
            'a) true, если объект в цепочке прототипов класса',
            'b) Значение свойства',
            'c) Ключи',
            'd) false всегда',
        ],
        answer: 'a',
        expl: 'Проверяет прототипную цепь.',
    },
    {
        q: '38. Разница между `Object.create(proto)` и `new Class()`?',
        options: [
            'a) create устанавливает прототип, new — конструктор + прототип',
            'b) Нет разницы',
            'c) create для массивов',
            'd) new устарело',
        ],
        answer: 'a',
        expl: 'create без вызова конструктора.',
    },
    {
        q: '39. Что такое `this` в методах класса?',
        options: ['a) Ссылка на экземпляр', 'b) Global', 'c) undefined в стрелках', 'd) a и c'],
        answer: 'd',
        expl: 'this динамический; в стрелках — лексический.',
    },
    {
        q: '40. Как работает цепочка прототипов?',
        options: [
            'a) Поиск свойства: объект → proto → Object.prototype',
            'b) Только прямые свойства',
            'c) Линейно',
            'd) Циклично',
        ],
        answer: 'a',
        expl: 'Делегирование вверх по цепи.',
    },
    {
        q: '41. Пример замыкания для приватности:',
        options: [
            'a) Функция внутри, возвращающая внутреннюю с доступом к var',
            'b) public class',
            'c) extends private',
            'd) super()',
        ],
        answer: 'a',
        expl: 'Имитирует приватные переменные.',
    },
    {
        q: '42. Что делает `Object.setPrototypeOf(obj, proto)`?',
        options: ['a) Устанавливает прототип объекта', 'b) Создаёт новый', 'c) Удаляет', 'd) Копирует'],
        answer: 'a',
        expl: 'Изменяет __proto__.',
    },
    {
        q: '43. Почему замыкания полезны?',
        options: [
            'a) Для модулей, счётчиков без глобальных var',
            'b) Только для наследования',
            'c) Замедляют код',
            'd) Не используются',
        ],
        answer: 'a',
        expl: 'Изоляция данных.',
    },
    {
        q: '44. Что такое getter/setter в объектах?',
        options: ['a) Object.defineProperty для методов доступа', 'b) Для массивов', 'c) Наследование', 'd) Замыкание'],
        answer: 'a',
        expl: 'get/set как свойства.',
    },
    {
        q: '45. Как переопределить метод в наследнике?',
        options: [
            'a) Просто метод с тем же именем в классе',
            'b) super.method() для вызова родительского',
            'c) Оба',
            'd) Невозможно',
        ],
        answer: 'c',
        expl: 'Переопределение + super для базового.',
    },
    {
        q: '46. Что вернёт `Object.getPrototypeOf(obj)`?',
        options: ['a) Прототип объекта', 'b) Свойства', 'c) Экземпляр', 'd) undefined'],
        answer: 'a',
        expl: 'Читает __proto__.',
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
        setTimeout(askQuestion, 500) // Задержка для читаемости
    })
}

console.log('Начало теста по JavaScript (Объекты, Массивы, Сеть, Наследование, Замыкания). Отвечайте a, b, c или d.\n')
askQuestion()
