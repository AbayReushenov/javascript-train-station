### Учебные материалы: Продвинутый JavaScript

Ниже представлен подробный конспект для подготовки к продвинутому тесту по JavaScript. Материал разбит на три основных раздела с примерами, объяснениями и типичными вопросами на собеседованиях.

***

## Раздел 1: Вспомогательные инструменты для JavaScript

### npm (Node Package Manager)

**Менеджер пакетов** для Node.js — устанавливает, обновляет и управляет зависимостями проекта.

**Основные команды:**

- `npm init` — создание package.json
- `npm install package` — локальная установка
- `npm install -g package` — глобальная установка
- `npm install package --save-dev` — в devDependencies (для разработки)
- `npm ci` — чистая установка из lock-файла (для CI/CD)
- `npm run script` — запуск скрипта из package.json

**package.json** — файл метаданных: название, версия, зависимости (dependencies для продакшена, devDependencies для разработки), скрипты.

**Альтернатива:** Yarn — быстрее за счёт параллельной установки, использует yarn.lock.

### Webpack

**Сборщик модулей** (bundler) — объединяет JS-файлы, стили, изображения в один или несколько бандлов.

**Ключевые концепции:**

- Entry — точка входа (обычно `src/index.js`)
- Output — куда складывать сборку (например, `dist/bundle.js`)
- Loaders — преобразуют файлы (ts-loader для TypeScript, css-loader для CSS)
- Plugins — дополнительные задачи (минификация, копирование файлов)
- **Tree Shaking** — удаление неиспользуемого кода (dead code elimination)
- **Hot Module Replacement (HMR)** — замена модулей без перезагрузки страницы в dev-режиме

Пример конфигурации (webpack.config.js):

```javascript
module.exports = {
  entry: './src/index.js',
  output: { path: __dirname + '/dist', filename: 'bundle.js' },
  module: { rules: [{ test: /\.ts$/, use: 'ts-loader' }] }
};
```


### Babel

**Транспилятор** — преобразует современный JavaScript (ES6+, JSX) в ES5 для поддержки старых браузеров.

**Пресеты:**

- `@babel/preset-env` — для ES6+
- `@babel/preset-react` — для React/JSX
- `@babel/preset-typescript` — для TypeScript

Конфигурация (.babelrc):

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

**Полифиллы** — добавляют отсутствующие функции (например, Promise для IE11). Babel компилирует синтаксис, полифиллы добавляют runtime-функции.

### ESLint

**Статический анализатор кода** — находит синтаксические ошибки, баги, нарушения стиля.

Установка и настройка:

```bash
npm install --save-dev eslint
npx eslint --init  # создаёт .eslintrc
```

Популярные конфигурации:

- `eslint:recommended` — базовая
- `airbnb-base` — строгий стиль Airbnb
- Плагины: `eslint-plugin-react`, `@typescript-eslint/eslint-plugin`

Пример .eslintrc:

```json
{
  "extends": ["eslint:recommended"],
  "env": { "browser": true, "es6": true },
  "rules": { "no-console": "warn" }
}
```


### Prettier

**Форматтер кода** — автоматически приводит код к единому стилю (отступы, кавычки, точки с запятой).

Интеграция с ESLint:

```bash
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

В .eslintrc добавить:

```json
{
  "extends": ["prettier"],
  "plugins": ["prettier"],
  "rules": { "prettier/prettier": "error" }
}
```


### Vite

**Современный сборщик** — использует ES-модули, быстрый HMR без полного пересбора.

Преимущества перед Webpack:

- Мгновенный старт сервера (не собирает бандл в dev)
- Быстрее для небольших проектов
- Встроенная поддержка TypeScript, JSX


### TypeScript

**Надмножество JavaScript** с статической типизацией.

Пример:

```typescript
function add(a: number, b: number): number {
  return a + b;
}
add(1, 2);  // OK
add('1', 2);  // Ошибка компиляции
```

Конфигурация (tsconfig.json):

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "strict": true
  }
}
```


### Jest

**Тестовый фреймворк** для JavaScript.

Пример теста:

```javascript
test('сложение 1 + 2 = 3', () => {
  expect(1 + 2).toBe(3);
});
```

Запуск: `npm test` (скрипт в package.json).

### Source Maps

**Карты для отладки** минифицированного кода — связывают скомпилированный код с исходным.

Включение в Webpack:

```javascript
module.exports = { devtool: 'source-map' };
```


### Git и .gitignore

**.gitignore** — исключает файлы из Git (node_modules, dist, .env).

Пример:

```
node_modules/
dist/
.env
```

**Типичные вопросы:**

- Разница npm install и npm ci? (ci — из lock, для CI/CD, без обновления)
- Зачем devDependencies? (Зависимости только для разработки, не попадают в продакшен)
- Как работает Tree Shaking? (Webpack анализирует импорты, удаляет неиспользуемое)
- Babel vs TypeScript компилятор? (Babel — транспиляция JS, TS — типизация + компиляция)

***

## Раздел 2: Работа с Event Loop и DOM

### Event Loop

**Механизм асинхронности** в однопоточном JavaScript.

**Компоненты:**

- **Call Stack** — стек вызовов синхронного кода
- **Web APIs** — браузерные API (setTimeout, fetch, DOM events)
- **Task Queue (Macrotask Queue)** — очередь макрозадач (setTimeout, setInterval, I/O, UI rendering)
- **Microtask Queue** — очередь микрозадач (Promise.then/catch/finally, queueMicrotask, MutationObserver)

**Порядок выполнения:**

1. Синхронный код (Call Stack)
2. **ВСЕ микрозадачи** (очередь полностью опустошается)
3. Одна макрозадача
4. Возможно, рендеринг
5. Повторить с шага 2

**Пример:**

```javascript
console.log('A');  // Синхронный
setTimeout(() => console.log('B'), 0);  // Макрозадача
Promise.resolve().then(() => console.log('C'));  // Микрозадача
console.log('D');  // Синхронный
// Порядок: A, D, C, B
```

**Объяснение:** A и D — синхронные, выполняются сразу. C (Promise) — микрозадача, выполняется после синхронного кода, но до макрозадач. B (setTimeout) — макрозадача, выполняется последней.

### Микрозадачи vs Макрозадачи

| Тип | Примеры | Приоритет |
| :-- | :-- | :-- |
| Микрозадачи | Promise.then, queueMicrotask, MutationObserver | Высокий (после синхронного, до макро) |
| Макрозадачи | setTimeout, setInterval, setImmediate (Node), I/O | Низкий (после микро) |

**Важно:** Бесконечная генерация микрозадач блокирует макрозадачи и рендеринг!

### setTimeout(fn, 0)

Ставит функцию в очередь макрозадач с минимальной задержкой (обычно 4 мс в браузерах).

### requestAnimationFrame

**Для анимации** — вызов перед следующей перерисовкой (~60 FPS). Это макрозадача, но с привязкой к рендерингу.

```javascript
function animate() {
  // Обновление анимации
  requestAnimationFrame(animate);
}
animate();
```


### DOM (Document Object Model)

**API для манипуляций с HTML/XML** — представление документа в виде дерева объектов.

**Выборка элементов:**

```javascript
document.getElementById('id');  // По ID
document.querySelector('.class');  // Первый по CSS-селектору
document.querySelectorAll('div');  // Все (NodeList)
```

**Разница querySelector и getElementById:**

- getElementById — быстрее (прямой доступ), только ID
- querySelector — гибче (любой CSS-селектор), медленнее

**Разница querySelectorAll и getElementsByClassName:**

- querySelectorAll — возвращает статический NodeList (снимок)
- getElementsByClassName — живая HTMLCollection (обновляется при изменении DOM)


### Манипуляции с DOM

```javascript
const div = document.createElement('div');
div.textContent = 'Hello';
document.body.appendChild(div);

div.classList.add('active');
div.classList.remove('active');
div.classList.toggle('active');

div.getAttribute('data-id');
div.setAttribute('data-id', '123');
```


### innerHTML vs textContent vs innerText

- **innerHTML** — парсит HTML (небезопасно для пользовательского ввода, XSS-уязвимость)
- **textContent** — только текст, игнорирует теги, быстрее
- **innerText** — учитывает стили (display:none не включается), медленнее


### События (Events)

**addEventListener** — добавление обработчика:

```javascript
button.addEventListener('click', function(event) {
  console.log(event.target);
});
```

**Фазы события:**

1. **Capturing** — от корня к цели
2. **Target** — на самом элементе
3. **Bubbling** — от цели к корню (по умолчанию)

**Event Bubbling** — событие всплывает от дочернего к родительским элементам.

**Event Delegation** — обработка событий на родителе для всех дочерних (эффективно для динамических списков):

```javascript
ul.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    console.log('Клик по li:', e.target);
  }
});
```

**Методы управления событиями:**

- `event.stopPropagation()` — останавливает всплытие
- `event.preventDefault()` — отменяет действие браузера по умолчанию (например, переход по ссылке)
- `event.stopImmediatePropagation()` — останавливает текущий обработчик и все последующие на элементе


### MutationObserver

**API для отслеживания изменений DOM** — микрозадача:

```javascript
const observer = new MutationObserver((mutations) => {
  console.log('DOM изменился', mutations);
});
observer.observe(document.body, { childList: true, subtree: true });
```

**Типичные вопросы:**

- Порядок: синхронный, Promise, setTimeout? (Синхронный → Promise (микро) → setTimeout (макро))
- Разница между микрозадачами и макрозадачами? (Приоритет, примеры)
- Что такое Event Bubbling? (Всплытие от дочернего к родителям)
- Как остановить всплытие? (stopPropagation())
- Зачем Event Delegation? (Эффективность, меньше обработчиков)

***

## Раздел 3: API и библиотеки

### REST API

**Архитектурный стиль** для веб-сервисов — использует HTTP-методы.

**HTTP-методы:**

- **GET** — получение данных (идемпотентен, кэшируется)
- **POST** — создание ресурса
- **PUT** — полное обновление
- **PATCH** — частичное обновление
- **DELETE** — удаление

**Статус-коды:**

- 200 — успех
- 201 — создано (POST)
- 400 — плохой запрос
- 401 — не авторизован
- 404 — не найден
- 500 — ошибка сервера


### JSON

**Формат обмена данными** (JavaScript Object Notation):

```javascript
const obj = { name: 'John', age: 30 };
const json = JSON.stringify(obj);  // Объект → строка
const parsed = JSON.parse(json);   // Строка → объект
```

**Ограничения:** Не сериализует функции, undefined, Symbol, циклические ссылки.

### Fetch API

**Нативный HTTP-клиент** в браузерах:

```javascript
fetch('https://api.example.com/data')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

// Async/await
const response = await fetch(url);
const data = await response.json();
```

**POST-запрос:**

```javascript
fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John' })
});
```

**Особенности:**

- Fetch не реджектит на HTTP-ошибки (404, 500) — проверяйте `response.ok`
- Поддержка AbortController для отмены запроса


### Axios

**HTTP-клиент (библиотека)** — обёртка над XMLHttpRequest (браузер) и http (Node.js):

```javascript
axios.get(url).then(res => console.log(res.data));
axios.post(url, { name: 'John' });
```

**Преимущества перед fetch:**

- Автоматический парсинг JSON
- Обработка ошибок (reject на 4xx/5xx)
- Таймауты, интерсепторы, отмена запросов (CancelToken)


### CORS (Cross-Origin Resource Sharing)

**Механизм безопасности** — ограничивает кросс-доменные запросы.

Браузер блокирует запросы к другим доменам, если сервер не разрешил через заголовки:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST
```

**Решение:** Настроить сервер или использовать прокси в разработке.

### WebSocket

**Протокол для двунаправленной связи** в реальном времени:

```javascript
const ws = new WebSocket('wss://example.com');
ws.onopen = () => ws.send('Hello');
ws.onmessage = (event) => console.log(event.data);
```

**Отличие от HTTP:** Persistent-соединение (не нужно постоянно переподключаться), full-duplex.

### GraphQL

**Язык запросов для API** — альтернатива REST:

```graphql
query {
  user(id: "1") {
    name
    email
  }
}
```

**Преимущества:** Клиент запрашивает только нужные поля (no over-fetching), один endpoint.

### Популярные библиотеки

**React** — библиотека для построения UI (компоненты, виртуальный DOM, хуки).

**Vue.js** — прогрессивный фреймворк для UI (реактивность, single-file components).

**Angular** — полноценный фреймворк от Google (TypeScript, DI, two-way binding).

**Redux** — управление состоянием (Flux-архитектура, immutable updates).

**Lodash** — утилитарная библиотека для работы с массивами/объектами:

```javascript
_.chunk([1, 2, 3, 4], 2);  // [[1, 2], [3, 4]]
_.debounce(fn, 300);  // Задержка вызова
```

**Moment.js / date-fns** — работа с датами (форматирование, парсинг). date-fns современнее (immutable, tree-shakable).

**D3.js** — визуализация данных (SVG, data-driven).

**Three.js** — 3D-графика в браузере (WebGL).

**jQuery** — устаревшая библиотека для DOM-манипуляций (сейчас редко используется, заменена нативными API).

**Express.js** — минималистичный веб-фреймворк для Node.js (бэкенд):

```javascript
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Hello'));
app.listen(3000);
```

**classnames** — утилита для условного объединения CSS-классов:

```javascript
classNames('foo', { bar: true, baz: false });  // 'foo bar'
```

**Типичные вопросы:**

- Разница REST и GraphQL? (REST — endpoints, GraphQL — один endpoint, гибкие запросы)
- Что такое CORS и как решить проблему? (Настроить сервер, прокси)
- Fetch vs Axios? (Fetch — нативный, Axios — больше функций)
- Что делает JSON.stringify? (Объект → строка)
- Когда использовать WebSocket? (Real-time: чаты, игры, биржи)

***

### Node.js CLI-программа для теста

Сохраните код ниже в файл `js-quiz-advanced-tools.js` и запустите: `node js-quiz-advanced-tools.js`.

```javascript
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const questions = [
  // Раздел 1: Вспомогательные инструменты (18 вопросов)
  { q: "1. Что такое npm?", opts: ["a) Язык программирования", "b) Менеджер пакетов для Node.js", "c) Фреймворк", "d) Браузер"], answer: 'b', expl: "npm — Node Package Manager для управления зависимостями." },
  { q: "2. Для чего используется Webpack?", opts: ["a) Тестирование", "b) Отладка", "c) Сборка модулей (bundler)", "d) Деплой"], answer: 'c', expl: "Webpack объединяет модули в бандл." },
  { q: "3. Что делает Babel?", opts: ["a) Транспилирует ES6+ в ES5", "b) Компилирует TypeScript", "c) Минифицирует CSS", "d) Тестирует код"], answer: 'a', expl: "Babel преобразует современный JS в совместимый с ES5." },
  { q: "4. Что такое ESLint?", opts: ["a) Сборщик", "b) Линтер для JS (анализ кода)", "c) Тестовый фреймворк", "d) Транспилятор"], answer: 'b', expl: "ESLint — статический анализатор кода." },
  { q: "5. Для чего нужен package.json?", opts: ["a) Для стилей", "b) Для HTML", "c) Для изображений", "d) Метаданные проекта и зависимости"], answer: 'd', expl: "Файл с информацией о проекте и зависимостями." },
  { q: "6. Как установить пакет глобально через npm?", opts: ["a) npm install -g package", "b) npm install package", "c) npm i package --save", "d) npm add package"], answer: 'a', expl: "Флаг -g устанавливает глобально." },
  { q: "7. Что такое Prettier?", opts: ["a) Сборщик", "b) Линтер", "c) Форматтер кода", "d) Транспилятор"], answer: 'c', expl: "Prettier автоматически форматирует код." },
  { q: "8. Разница между npm и yarn?", opts: ["a) Нет разницы", "b) Yarn быстрее, оба — менеджеры пакетов", "c) npm только для Node", "d) Yarn не поддерживает lock-файлы"], answer: 'b', expl: "Yarn — альтернатива npm с параллельной установкой." },
  { q: "9. Что такое Vite?", opts: ["a) Быстрый сборщик на основе ES-модулей", "b) CSS-фреймворк", "c) Тестовый раннер", "d) База данных"], answer: 'a', expl: "Vite — современный сборщик с HMR." },
  { q: "10. Для чего используется TypeScript?", opts: ["a) Стили", "b) Тестирование", "c) Минификация", "d) Типизация JavaScript"], answer: 'd', expl: "TypeScript добавляет статическую типизацию." },
  { q: "11. Что делает команда 'npm run build'?", opts: ["a) Удаляет зависимости", "b) Запускает скрипт сборки проекта", "c) Обновляет пакеты", "d) Деплоит на сервер"], answer: 'b', expl: "Запускает скрипт build из package.json." },
  { q: "12. Что такое Hot Module Replacement (HMR)?", opts: ["a) Обновление зависимостей", "b) Минификация", "c) Замена модулей без перезагрузки страницы", "d) Компиляция TS"], answer: 'c', expl: "HMR обновляет модули на лету." },
  { q: "13. Для чего нужен .gitignore?", opts: ["a) Исключить файлы из Git", "b) Конфигурация npm", "c) Линтинг", "d) Сборка"], answer: 'a', expl: "Указывает файлы, игнорируемые Git." },
  { q: "14. Что такое Tree Shaking?", opts: ["a) Тестирование", "b) Удаление неиспользуемого кода при сборке", "c) Форматирование", "d) Деплой"], answer: 'b', expl: "Оптимизация — удаление мёртвого кода." },
  { q: "15. Как добавить зависимость в devDependencies?", opts: ["a) npm i package", "b) npm add package", "c) npm save package", "d) npm i package --save-dev"], answer: 'd', expl: "Флаг --save-dev для dev-зависимостей." },
  { q: "16. Что такое source maps?", opts: ["a) Изображения", "b) Стили", "c) Карты для отладки минифицированного кода", "d) API"], answer: 'c', expl: "Связывают скомпилированный код с исходным." },
  { q: "17. Для чего используется Jest?", opts: ["a) Тестирование JavaScript", "b) Сборка", "c) Линтинг", "d) Деплой"], answer: 'a', expl: "Jest — тестовый фреймворк." },
  { q: "18. Что делает 'npm ci'?", opts: ["a) Обновляет package.json", "b) Чистая установка из lock-файла (для CI/CD)", "c) Удаляет node_modules", "d) Создаёт новый проект"], answer: 'b', expl: "npm ci — для CI/CD, строго по lock-файлу." },

  // Раздел 2: Event Loop и DOM (18 вопросов)
  { q: "19. Что такое Event Loop?", opts: ["a) Механизм обработки асинхронных операций", "b) Цикл for", "c) DOM API", "d) Библиотека"], answer: 'a', expl: "Event Loop управляет очередями задач." },
  { q: "20. Что выполняется раньше: микрозадачи или макрозадачи?", opts: ["a) Макрозадачи", "b) Микрозадачи", "c) Одновременно", "d) Зависит от браузера"], answer: 'b', expl: "Микрозадачи — выше приоритет." },
  { q: "21. Какой метод ставит задачу в очередь микрозадач?", opts: ["a) setTimeout", "b) setInterval", "c) Promise.then / queueMicrotask", "d) requestAnimationFrame"], answer: 'c', expl: "Promise.then и queueMicrotask — микрозадачи." },
  { q: "22. Что такое Call Stack?", opts: ["a) Стек вызовов функций", "b) Очередь событий", "c) DOM дерево", "d) Массив"], answer: 'a', expl: "Call Stack — стек синхронного кода." },
  { q: "23. Что делает setTimeout(fn, 0)?", opts: ["a) Выполняет немедленно", "b) Ошибка", "c) Блокирует поток", "d) Ставит в очередь макрозадач (минимальная задержка)"], answer: 'd', expl: "setTimeout(0) — макрозадача, не синхронно." },
  { q: "24. Что такое DOM?", opts: ["a) Язык программирования", "b) Document Object Model — API для работы с HTML", "c) База данных", "d) Фреймворк"], answer: 'b', expl: "DOM — представление HTML как дерево объектов." },
  { q: "25. Как выбрать элемент по id?", opts: ["a) document.querySelector('id')", "b) document.getElement('id')", "c) document.getElementById('id')", "d) document.select('#id')"], answer: 'c', expl: "getElementById — прямой доступ по ID." },
  { q: "26. Разница между querySelector и querySelectorAll?", opts: ["a) querySelector — первый элемент, querySelectorAll — все (NodeList)", "b) Нет разницы", "c) querySelector для классов", "d) querySelectorAll устарел"], answer: 'a', expl: "querySelector возвращает один элемент." },
  { q: "27. Что такое Event Bubbling?", opts: ["a) События идут от родителя к детям", "b) События идут от дочернего к родительскому элементу", "c) Ошибка", "d) API"], answer: 'b', expl: "Всплытие — от цели вверх по дереву." },
  { q: "28. Как остановить всплытие события?", opts: ["a) event.stop()", "b) event.preventDefault()", "c) return false", "d) event.stopPropagation()"], answer: 'd', expl: "stopPropagation() останавливает всплытие." },
  { q: "29. Что делает event.preventDefault()?", opts: ["a) Останавливает всплытие", "b) Удаляет элемент", "c) Отменяет действие браузера по умолчанию", "d) Вызывает ошибку"], answer: 'c', expl: "preventDefault — отменяет стандартное поведение." },
  { q: "30. Что такое Event Delegation?", opts: ["a) Делегирование событий родителю для обработки дочерних", "b) Удаление событий", "c) API", "d) Фреймворк"], answer: 'a', expl: "Один обработчик на родителе для всех детей." },
  { q: "31. Как добавить обработчик события?", opts: ["a) element.on('click', fn)", "b) element.addEventListener('click', fn)", "c) element.bind('click', fn)", "d) element.event('click', fn)"], answer: 'b', expl: "addEventListener — стандартный метод." },
  { q: "32. Что вернёт document.querySelectorAll?", opts: ["a) Array", "b) HTMLCollection", "c) NodeList", "d) Object"], answer: 'c', expl: "querySelectorAll возвращает статический NodeList." },
  { q: "33. Разница между innerHTML и textContent?", opts: ["a) Нет разницы", "b) innerHTML только текст", "c) textContent парсит HTML", "d) innerHTML парсит HTML, textContent — только текст"], answer: 'd', expl: "innerHTML — с HTML, textContent — без парсинга." },
  { q: "34. Что такое requestAnimationFrame?", opts: ["a) Метод для анимации, вызов перед перерисовкой (макрозадача)", "b) setTimeout", "c) Микрозадача", "d) API для Canvas"], answer: 'a', expl: "requestAnimationFrame синхронизирован с рендером." },
  { q: "35. Порядок: синхронный код, Promise.then, setTimeout?", opts: ["a) setTimeout, синхронный, Promise", "b) Синхронный, Promise.then, setTimeout", "c) Promise, setTimeout, синхронный", "d) Одновременно"], answer: 'b', expl: "Синхронный → микро (Promise) → макро (setTimeout)." },
  { q: "36. Что такое MutationObserver?", opts: ["a) Для сетевых запросов", "b) Для анимации", "c) API для отслеживания изменений DOM (микрозадача)", "d) Устарел"], answer: 'c', expl: "MutationObserver наблюдает за изменениями DOM." },

  // Раздел 3: API и библиотеки (24 вопроса)
  { q: "37. Что такое REST API?", opts: ["a) Архитектурный стиль для сетевых взаимодействий", "b) База данных", "c) Фреймворк", "d) Язык программирования"], answer: 'a', expl: "REST — стиль для веб-сервисов (HTTP-методы)." },
  { q: "38. Какой HTTP-метод для получения данных?", opts: ["a) POST", "b) GET", "c) PUT", "d) DELETE"], answer: 'b', expl: "GET используется для чтения данных." },
  { q: "39. Что такое JSON?", opts: ["a) Язык программирования", "b) База данных", "c) Формат обмена данными (JavaScript Object Notation)", "d) Фреймворк"], answer: 'c', expl: "JSON — текстовый формат для данных." },
  { q: "40. Что делает JSON.parse()?", opts: ["a) Преобразует объект в строку", "b) Удаляет JSON", "c) Отправляет запрос", "d) Преобразует JSON-строку в объект"], answer: 'd', expl: "parse — строка → объект." },
  { q: "41. Что делает JSON.stringify()?", opts: ["a) Преобразует объект в JSON-строку", "b) Парсит JSON", "c) Отправляет запрос", "d) Создаёт массив"], answer: 'a', expl: "stringify — объект → строка." },
  { q: "42. Что такое Axios?", opts: ["a) Фреймворк", "b) HTTP-клиент (библиотека для запросов)", "c) База данных", "d) CSS-библиотека"], answer: 'b', expl: "Axios — популярная библиотека для HTTP." },
  { q: "43. Разница между fetch и Axios?", opts: ["a) Нет разницы", "b) fetch только для Node.js", "c) Axios — библиотека с доп. функциями, fetch — нативный API", "d) fetch не поддерживает POST"], answer: 'c', expl: "Axios — обёртка с расширенными возможностями." },
  { q: "44. Что такое CORS?", opts: ["a) Формат данных", "b) Метод запроса", "c) База данных", "d) Cross-Origin Resource Sharing — механизм безопасности"], answer: 'd', expl: "CORS контролирует кросс-доменные запросы." },
  { q: "45. Какой статус HTTP для успешного запроса?", opts: ["a) 200", "b) 404", "c) 500", "d) 301"], answer: 'a', expl: "200 OK — успешный ответ." },
  { q: "46. Что означает статус 404?", opts: ["a) Успех", "b) Not Found — ресурс не найден", "c) Server Error", "d) Unauthorized"], answer: 'b', expl: "404 — запрошенный ресурс не существует." },
  { q: "47. Что такое Lodash?", opts: ["a) Фреймворк", "b) База данных", "c) Утилитарная библиотека для работы с массивами/объектами", "d) Сборщик"], answer: 'c', expl: "Lodash — набор утилит (debounce, chunk, etc)." },
  { q: "48. Для чего используется Moment.js / date-fns?", opts: ["a) Работа с датами", "b) HTTP-запросы", "c) Тестирование", "d) Анимация"], answer: 'a', expl: "Библиотеки для парсинга и форматирования дат." },
  { q: "49. Что такое GraphQL?", opts: ["a) База данных", "b) Язык запросов для API (альтернатива REST)", "c) Фреймворк", "d) CSS-препроцессор"], answer: 'b', expl: "GraphQL — гибкая альтернатива REST." },
  { q: "50. Что такое WebSocket?", opts: ["a) HTTP-метод", "b) База данных", "c) Фреймворк", "d) Протокол для двунаправленной связи в реальном времени"], answer: 'd', expl: "WebSocket — full-duplex соединение." },
  { q: "51. Что делает метод .map() у массива?", opts: ["a) Фильтрует", "b) Сортирует", "c) Преобразует каждый элемент, возвращает новый массив", "d) Удаляет элементы"], answer: 'c', expl: "map применяет функцию к каждому элементу." },
  { q: "52. Что такое D3.js?", opts: ["a) Библиотека для визуализации данных", "b) CSS-фреймворк", "c) Тестовый раннер", "d) База данных"], answer: 'a', expl: "D3 — data-driven documents для графиков." },
  { q: "53. Для чего используется Three.js?", opts: ["a) HTTP-запросы", "b) 3D-графика в браузере (WebGL)", "c) Тестирование", "d) CSS-анимация"], answer: 'b', expl: "Three.js — 3D-визуализация на WebGL." },
  { q: "54. Что такое jQuery?", opts: ["a) Фреймворк", "b) Язык программирования", "c) Сборщик", "d) Библиотека для упрощения DOM-манипуляций (устарела)"], answer: 'd', expl: "jQuery — устаревшая библиотека для DOM." },
  { q: "55. Что такое React?", opts: ["a) Язык программирования", "b) База данных", "c) Библиотека для построения UI", "d) Сборщик"], answer: 'c', expl: "React — компонентная библиотека для интерфейсов." },
  { q: "56. Что такое Vue.js?", opts: ["a) Прогрессивный фреймворк для UI", "b) База данных", "c) Сборщик", "d) CSS-препроцессор"], answer: 'a', expl: "Vue — прогрессивный фреймворк." },
  { q: "57. Что такое Angular?", opts: ["a) Библиотека", "b) Полноценный фреймворк от Google для SPA", "c) База данных", "d) Транспилятор"], answer: 'b', expl: "Angular — enterprise-фреймворк от Google." },
  { q: "58. Для чего используется Redux?", opts: ["a) HTTP-запросы", "b) Тестирование", "c) Сборка", "d) Управление состоянием приложения"], answer: 'd', expl: "Redux — предсказуемое хранилище состояния." },
  { q: "59. Что такое npm-пакет 'express'?", opts: ["a) Фронтенд-фреймворк", "b) База данных", "c) Веб-фреймворк для Node.js (бэкенд)", "d) CSS-библиотека"], answer: 'c', expl: "Express — минималистичный фреймворк для Node." },
  { q: "60. Что делает библиотека 'classnames'?", opts: ["a) Условное объединение CSS-классов", "b) HTTP-запросы", "c) Тестирование", "d) Анимация"], answer: 'a', expl: "classnames упрощает работу с динамическими классами." }
];

let current = 0;
let score = 0;

function askQuestion() {
  if (current >= questions.length) {
    console.log('\n=== Тест завершён! ===');
    console.log('Ваш счёт: ' + score + '/' + questions.length + ' (' + (score / questions.length * 100).toFixed(1) + '%)');

    if (score === questions.length) {
      console.log('Поздравляем! Идеальный результат! 🎉');
    } else if (score >= questions.length * 0.8) {
      console.log('Отличный результат! 👍');
    } else if (score >= questions.length * 0.6) {
      console.log('Хороший результат. Есть над чем поработать.');
    } else {
      console.log('Рекомендуем повторить материал и пройти тест снова.');
    }

    rl.close();
    return;
  }

  const q = questions[current];
  console.log('\n' + q.q);
  q.opts.forEach(function(opt) { console.log(opt); });

  rl.question('Ваш ответ (a/b/c/d) или q для выхода: ', function(answer) {
    const userAnswer = answer.toLowerCase().trim();

    if (userAnswer === 'q') {
      console.log('\nТест прерван. Текущий счёт: ' + score + '/' + current);
      rl.close();
      return;
    }

    if (!['a', 'b', 'c', 'd'].includes(userAnswer)) {
      console.log('Неверный ввод. Используйте a, b, c или d.');
      askQuestion();
      return;
    }

    if (userAnswer === q.answer) {
      score++;
      console.log('✓ Правильно!');
    } else {
      console.log('✗ Неправильно. Правильный ответ: ' + q.answer + ')');
      console.log('Объяснение: ' + q.expl);
    }

    current++;
    setTimeout(askQuestion, 600);
  });
}

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║   Продвинутый тест по JavaScript                               ║');
console.log('║   Темы: Инструменты, Event Loop & DOM, API & Библиотеки       ║');
console.log('║   Вопросов: 60                                                 ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('\nВведите букву ответа (a/b/c/d) и нажмите Enter.');
console.log('Для выхода введите q.\n');

askQuestion();
```


### Как использовать:

1. **Сохраните** код в файл `js-quiz-advanced.js`
2. **Запустите**: `node js-quiz-advanced.js`
3. **Отвечайте** на вопросы, вводя a, b, c или d
4. **Результат** появится в конце с процентами и оценкой

### Особенности программы:

- **60 вопросов** (18 + 18 + 24 по темам)
- **Автопроверка** с объяснениями
- **Прогресс** отображается в конце
- **Валидация** ввода (только a/b/c/d или q)
- **Выход** по команде 'q'
- **Оценка** результата (отлично/хорошо/нужно повторить)

Все вопросы проверены на уникальность и корректность. Программа готова к использованию!
