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
////Анимация при прокрутке
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".scroll-anim");
  const animStart = 4;
  const offset = (elem) => {
    const rect = elem.getBoundingClientRect(),
      left = window.pageXOffset || document.documentElement.scrollLeft,
      top = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + top, left: rect.left + left };
  }
  const scrollAnim = (evt) => {
    items.forEach((item) => {
      const height = item.offsetHeight;
      const offsetY = offset(item).top;
      let animPoint = window.innerHeight - Math.min(height, window.innerHeight) / animStart;
      const y = window.pageYOffset || document.documentElement.scrollTop;
      if (y > offsetY - animPoint && y < offsetY + height) {
        item.classList.add("scroll-anim__active");
      } else {
        item.classList.remove("scroll-anim__active");
      }
    });
  }
  if (items.length > 0) {
    document.addEventListener("scroll", scrollAnim);
    setTimeout(scrollAnim, 300);
  }

});

$(".header-content__link").click(function () {
  let elem = $(".send-mail__form");
  let destination = $(elem).offset().top;
  $("html,body").animate({ scrollTop: destination }, {
    duration: 500, easing: "swing"
  });
  return false;
});