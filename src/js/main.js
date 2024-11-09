/**
 * !(i)
 * Код попадает в итоговый файл, только когда вызвана функция, например FLSFunctions.spollers();
 * Или когда импортирован весь файл, например import "files/script.js";
 * Неиспользуемый код в итоговый файл не попадает.

 * Если мы хотим добавить модуль следует его раскомментировать
 */
// import { MousePRLX } from './libs/parallaxMouse'
// import AOS from 'aos'
// import Swiper, { Navigation, Pagination } from 'swiper';

import { BaseHelpers } from './helpers/base-helpers';
// import { PopupManager } from './modules/popup-manager';
// import { Tabs } from './modules/tabs';
// import { Accordion } from './modules/accordion';
// import mobileNav from './modules/mobile-nav.js';
// import rangeSlider from './modules/range-slider.js';
// import owlCarousel from './modules/owl-carousel.js';
// import ratingInput from './modules/rating.js';
// import { productTabs } from './modules/product-gallery.js';
// import productGallery from './modules/product-gallery.js';

BaseHelpers.checkWebpSupport();

BaseHelpers.calcScrollbarWidth();

BaseHelpers.addTouchClass();

BaseHelpers.addLoadedClass();

BaseHelpers.headerFixed();

import halfTemplate from './modules/half-template.js'
halfTemplate()


import modeSwitcher from './modules/mode-switcher.js';
modeSwitcher ('<svg class="icon icon--dark"><use href="./icons/symbol/sprite.svg#dark"></use></svg>', '<span>Тёмная</span>',
              '<svg class="icon icon--light"><use href="./icons/symbol/sprite.svg#light"></use></svg>','<span>Светлая</span>');

 
import goTop from './modules/go-top.js';    
goTop('<svg class="icon icon--up"><use href="./icons/symbol/sprite.svg#up"></use></svg>');

// import ratingStars from './modules/rating-stars.js';
// ratingStars('1', 'Ваша оценка', '<svg class="icon icon--star"><use href="./icons/symbol/sprite.svg#star"></use></svg>'); 



// import carouselShow from './modules/carousel-show.js';
// carouselShow('#carousel-show-1')

// import carouselDrag from './modules/carousel-drag.js';
// carouselDrag('#carousel-drag')

import carouselSplideInit from './modules/carousel-splide.js';
carouselSplideInit()
new Splide( '.splide', {
    type : 'loop',       // (slide, loop, fade) - соответственно (незацикленное, зацикленное, замена путем fade эффекта)
    direction: 'ttb' ,   // направление карусели (ltr, rtl, ttb) соответсвенно (слева на право, справа на лево, сверху вниз)
    drag: true,          // разрешать перетаскивать слайдер
    autoplay: true,      // включить авто перелистывание
    interval: 2000,      // интервал автоматического перелистывания слайдов в м\сек
    pauseOnHover: true,  // остановить автоматическое перелистывание при наведении курсора мыши

    perMove: 1,          // количество перемещаемых слайдов за раз
    perPage: 1,          // Количество слайдов 
    gap        : '1rem', // зазор между слайдами

    height: '100%',     // высота карусели
    padding: {           // (left, right) - для горизонтальной карусели (top, bottom - для вертикальной карусели)
         left: 0,
         right: 0
    },

    arrows: false,        // отображать стрелки
    heightRatio : 0.2,   // кэф высоты стрелок

    pagination: false,   // отображать пагинацию

    speed: 5000,         // скорость перелистывания в м\сек
    rewindSpeed: 5000,   // скорость перемотки слайдов

    rewind     : true,   // позволяет вообще перемотку слайдов
    rewindByDrag: true,  // позволяет делать перемотку слайдов перетаскиванием мыши
  } ).mount();


/**
 * Открытие/закрытие модальных окон
 * Чтобы модальное окно открывалось и закрывалось
 * На окно повешай атрибут data-popup="<название окна>"
 * На кнопку, которая вызывает окно повешай атрибут data-type="<название окна>"

 * На обертку(.popup) окна добавь атрибут '[data-close-overlay]'
 * На кнопку для закрытия окна добавь класс '.button-close'
 * */
// new PopupManager();

/**
 *  Библиотека для анимаций
 *  документация: https://michalsnik.github.io/aos
 * */
// AOS.init();

/**
 * Параллакс мышей
 * */
// new MousePRLX();

// new Tabs('tabs-example', {
// 	onChange: (data) => {
// 		console.log(data);
// 	},
// });

// new Accordion('.accordion', {
// 	shouldOpenAll: false, // true
// 	defaultOpen: [], // [0,1]
// 	collapsedClass: 'open',
// });

// Мобильная навигация
//---------------Навигация и работа  под меню в мобильном меню ------------------

// mobileNav();	

// function mobileSubNav() {	
    		
//     $('ul.mobile-nav__list>li').click(function () {
//         var _thisis = $(this);	
//         if (_thisis.hasClass('opened')) {
//             $('.mobile-nav ul.nav__sublist').slideUp();
//             _thisis.children('ul').slideUp();
//             _thisis.removeClass('opened');

//         } else {
//             $('.mobile-nav ul.nav__sublist').slideUp();
//             $('ul.mobile-nav__list>li').removeClass('opened')
//             _thisis.children('ul').slideDown();
//             _thisis.addClass('opened');
//         }
//     })
// }
// mobileSubNav();


// ----------------------------Header Menu Hover intent------------------------
// var timer;
// var delay = 1000;

// function hoverIntent() {   
//     $('ul.header-nav__list>li').hover(function () {
//         var _this = $(this);
//         $('ul.header-nav__list>li').removeClass('hover');			
//         _this.addClass('hover');
//         clearTimeout(timer);
//     }, function () {
//         var _this = $(this);
//         timer = setTimeout(function () {
//             _this.removeClass('hover');
//         }, delay);
//     });
// }
// hoverIntent();

//-------------------------------Range slider------------------------------------

// rangeSlider();

//--------------------------инициализация ProductGallery ------------------------
// ---- здесь в связке работает Owl-carousel 2, magnific-popup и табы ! ---------
// productGallery();
// new productTabs('product-tabs', {
// 	onChange: (data) => {
// 		console.log(data);
// 	},
// });
//-------------------------------------------------------------------------------

// owlCarousel();



// new MultiSelectTag('people', {
//     rounded: true,            // закругление border-radius
//     shadow: true,             // тень box-shadow
//     searchHolder: 'Найти...',  // плейсхолдер для поля найти
//     inputHolder: 'Участники',  // плейхолдер для самого инпута
//     maxSelect: 1,              // максимальное количество выбираемых елементов
//     checkBoxHtml:"<input type='checkbox' name='checkbox' class='checkbox'>", // можно подставить кастомный чекбокс
//     alertMessage:'Не разрешено более трех !',
//     tagColor: {                    
//         textColor: 'black',    // цвет текста в тегах
//         borderColor: 'rgb(218, 221, 224)',  // цвет bordera в тегах
//         bgColor: '#eaffe6',      // цвет фона в тегах и выбранного елемента в списке
//     },

//     // -----------------Остальные стили редактируем в файле стилей---------------------------
//     onChange: function (values) {
//         console.log(values)
//     }
// })


// --------------------------------------------------------------------------------
