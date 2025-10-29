<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Создание Node.js проекта и инициализация Git-репозитория

Создание нового Node.js проекта и его сохранение как локального Git-репозитория включает установку Node.js, инициализацию проекта с помощью npm и настройку Git для отслеживания изменений. Эта последовательность действий позволит быстро настроить базовую структуру проекта.[^1][^2][^3][^4]

## Предварительные требования

Убедитесь, что у вас установлен Node.js (версия 18 или выше рекомендуется для современных проектов). Проверьте установку, выполнив команды `node -v` и `npm -v` в терминале. Git должен быть установлен на вашей системе; если нет, скачайте его с официального сайта git-scm.com.[^2][^5][^3][^6][^4]

## Шаги по созданию Node.js проекта

1. **Создайте директорию проекта.**
Откройте терминал и выполните команду для создания новой папки: `mkdir my-node-project` (замените "my-node-project" на желаемое имя). Перейдите в неё: `cd my-node-project`.[^3][^4][^1][^2]
2. **Инициализируйте проект с помощью npm.**
Выполните `npm init` и ответьте на вопросы (название, версия, описание и т.д.), или используйте `npm init -y` для автоматического заполнения дефолтными значениями. Это создаст файл `package.json`, который управляет зависимостями и скриптами проекта.[^4][^1][^2][^3]
3. **Добавьте базовый файл (опционально).**
Создайте файл `index.js` с простым кодом, например:

```
console.log('Hello, Node.js!');
```

Это позволит протестировать проект. Запустите его командой `node index.js` для проверки.[^7][^8]

## Шаги по инициализации Git-репозитория

1. **Инициализируйте Git в директории проекта.**
В терминале проекта выполните `git init`. Это создаст скрытую папку `.git`, которая хранит историю версий.[^5][^6][^9][^10]
2. **Добавьте файлы в индекс Git.**
Выполните `git add .` для добавления всех файлов проекта (включая `package.json` и `index.js`). Это подготовит их к коммиту.[^6][^9][^11][^5]
3. **Создайте первый коммит.**
Выполните `git commit -m "Initial commit"`. Это зафиксирует текущее состояние проекта как первую версию.[^9][^11][^5][^6]

## Дополнительно: Загрузка на удалённый репозиторий (GitHub)

Если вы хотите сохранить проект на GitHub:

1. Создайте новый репозиторий на github.com (без README или .gitignore).[^12][^6]
2. Свяжите локальный репозиторий: `git remote add origin https://github.com/ваше-имя/имя-репо.git`.[^12]
3. Отправьте изменения: `git branch -M main` (если нужно), затем `git push -u origin main`.[^6][^12]

Теперь ваш Node.js проект сохранён как Git-репозиторий и готов к разработке. Для дальнейшей работы используйте `git add`, `git commit` и `git push` для управления версиями.[^5][^9][^6]
<span style="display:none">[^13][^14][^15][^16]</span>

<div align="center">⁂</div>

[^1]: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/development_environment

[^2]: https://daily.dev/blog/setup-nodejs-express-project-a-beginners-guide

[^3]: https://www.twilio.com/docs/usage/tutorials/how-to-set-up-your-node-js-and-express-development-environment

[^4]: https://www.freecodecamp.org/news/how-to-build-an-event-app-with-node-js/

[^5]: https://www.atlassian.com/git/tutorials/setting-up-a-repository

[^6]: https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github

[^7]: https://nodejs.org/en/learn/getting-started/introduction-to-nodejs

[^8]: https://www.w3schools.com/nodejs/nodejs_get_started.asp

[^9]: https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository

[^10]: https://github.com/git-guides/git-init

[^11]: https://kbroman.org/github_tutorial/pages/init.html

[^12]: https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/How-to-push-an-existing-project-to-GitHub

[^13]: https://philna.sh/blog/2019/01/10/how-to-start-a-node-js-project/

[^14]: https://code.visualstudio.com/docs/nodejs/nodejs-tutorial

[^15]: https://stackoverflow.com/questions/65033357/git-init-new-from-existing-repository

[^16]: https://www.jetbrains.com/help/idea/set-up-a-git-repository.html

