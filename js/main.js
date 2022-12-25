// ------ Hero section typed effect ------
const typed = $(".typed");
if (typed) {
  let typed_strings = typed.attr("data-typed-items");
  typed_strings = typed_strings.split(",");
  new Typed(".typed", {
    strings: typed_strings,
    loop: true,
    typeSpeed: 150,
    backSpeed: 50,
    backDelay: 2000,
  });
}

// ------ Add btn-started functionality ------
const startedBtn = $(".btn-started");

function goToNavbar(element) {
  element.on("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: $("#navbar").offset().top,
      behavior: "smooth",
    });
  });
}

goToNavbar(startedBtn);

// ------ Add back-to-top button ------
const backtotop = $(".back-to-top");
const websiteLogo = $(".navbar-brand");

function backToTop(element) {
  element.on("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  function toggleBacktotop() {
    if (window.scrollY > 150) {
      backtotop.addClass("active");
    } else {
      backtotop.removeClass("active");
    }
  }

  $(window).on("scroll", toggleBacktotop);
}

backToTop(backtotop);
backToTop(websiteLogo);

// ------ Add active-section in navbar when scroll through that section ------
function addActiveSection() {
  const sections = $("section");
  sections.each(function (i, section) {
    let $section = $(section);
    const currentNavLink = $(`#${section.id}-link`);
    let position = window.scrollY + 300;

    if (
      position >= $section.offset().top &&
      position <= $section.offset().top + $section.outerHeight()
    ) {
      currentNavLink.addClass("active-section");
    } else {
      currentNavLink.removeClass("active-section");
    }
  });
}
$(window).on("scroll", addActiveSection);

// ------ Scroll to section when click on navbar link with navbar offset ------
const navLinks = $(".sections-name");

function scrollToSection(element) {
  $("html, body").animate(
    {
      scrollTop: $(`#${element}`).offset().top - $("header").innerHeight(),
    },
    1
  );
}

function addLinks(sections) {
  for (section of sections) {
    const sectionName = section.id.slice(0, -5);

    $(section).click(function (e) {
      e.preventDefault();
      scrollToSection(sectionName);
    });
  }
}

$(document).ready(addLinks(navLinks));

// ------ Swiper animation for image showcase ------
const swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  autoHeight: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  mousewheel: true,
  a11y: {
    prevSlideMessage: "Previous slide",
    nextSlideMessage: "Next slide",
  },
});

// ------ Filter portfolio with Isotope script ------
const iso = $(".portfolio-container").imagesLoaded(function () {
  iso.isotope({
    // options...
    itemSelector: ".portfolio-item",
    layoutMode: "masonry",
  });
});

// defined variable to hold value
var primaryFilterValue = "";
var secondaryFilterValue = "";

// bind filter button click
$(".portfolio-filters").on("click", function (event) {
  event.preventDefault();

  if (event.target.parentElement.id === "primary") {
    // primary filters
    primaryFilterValue = event.target.getAttribute("data-filter");
  } else if (event.target.parentElement.id === "secondary") {
    // secondary filters
    secondaryFilterValue = event.target.getAttribute("data-filter");
  }

  let filterValue = `${primaryFilterValue}${secondaryFilterValue}`;

  $(".portfolio-container").isotope({ filter: filterValue });
});

// change filter-active class on buttons
function activeFilters(filter) {
  filter.each(function (i, filter) {
    var $filter = $(filter);
    $filter.on("click", "li", function () {
      $filter.find(".filter-active").removeClass("filter-active");
      $(this).addClass("filter-active");
    });
  });
}

activeFilters($(".primary-filters"));
activeFilters($(".secondary-filters"));

// ------ Add more filters ------
function moreFilters() {
  const dropdown = $(".filters-more");
  dropdown.click((e) => {
    e.preventDefault();
    $(".filters-section").toggleClass("show-filters");
    $(".secondary-filters").toggleClass("active-filters");
    $(".filters-more").toggleClass("filp");
  });
}

moreFilters();
