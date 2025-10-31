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

### Как использовать:

1. **Сохраните** код в файл `js-quiz-advanced-tools.js`
2. **Запустите**: `node js-quiz-advanced-tools.js`
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
