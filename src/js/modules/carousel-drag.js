function carouselDrag(id) {
    if (document.querySelector(id)){
    const wrapper = document.querySelector(id);
    const carousel = wrapper.querySelector(".carousel");
    const firstCardWidth = carousel.querySelector(".card").offsetWidth;
    const arrowBtns = wrapper.querySelectorAll(".carousel-drag i");
    const carouselChildrens = [...carousel.children];
    let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;
   // Получаем количество карточек, которые могут одновременно поместиться в карусель
    let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

    // carousel.style.gridAutoColumns = `${100 / columns}%`       

    // Вставляем копии последних нескольких карточек в начало карусели для бесконечной прокрутки
    carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });
   // Вставляем копии первых нескольких карточек в конец карусели для бесконечной прокрутки
    carouselChildrens.slice(0, cardPerView).forEach(card => {
        carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });
   // Прокрутите карусель в нужном месте, чтобы скрыть первые несколько дубликатов карточек в Firefox
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
    // Добавляем прослушиватели событий для кнопок со стрелками для прокрутки карусели влево и вправо
    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
        });
    });
    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
       // Записывает начальный курсор и положение прокрутки карусели
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    }
    const dragging = (e) => {
        if (!isDragging) return;// если isDragged имеет значение false, возвращаемся отсюда
       // Обновляет положение прокрутки карусели в зависимости от движения курсора
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    }
    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    }
    const infiniteScroll = () => {
       // Если карусель в начале, прокрутим до конца
        if (carousel.scrollLeft === 0) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
            carousel.classList.remove("no-transition");
        }
       // Если карусель в конце, прокрутим до начала
        else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove("no-transition");
        }
       // Очистить существующий таймаут и начать автовоспроизведение, если мышь не наведена на карусель
        clearTimeout(timeoutId);
        if (!wrapper.matches(":hover")) autoPlay();
    }
    const autoPlay = () => {
        if (window.innerWidth < 800 || !isAutoPlay) return; // Возврат, если окно меньше 800 или isAutoPlay имеет значение false
        // Автозапуск карусели каждые 2500 мс
        timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
    }
    autoPlay();
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("scroll", infiniteScroll);
    wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    wrapper.addEventListener("mouseleave", autoPlay);
} else {
    console.log("ПРЕДУПРЕЖДЕНИЕ !!! : HTML разметка слайдера", id, "не обнаружена !!!");
    
}
}
export default carouselDrag