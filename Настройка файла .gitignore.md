<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

## Настройка файла .gitignore

Файл .gitignore позволяет указать Git, какие файлы и папки игнорировать при добавлении в репозиторий, чтобы избежать коммита ненужных или конфиденциальных данных. Для Node.js проекта это особенно важно, чтобы исключить зависимости, логи и временные файлы.[^1][^2][^8]

## Шаги по созданию и настройке

Создайте файл .gitignore в корневой директории проекта с помощью команды `touch .gitignore` в терминале или любого текстового редактора. Добавьте в него правила в формате одной строки на файл или папку, используя символы вроде `*` для шаблонов и `#` для комментариев. После изменений выполните `git add .gitignore` и `git commit -m "Add .gitignore"` для фиксации.[^2][^4][^5][^9]

## Рекомендуемые файлы для Node.js проекта

В .gitignore для Node.js добавьте папку с зависимостями, чтобы не загружать её в репозиторий, так как она генерируется командой `npm install`.[^8][^2]

- `node_modules/` — директория с установленными пакетами npm.
- `.env` — файл с переменными окружения, содержащий API-ключи и секреты.
- `npm-debug.log` — логи ошибок npm.

Исключите также файлы от IDE и ОС для чистоты репозитория.[^6][^2]

- `.vscode/` или `.idea/` — настройки редакторов Visual Studio Code или IntelliJ.
- `.DS_Store` — системные файлы macOS.
- `*.log` — все лог-файлы проекта.

Для тестов и сборки добавьте генерируемые артефакты.[^7][^2]

- `coverage/` — отчёты покрытия кода.
- `dist/` или `build/` — скомпилированные версии.
- `*.swp` — временные файлы редакторов.


## Глобальная настройка

Для общих правил во всех проектах настройте глобальный .gitignore командой `git config --global core.excludesfile ~/.gitignore_global` и добавьте в него IDE-специфичные файлы. Это предотвратит случайное добавление личных настроек в репозитории. Если файл уже коммитился, удалите его из Git с помощью `git rm --cached <file>` перед добавлением в .gitignore.[^1][^6][^7][^8]
<span style="display:none">[^10][^3]</span>

<div align="center">⁂</div>

[^1]: https://www.atlassian.com/ru/git/tutorials/saving-changes/gitignore

[^2]: https://wiki.merionet.ru/articles/fajl-gitignore-kak-ignorirovat-fajly-i-papki-v-git

[^3]: https://docs.github.com/ru/get-started/git-basics/ignoring-files

[^4]: https://ru.hexlet.io/courses/intro_to_git/lessons/gitignore/theory_unit

[^5]: https://hmarketing.ru/blog/git/fayl-gitignore/

[^6]: https://sergeymukhin.com/blog/nastroyka-globalnogo-fayla-gitignore

[^7]: https://www.it-tips.ru/myjob/kak-pravilno-nastroit-gitignore/

[^8]: https://phpstack.ru/php/fajl-gitignore-podrobnaa-spargalka.html

[^9]: https://learn.microsoft.com/ru-ru/azure/devops/repos/git/ignore-files?view=azure-devops

[^10]: https://www.youtube.com/watch?v=0DiNdpUx5_Q

