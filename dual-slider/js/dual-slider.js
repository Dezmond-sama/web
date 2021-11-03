class DualSlider {
  constructor(item) {
    this.render(item, item.getAttribute("data-min-label") || "", item.getAttribute("data-max-label") || "", item.getAttribute("data-name") || "");
    this.offsetX = item.querySelector(".dual-slider__graphic").offsetLeft;
    this.minValue = +item.getAttribute("data-min") || 0;
    this.maxValue = +item.getAttribute("data-max") || 100;
    this.lowerValue = +(item.getAttribute("data-lower") || 0);
    this.upperValue = +(item.getAttribute("data-upper") || 100);
    this.lowerHandler = item.querySelector(".dual-slider__handler--left");
    this.upperHandler = item.querySelector(".dual-slider__handler--right");
    this.fillElement = item.querySelector(".dual-slider__fill");
    this.inputLower = item.querySelector(".dual-slider__lower-border");
    this.inputUpper = item.querySelector(".dual-slider__upper-border");
    let range = item.querySelector(".dual-slider__range");
    this.minCoord = range.offsetLeft;
    this.maxCoord = range.clientWidth + this.minCoord;
    this.range = range.clientWidth;
    this.init();
  }
  render(item, minLabel, maxLabel, name) {
    item.innerHTML = `
    <label class="dual-slider__label">
      <span class="dual-slider__text">${minLabel}</span>
      <input type="text" name="${name}_lower" class="dual-slider__lower-border dual-slider__input">
    </label>
    <label class="dual-slider__label">
      <span class="dual-slider__text">${maxLabel}</span>
      <input type="text" name="${name}_upper" class="dual-slider__upper-border dual-slider__input">
    </label>
    <div class="dual-slider__graphic">
      <div class="dual-slider__range"></div>
      <div class="dual-slider__fill"></div>
      <div class="dual-slider__handler dual-slider__handler--left" tabindex="0"></div>
      <div class="dual-slider__handler dual-slider__handler--right" tabindex="0"></div>
    </div>
    `;
  }
  init() {
    this.setUpperCoord(this.valueToCoords(this.upperValue));
    this.setLowerCoord(this.valueToCoords(this.lowerValue));
    this.lowerHandler.addEventListener("touchstart", this.mouseDown);
    this.upperHandler.addEventListener("touchstart", this.mouseDown);
    this.lowerHandler.addEventListener("mousedown", this.mouseDown);
    this.upperHandler.addEventListener("mousedown", this.mouseDown);
    this.lowerHandler.addEventListener("keydown", this.moveSide);
    this.upperHandler.addEventListener("keydown", this.moveSide);
    this.inputLower.addEventListener("keyup", () => {
      this.setLower(this.valueToCoords(this.inputLower.value));
    });
    this.inputUpper.addEventListener("keyup", () => {
      this.setUpper(this.valueToCoords(this.inputUpper.value));
    });
    this.inputLower.addEventListener("blur", () => {
      this.setLowerCoord(this.valueToCoords(this.inputLower.value));
    });
    this.inputUpper.addEventListener("blur", () => {
      this.setUpperCoord(this.valueToCoords(this.inputUpper.value));
    });
  }
  clamp(value, min = 0, max = 1) {
    return Math.min(Math.max(value, min), max);
  }
  coordsToValue(coord) {
    return this.minValue + (this.maxValue - this.minValue) * (coord - this.minCoord) / this.range;
  }
  valueToCoords(value) {
    return this.minCoord + (this.maxCoord - this.minCoord) * (value - this.minValue) / (this.maxValue - this.minValue);
  }
  setUpper(value) {
    this.upperHandler.style.left = this.clamp(value, this.lowerHandler.offsetLeft, this.maxCoord) + 'px';
    this.upperValue = this.clamp(this.coordsToValue(value), this.lowerValue, this.maxValue);
    this.updateFill();
  }
  setUpperCoord(value) {
    this.setUpper(value);
    this.updateInputs();
  }
  setLower(value) {
    this.lowerHandler.style.left = this.clamp(value, this.minCoord, this.upperHandler.offsetLeft) + 'px';
    this.lowerValue = this.clamp(this.coordsToValue(value), this.minValue, this.upperValue);
    this.updateFill();
  }
  setLowerCoord(value) {
    this.setLower(value);
    this.updateInputs();
  }
  updateFill() {
    this.fillElement.style.left = this.lowerHandler.offsetLeft + 'px';
    this.fillElement.style.width = this.upperHandler.offsetLeft - this.lowerHandler.offsetLeft + 'px';
  }
  updateInputs() {
    this.inputLower.value = Math.round(this.lowerValue);
    this.inputUpper.value = Math.round(this.upperValue);
  }
  moveSide = (evt) => {
    let down = ["KeyA", "ArrowLeft", "ArrowDown"];
    let up = ["KeyD", "ArrowRight", "ArrowUp"];
    if (!down.includes(evt.code) && !up.includes(evt.code)) return;
    evt.preventDefault();
    let shiftX = down.includes(evt.code) ? -1 : 1;

    let currentHandler = evt.target;
    currentHandler.focus();
    this.upper = currentHandler.classList.contains("dual-slider__handler--right");

    if (this.upper) this.setUpperCoord(this.upperHandler.offsetLeft + shiftX);
    else this.setLowerCoord(this.lowerHandler.offsetLeft + shiftX);
  }
  mouseDown = (evt) => {
    if (evt.type === "mousedown") {
      evt.preventDefault();
      document.addEventListener("mousemove", this.mouseMove);
      document.addEventListener("mouseup", this.mouseUp);
      this.startX = evt.clientX;
    } else {
      document.addEventListener("touchmove", this.mouseMove);
      document.addEventListener("touchend", this.mouseUp);
      this.startX = evt.touches[0].clientX;
    }
    let currentHandler = evt.target;
    currentHandler.focus();
    this.upper = currentHandler.classList.contains("dual-slider__handler--right")


  }
  mouseMove = (evt) => {
    let shiftX = 0;
    if (evt.type === "mousemove") {
      evt.preventDefault();
      shiftX = this.startX - evt.clientX;
      this.startX = evt.clientX;
    } else {
      shiftX = this.startX - evt.touches[0].clientX;
      this.startX = evt.touches[0].clientX;
    }
    if (this.upper) this.setUpperCoord(this.upperHandler.offsetLeft - shiftX);
    else this.setLowerCoord(this.lowerHandler.offsetLeft - shiftX);
  }
  mouseUp = (evt) => {
    if (evt.type === "mouseup") {
      evt.preventDefault();
      document.removeEventListener("mousemove", this.mouseMove);
      document.removeEventListener("mouseup", this.mouseUp);
    } else {
      document.removeEventListener("touchmove", this.mouseMove);
      document.removeEventListener("touchend", this.mouseUp);
    }
  }
}

document.querySelectorAll(".dual-slider").forEach(item => {
  new DualSlider(item);
});