////Тест на поддержку webp
const testWebp = (callback) => {
  let webp = new Image();
  webp.onload = webp.onerror = () => {
    callback(webp.height === 2);
  }
  webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}
testWebp(support => {
  if (support === true) document.querySelector('body').classList.add('webp');
  else document.querySelector('body').classList.add('no-webp');
});
////Адаптивное меню

const adaptive_menu = () => {
  let w = window.outerWidth;
  let stdMenu = document.querySelector(".header-menu");
  let menu = document.querySelector(".header-menu__list");
  let mobileMenu = document.querySelector(".mobile-menu__list");
  if (w < 700) {
    if (!mobileMenu.classList.contains('done')) {
      mobileMenu.classList.add('done');
      mobileMenu.append(menu);
    }
  } else {
    if (mobileMenu.classList.contains('done')) {
      mobileMenu.classList.remove('done');
      stdMenu.append(menu);
    }
  }
}

window.onresize = adaptive_menu;
adaptive_menu();
//
const btn = document.querySelector(".mobile-menu__icon");
console.log(btn);
if (btn) {
  btn.addEventListener("click", (evt) => {
    btn.classList.toggle("active");
    const menu = document.querySelector(".mobile-menu__list");
    if (menu) menu.classList.toggle("active");
    document.body.classList.toggle("lock");
  });
};
$(document).ready(function () {
  $(".mail-slogan__slider").slick({
    arrows: false, //Кнопки - стрелки
    dots: true, //Буллеты
    adaptiveHeight: false, //подстройка по высоте при вкюченном align-items: flex-start;
    slidesToShow: 1,//Количество отображаемых элементов
    slidesToScroll: 1,//Количество слайдов для прокрутки 
    speed: 1000,//Скорость прокрутки
    easing: "linear",//Тип анимации
    infinite: true,//Зацикленность
    initialSlide: 0,//Начальный слайд
    autoplay: true,//Автовоспроизведение
    autoplaySpeed: 3000,//Скорочть воспроизведения
    pauseOnFocus: true,//Пауза при фокусе
    pauseOnHover: true,//Пауза при наведении
    pauseOnDotsHover: true,//Пауза при наведении на буллеты
    draggable: false,//Управление мышью
    swipe: false,//Свайп на телефоне
    touchThreshold: 5,//Величина свайпа для перехода
    touchMove: false,//Пережвижение по слайдеру тачем
    WaitForAnimate: true,//Ожидание окончания предыдущего пролистывания
    centerMode: true,//Выбранный слайд по центру
    variableWidth: false,//Вариативная ширина (не подстраивать ширину под настройки слайдера)
    fade: true,//Смена слайдов через fade (Должен отображаться только 1 слайд)
  });
  // если для изображений указать значение не в src а в data-lazy,
  // то загрузка будет происходить не сразу, а только при переходе на слайд
  // https://kenwheeler.github.io/slick/
});