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
