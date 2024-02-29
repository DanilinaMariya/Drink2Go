const navMain = document.querySelector('.header__nav');
const navToggle = document.querySelector('.header__toggle');
const sliderItems = document.querySelectorAll('.slider__item');
const sliderButtonPrevious = document.querySelector('.slider__button--previous');
const sliderButton = document.querySelectorAll('.slider__button');
const sliderButtonNext = document.querySelector('.slider__button--next');
const sliderStepsConteiner = document.querySelector('.slider__steps-wrapper');
const buttonStepSlider = sliderStepsConteiner.querySelectorAll('.slider__step');
const rangeBar = document.querySelector('.range-bar');
const valueMinPrise = document.querySelector('.filter__input--min');
const valueMaxPrise = document.querySelector('.filter__input--max');
const paginationConteiner = document.querySelector('.pagination');
const paginationButton = document.querySelectorAll('.pagination__button');
const paginationButtonControl = document.querySelectorAll('.pagination__control');
const paginationButtonControlPrev = document.querySelector('.pagination__control--prev');
const paginationButtonControlNext = document.querySelector('.pagination__control--next');
let currentLinkPagination = 1;
let currentSlide = 0;
valueMinPrise.value = 0;
valueMaxPrise.value = 900;

const onHeaderToggleClick = () => {
  if (navMain.classList.contains('header__nav--closed')) {
    navMain.classList.remove('header__nav--closed');
    navMain.classList.add('header__nav--opened');
    navToggle.classList.add('header__toggle--opened');
  } else {
    navMain.classList.remove('header__nav--opened');
    navMain.classList.add('header__nav--closed');
    navToggle.classList.remove('header__toggle--opened');
  }
};

const disabletButton = () => {
  sliderButton.forEach((element) => {
    element.removeAttribute('disabled');
  });

  if (currentSlide === 0) {
    sliderButtonPrevious.setAttribute('disabled', 'disabled');
  }else {
    if (currentSlide === 2) {
      sliderButtonNext.setAttribute('disabled', 'disabled');
    }
  }
};

const nextSlide = () => {
  sliderItems[currentSlide].classList.remove('slider__item--activ');
  buttonStepSlider[currentSlide].classList.remove('slider__step--activ');
  currentSlide = (currentSlide + 1);
  sliderItems[currentSlide].classList.add('slider__item--activ');
  buttonStepSlider[currentSlide].classList.add('slider__step--activ');
  disabletButton();
};

const prevSlide = () => {
  sliderItems[currentSlide].classList.remove('slider__item--activ');
  buttonStepSlider[currentSlide].classList.remove('slider__step--activ');
  currentSlide = currentSlide - 1;
  sliderItems[currentSlide].classList.add('slider__item--activ');
  sliderItems[currentSlide].classList.add('slider__item--activ');
  buttonStepSlider[currentSlide].classList.add('slider__step--activ');
  disabletButton();
};

const onButtonStepSliderClick = (evt) => {
  buttonStepSlider.forEach((element) => {
    element.classList.remove('slider__step--activ');
  });

  sliderItems.forEach((element) => {
    element.classList.remove('slider__item--activ');
  });

  const target = evt.target;
  target.classList.add('slider__step--activ');
  sliderItems[target.dataset.index].classList.add('slider__item--activ');
};

noUiSlider.create(rangeBar, {
  start: [0, 900],
  connect: true,
  range: {
    'min': 0,
    'max': 1000
  },
  step: 50,
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

rangeBar.noUiSlider.on('update', () => {
  valueMinPrise.value = rangeBar.noUiSlider.get()[0];
  valueMaxPrise.value = rangeBar.noUiSlider.get()[1];
});

valueMinPrise.addEventListener('change', function(){
  rangeBar.noUiSlider.set([this.value, valueMaxPrise]);
});

valueMaxPrise.addEventListener('change', function(){
  rangeBar.noUiSlider.set([valueMinPrise, this.value]);
});

const onPaginationButtonControlPrevClick = () => {
  paginationButton[currentLinkPagination].classList.remove('pagination__button--activ');
  currentLinkPagination = currentLinkPagination - 1;
  paginationButton[currentLinkPagination].classList.add('pagination__button--activ');
};

const onPaginationButtonControlNextClick = () => {
  paginationButton[currentLinkPagination].classList.remove('pagination__button--activ');
  currentLinkPagination = currentLinkPagination + 1;
  paginationButton[currentLinkPagination].classList.add('pagination__button--activ');
};

const onPaginationConteinerClick = (evt) => {
  const target = evt.target;

  evt.preventDefault();

  paginationButtonControl.forEach((element) => {
    element.classList.remove('pagination__control--hidden');
  });
  if (target.tagName === 'A') {
    paginationButton.forEach((element) => {
      element.classList.remove('pagination__button--activ');
    });
    target.classList.add('pagination__button--activ');
  }

  if (target.textContent === '1' || currentLinkPagination === 0){
    paginationButtonControlPrev.classList.add('pagination__control--hidden');
  }else {
    if (Number(target.textContent) === paginationButton.length || currentLinkPagination === paginationButton.length - 1){
      paginationButtonControlNext.classList.add('pagination__control--hidden');
    }
  }

};


navToggle.addEventListener('click', onHeaderToggleClick);
sliderButtonPrevious.addEventListener('click', prevSlide);
sliderButtonNext.addEventListener('click', nextSlide);
sliderStepsConteiner.addEventListener('click', onButtonStepSliderClick);
paginationConteiner.addEventListener('click', onPaginationConteinerClick);
paginationButtonControlPrev.addEventListener('click', onPaginationButtonControlPrevClick);
paginationButtonControlNext.addEventListener('click', onPaginationButtonControlNextClick);
