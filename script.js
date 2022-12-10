'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//###########################################
//Selecting, Creating, deleting elements

//Selecting Elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);
const header = document.querySelector('.header');
const allSelections = document.querySelectorAll('.section');
console.log(allSelections);
document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);
console.log(document.getElementsByClassName('btn'));

//creating elements
// const message = document.createElement('div');
// message.classList.add('cookie-message');

// message.innerHTML =
//   'We use Cookies. <button class="btn btn--close-cookie">Got it</button>';

// header.prepend(message);
// header.append(message);
// header.before(message);
// header.after(message);

//deleting elements
// const closeBtn = document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//   });

//###########################################
//Styles, attributes and classes

//styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '100%';

// console.log(getComputedStyle(message).backgroundColor);
// console.log(getComputedStyle(message).height);

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'goldenrod');

//Attributes
//src, alt,class,id

const logo = document.querySelector('.nav__logo');
console.log((logo.alt = 'logo'));

console.log(logo.src);
console.log(logo.getAttribute('src'));
console.log(logo.className);
console.log(logo.dataset.versionNumber);

//classes
logo.classList.add('c', 'l', 'a');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c');

//###########################################
//implementing smooth scrolling

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  // console.log(btnScrollTo.getBoundingClientRect());
  console.log(e.target.getBoundingClientRect());
  console.log('Current scroll {X/Y}', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewpoints',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  //Scrolling
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });

  //Modern Way
  section1.scrollIntoView({ behavior: 'smooth' });
});

//###########################################
//Types of events and event handlers

// const alerth1 = function () {
//   alert('hello');
//   document.querySelector('h1').removeEventListener('mouseenter', alerth1);
// };
// document.querySelector('h1').addEventListener('mouseenter', alerth1);

//###########################################
//Evenet propagation in practice

// const randomInt = function (min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };
// const randomColor = function () {
//   return `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// };

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   // console.log('nav link', e.target, e.currentTarget);

//   e.stopPropagation();
// });
// document.querySelector('.nav__links').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     // console.log('nav links', e.target, e.currentTarget);
//   },
//   true
// );
document.querySelector('.nav').addEventListener('click', function (e) {
  // this.style.backgroundColor = randomColor();
  // console.log('nav', e.target, e.currentTarget);
});

//###########################################
//Evenet Delegation

document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   e.preventDefault();

//   //matching strategy
//   if (e.target.classList.contains('nav__link')) {
//     const id = e.target.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//     console.log(id);
//   }
// });

//###########################################
//DOM Traversing

const h1 = document.querySelector('h1');

//going downwards: child

console.log(h1.childNodes);
console.log(h1.children);
console.log(h1.firstChild);
// h1.firstElementChild.style.color = 'blue';
// h1.lastElementChild.style.color = 'goldenrod';

//going upwards: parents
console.log(h1.parentElement);
console.log(h1.parentNode);
// h1.closest('.header').style.background = 'var(--gradient-secondary)';

//going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

//to get all sibling
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) {
    // el.style.transform = 'scale(0.5)';
  }
});

//###########################################
//Building tabbed component
const tabs = document.querySelectorAll('.operations__tab');

const tabsContainer = document.querySelector('.operations__tab-container');

const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  //guard clause
  if (!clicked) return;

  tabs.forEach(function (t) {
    t.classList.remove('operations__tab--active');
  });
  tabsContent.forEach(function (t) {
    t.classList.remove('operations__content--active');
  });
  clicked.classList.add('operations__tab--active');

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//###########################################
//passing argumnets to event handlers

//menu fade animation
const nav = document.querySelector('.nav');

const hoverHandler = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    // const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const siblings = document.querySelectorAll('.nav__link');

    // const logo = link.closest('.nav').querySelector('img');
    const logo = document.querySelector('img');
    siblings.forEach(function (el) {
      if (el !== link) {
        el.style.opacity = opacity;
      }
    });
    logo.style.opacity = opacity;
  }
};

nav.addEventListener('mouseover', function (e) {
  hoverHandler(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
  hoverHandler(e, 1);
});

//###########################################
//Implementing sticky navigation

// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
// window.addEventListener('scroll', function () {
//   // console.log(window.scrollY);

//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

//###########################################
//The Intersection Observer API

// const header = document.querySelector('.header')

const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const obsCallback = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const obsObject = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};
const observer = new IntersectionObserver(obsCallback, obsObject);
observer.observe(header);

//###########################################
// Reveling Elemenets on scroll

//Reveal Sections

const allSections = document.querySelectorAll('section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//###########################################
//Lazy loading Images

const imgTargets = document.querySelectorAll('img[data-src]');
// console.log(imgTargets);
const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

imgTargets.forEach(function (img) {
  imgObserver.observe(img);
});

//###########################################
//Building Slider Component

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnRight = document.querySelector('.slider__btn--right');
  const btnLeft = document.querySelector('.slider__btn--left');
  const dotsContainer = document.querySelector('.dots');

  //Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(function (dot) {
      dot.classList.remove('dots__dot--active');
    });
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  let curSlide = 0;
  const maxSlides = slides.length - 1;

  const goToSlide = function (slide) {
    slides.forEach(function (s, i) {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  //Next Slide
  const nextSlide = function () {
    if (curSlide === maxSlides) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  //Previous Slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlides;
    } else {
      curSlide = curSlide - 1;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  //Initalizers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    console.log(e);
    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  });

  dotsContainer.addEventListener('click', function (e) {
    console.log(e.target);

    if (e.target.classList.contains('dots__dot')) {
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
