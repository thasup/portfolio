// ------ Hero section typed effect ------
const typed = $(".typed");
if (typed) {
    let typed_strings = typed.attr("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
        strings: typed_strings,
        loop: true,
        typeSpeed: 100,
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
        //debug
        // console.log("section", section);
        // console.log("$section", $section);
        // console.log("position", position);
        // console.log("currentNavLink", currentNavLink[0].id);
        // console.log("offsetTop", section.offsetTop);
        // console.log("offsetHeight", section.offsetHeight);
        // console.log(
        //     "section.offsetTop + section.offsetHeight",
        //     section.offsetTop + section.offsetHeight
        // );
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
            scrollTop:
                $(`#${element}`).offset().top - $("header").innerHeight(),
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

// ------ Filter portfolio with Isotope script ------
const iso = $(".portfolio-container").isotope({
    // options...
    itemSelector: ".portfolio-item",
    layoutMode: "masonry",
});

// filter functions
const filterFns = {
    // show if contain with react tag
    react: function () {
        let name = $(this).find(".tech-tag").children().text();
        return name.match(/react/);
    },
};

// bind filter button click
let filtersElem = $(".primary-filters");
filtersElem.on("click", function (event) {
    // only work with buttons
    if (!matchesSelector(event.target, "li")) {
        return;
    }
    let filterValue = event.target.getAttribute("data-filter");
    // use matching filter function
    filterValue = filterFns[filterValue] || filterValue;
    $(".portfolio-container").isotope({ filter: filterValue });
});

// change filter-active class on buttons
$(".primary-filters").each(function (i, filter) {
    var $filter = $(filter);
    $filter.on("click", "li", function () {
        $filter.find(".filter-active").removeClass("filter-active");
        $(this).addClass("filter-active");
    });
});

// Add more filters
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
