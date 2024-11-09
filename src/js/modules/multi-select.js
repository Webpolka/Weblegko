function MultiSelectTag(el, customs = { shadow: false, rounded: true }) {
    // Инициализируем переменные
    var element = null,
        options = null,
        customSelectContainer = null,
        wrapper = null,
        btnContainer = null,
        body = null,
        inputContainer = null,
        inputBody = null,
        input = null,
        button = null,
        drawer = null,
        ul = null;

    // Настраиваем цвета тегов
    var tagColor = customs.tagColor || {};
    tagColor.textColor = tagColor.textColor || "#FF5D29";
    tagColor.borderColor = tagColor.borderColor || "#FF5D29";
    tagColor.bgColor = tagColor.bgColor || "#FFE9E2";

    var selected_values;
    var count;

    // Инициализируем парсер DOM
    var domParser = new DOMParser();

    // Инициализируем плейсхолдер
    var placeHolder = customs.inputHolder || {};
    var alertmessage = customs.alertMessage || {};

    var maxCount = customs.maxSelect + 1;
    var checkBoxCode = customs.checkBoxHtml;
    // Инициализируем
    
    init();   
  
    function init() {
        // инициализация элемента DOM
        element = document.getElementById(el);
        createElements();
        initOptions();
        enableItemSelection();
        setValues(false);


        // Слушатели событий
        button.addEventListener('click', () => {
            if (drawer.classList.contains('hidden')) {
                initOptions();
                enableItemSelection();
                drawer.classList.remove('hidden');
                input.focus();

            } else {
                drawer.classList.add('hidden');
            }
        });

        input.addEventListener('keyup', (e) => {
            initOptions(e.target.value);
            enableItemSelection();
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && inputContainer.childElementCount > 1) {
                const child = body.children[inputContainer.childElementCount - 2].firstChild;
                const option = options.find((op) => op.value == child.dataset.value);
                option.selected = false;
                removeTag(child.dataset.value);
                setValues();
            }
        });

        window.addEventListener('click', (e) => {
            if (!customSelectContainer.contains(e.target)) {
                if ((e.target.nodeName !== "LI") && (!e.target.classList.contains('checkbox'))) {
                    // скрываем параметр списка, только если щелкнуть за его пределами
                    drawer.classList.add('hidden');
                } else {
                    // снова включаем щелчок по опциям списка
                    enableItemSelection();
                }
            }
        });
    }  

    function createElements() {
        // Создаём пользовательские элементы
        options = getOptions();
        element.classList.add('hidden');

        // .multi-select-tag
        customSelectContainer = document.createElement('div');
        customSelectContainer.classList.add('mult-select-tag');

        // .container
        wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');

        // body
        body = document.createElement('div');
        body.classList.add('body');
        if (customs.shadow) {
            body.classList.add('shadow');
        }
        if (customs.rounded) {
            body.classList.add('rounded');
        }

        // .input-container
        inputContainer = document.createElement('div');
        inputContainer.classList.add('input-container');
        inputContainer.classList.add('input-placeholder');

        // input
        input = document.createElement('input');
        input.classList.add('input');
        input.placeholder = `${customs.searchHolder || 'Найти...'}`;

        inputBody = document.createElement('inputBody');
        inputBody.classList.add('input-body');
        inputBody.append(input);

        body.append(inputContainer);

        // .btn-container
        btnContainer = document.createElement('div');
        btnContainer.classList.add('btn-container');

        // button
        button = document.createElement('button');
        button.type = 'button';
        btnContainer.append(button);

        const icon = domParser.parseFromString(
            `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="18 15 12 21 6 15"></polyline>
            </svg>`, 'image/svg+xml').documentElement;

        button.append(icon);

        body.append(btnContainer);
        wrapper.append(body);

        drawer = document.createElement('div');
        drawer.classList.add(...['drawer', 'hidden']);
        if (customs.shadow) {
            drawer.classList.add('shadow');
        }
        if (customs.rounded) {
            drawer.classList.add('rounded');
        }
        drawer.append(inputBody);
        ul = document.createElement('ul');

        drawer.appendChild(ul);

        customSelectContainer.appendChild(wrapper);
        customSelectContainer.appendChild(drawer);

        // Размещаем TailwindTagSelection после элемента
        if (element.nextSibling) {
            element.parentNode.insertBefore(customSelectContainer, element.nextSibling);
        } else {
            element.parentNode.appendChild(customSelectContainer);
        }

    }

    function createElementInSelectList(option, val, selected = false) {
        // Создаем <li> elmt в раскрывающемся списке,
        // выбранные параметры сообщают, нужно ли установить флажок и изменить цвет фона
        const li = document.createElement('li');
        li.innerHTML = checkBoxCode; // добавьте флажок слева от <li>
        li.innerHTML += option.label;
        li.dataset.value = option.value;
        const checkbox = li.firstChild;
        checkbox.dataset.value = option.value;

        // Для поиска
        if (val && option.label.toLowerCase().startsWith(val.toLowerCase())) {
            ul.appendChild(li);
        } else if (!val) {
            ul.appendChild(li);
        }

        // Измените цвет фона и установите флажок
        if (selected) {
            li.style.backgroundColor = tagColor.bgColor;
            // checkbox.checked = true;
            checkbox.classList.add('checknut');
        }
    }

    function initOptions(val = null) {
        ul.innerHTML = '';
        for (var option of options) {
            // если вариант уже выбран
            if (option.selected) {
                !isTagSelected(option.value) && createTag(option);

                // Создаем опцию в списке, но с другим цветом
                createElementInSelectList(option, val, true);
            } else {
                createElementInSelectList(option, val);
            }
        }
    }

    function createTag(option) {
        // Создать и показать выбранный элемент как тег
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item-container');
        itemDiv.style.color = tagColor.textColor || '#2c7a7b';
        itemDiv.style.borderColor = tagColor.borderColor || '#81e6d9';
        itemDiv.style.background = tagColor.bgColor || '#e6fffa';
        const itemLabel = document.createElement('div');
        itemLabel.classList.add('item-label');
        itemLabel.style.color = tagColor.textColor || '#2c7a7b';
        itemLabel.innerHTML = option.label;
        itemLabel.dataset.value = option.value;
        const itemClose = domParser.parseFromString(
            `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="item-close-svg">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>`, 'image/svg+xml').documentElement;

        itemClose.addEventListener('click', (e) => {
            const unselectOption = options.find((op) => op.value == option.value);
            unselectOption.selected = false;
            removeTag(option.value);
            initOptions();
            setValues();

        });

        if ((count) <= maxCount) {
            itemDiv.appendChild(itemLabel);
            itemDiv.appendChild(itemClose);
            inputContainer.append(itemDiv);
        }
    }


    function enableItemSelection() {
        // Добавить прослушиватель кликов в элементы списка

        for (var li of ul.children) {
            li.addEventListener('click', (e) => {


                if (options.find((o) => o.value == e.target.dataset.value).selected === false) {
                    // если опция не выбрана, мы выбираем ее   
                    if ((count) < maxCount) {
                        options.find((o) => o.value == e.target.dataset.value).selected = true;
                        input.value = null;
                        initOptions();
                        setValues();

                        // input.focus() // выводит список на вход
                    } else {
                        // -------------------------------------------------------------------------------------------------------------------------------------
                        myAlert('Предупреждение !', alertmessage, 'Ок');
                        // alert('Разрешено выбрать только ' + (maxCount - 1) + ' человека !');
                    }
                } else {
                    // если он уже выбран, мы снимаем его выбор


                    options.find((o) => o.value == e.target.dataset.value).selected = false;
                    input.value = null;
                    initOptions();
                    setValues();
                    // input.focus() // вызывает список на входе
                    removeTag(e.target.dataset.value);

                }

            });
        }
    }


    function isTagSelected(val) {
        // Если элемент уже выбран
        for (var child of inputContainer.children) {
            if (!child.classList.contains('input-body') && child.firstChild.dataset.value == val) {
                return true;
            }
        }
        return false;
    }

    function removeTag(val) {
        // Удалить выбранный элемент
        for (var child of inputContainer.children) {
            if (!child.classList.contains('input-body') && child.firstChild.dataset.value == val) {
                inputContainer.removeChild(child);
            }
        }
    }

    function setValues(fireEvent = true) {
        // Обновить окончательные значения элемента
        selected_values = [];
        for (var i = 0; i < options.length; i++) {
            element.options[i].selected = options[i].selected;
            if (options[i].selected) {
                selected_values.push({ label: options[i].label, value: options[i].value });
            }
        }
        if (fireEvent && customs.hasOwnProperty('onChange')) {
            customs.onChange(selected_values);
        }
        // Появление и исчезание плейсхолдера
        if ((selected_values.length > 0) && ('div.input-container')) {
            document.querySelector('div.input-container').classList.remove('input-placeholder');
        } else {
            document.querySelector('div.input-container').classList.add('input-placeholder');
            addPlaceholder();
        }
        count = selected_values.length + 1;
        // console.log(selected_values.length);       
        return count;

    }

    // Функция добавления собственного плейсхолдера
    function addPlaceholder() {
        let s = document.createElement('style');
        s.innerHTML = '.input-placeholder:before{content:"' + placeHolder + '";}';
        document.head.appendChild(s);
    }


    function getOptions() {
        // Параметры элемента карты
        return [...element.options].map((op) => {
            return {
                value: op.value,
                label: op.label,
                selected: op.selected,
            };
        });
    }

    function myAlert(title, message, btnText) {
        const myAlert = document.querySelector('.myAlert');
        const myAlertHead = document.querySelector('.myAlert-head');
        const myAlertContent = document.querySelector('.myAlert-content');
        const myAlertFoot = document.querySelector('.myAlert-foot');
        const myAlertClose = document.querySelector('.myAlertClose');

        myAlert.classList.add('myAlert--visible');
        myAlertHead.innerHTML = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' + title;
        myAlertContent.innerHTML = message;
        myAlertFoot.querySelector('.myAlertClose').innerHTML = btnText;

        myAlertClose.addEventListener('click', (event) => {
            myAlert.classList.remove('myAlert--visible');
        });
    }
    // myAlert('Предупреждение !','Тело сообщения.','Ок');
}


export default MultiSelectTag;
