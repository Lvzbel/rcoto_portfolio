import './src/styles/styles.scss';
import classModifier from './src/js/classModifier';
import './node_modules/@fortawesome/fontawesome-free/css/all.css';
import 'sanitize.css';

// =====================================================
// NABVAR===============================================
// =====================================================

// Grab list, item, link
const list = document.querySelector('.navigation__list');
const items = document.querySelectorAll('.navigation__item');
const links = document.querySelectorAll('.navigation__link');
const nav_btn = document.querySelector('.navigation__button');

const active_list = 'navigation__active-list';
const active_item = 'navigation__active-item';
const active_link = 'navigation__active-link';
const hide = 'hide';

// Toggles classes need for navigation to expand
const toggleNav = () => {
  // Works only if screen width is less or equal to 1280
  if (window.innerWidth <= 1280) {
    // Single element
    list.classList.toggle(active_list);
    list.classList.toggle(hide);
    // multiple elements
    items.forEach((item) => item.classList.toggle(active_item));
    links.forEach((link) => link.classList.toggle(active_link));
  }
};

// Will add the class hide to navigation__nav

nav_btn.addEventListener('click', () => {
  toggleNav();
});

links.forEach((link) => {
  link.addEventListener('click', () => {
    toggleNav();
  });
});

// =====================================================
// Observers============================================
// =====================================================
let region = 'header';

const nav = document.querySelector('#navigation');
const header = document.querySelector('#header');
const qualifications = document.querySelector('#qualifications');
const portfolio = document.querySelector('#portfolio');
const accomplishments = document.querySelector('#accomplishments');
const about = document.querySelector('#about');
const footer = document.querySelector('#footer');

const navHome = document.querySelector('#nav-home');
const navQuad = document.querySelector('#nav-qualifications');
const navPort = document.querySelector('#nav-portfolio');
const navAcc = document.querySelector('#nav-accomplishments');
const navAbout = document.querySelector('#nav-about');
const navContact = document.querySelector('#nav-contact');

const navHightlight = (element, link, threshold = null) => {
  const navOpt = { threshold: threshold };
  const navObserver = new IntersectionObserver((entries, navObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        // Out of section
        // link.classList.remove("selected");
      } else {
        classModifier(link.id, links);
        // In section
        // console.log("Enter", element.id, entry.isIntersecting);
        // link.classList.add("selected");
      }
    });
  }, navOpt);

  navObserver.observe(element);
};

// Portfolio Observer
const mockups = document.querySelectorAll('.portfolio__mockup');
const specs = document.querySelectorAll('.portfolio__specs');

const slideOptions = { rootMargin: '0% 0% 35% 0%', threshold: 0.5 };

const slideProject = new IntersectionObserver((entries, slideProject) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('show');
      slideProject.unobserve(entry.target);
    }
  });
}, slideOptions);

// Porfolio observers
mockups.forEach((mockup) => slideProject.observe(mockup));
specs.forEach((spec) => slideProject.observe(spec));

// Buttons
const portfolioBtn = document.querySelector('#actionBtn');
const backTop = document.querySelector('.footer__action');

const smoothScroll = (btn, target) => {
  btn.addEventListener('click', () => {
    target.scrollIntoView({
      behavior: 'smooth',
    });
    // Removes Focus from btn
    btn.blur();
    // Add Focus to section
    target.focus();
  });
};

// Main Header Action Scroll
smoothScroll(portfolioBtn, portfolio);
// NavBar Action Scroll
smoothScroll(navHome, header);
smoothScroll(navQuad, qualifications);
smoothScroll(navPort, portfolio);
smoothScroll(navAcc, accomplishments);
smoothScroll(navAbout, about);
smoothScroll(navContact, footer);
// Footer Back To The Top Scroll
smoothScroll(backTop, header);

// Navbar status Observers
navHightlight(header, navHome, 0.5);
navHightlight(qualifications, navQuad, 0.3);
navHightlight(portfolio, navPort, 0.1);
navHightlight(accomplishments, navAcc, 0.3);
navHightlight(about, navAbout, 0.1);
navHightlight(footer, navContact);
