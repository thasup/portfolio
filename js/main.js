// Hero section typed effect
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
const backtotop = $(".back-to-top");

// Add back-to-top button
function backToTop(element) {
    element.on("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    function toggleBacktotop() {
        if (window.scrollY > 100) {
            backtotop.addClass("active");
        } else {
            backtotop.removeClass("active");
        }
    }

    $(window).on("scroll", toggleBacktotop);
}

backToTop(backtotop);

// Scroll to section when click on navbar link with navbar sticky on top
const navLinks = $(".nav-link");

function scrollToSection(element) {
    $("html, body").animate(
        {
            scrollTop:
                $(`#${element}`).offset().top - $("header").innerHeight(),
        },
        1
    );
}

function addLinks(sectionSections) {
    for (sectionSection of sectionSections) {
        const sectionName = sectionSection.id.slice(0, -5);

        $(sectionSection).click(function (e) {
            e.preventDefault();
            scrollToSection(sectionName);
            return false;
        });
    }
}

$(document).ready(addLinks(navLinks));

// Filter portfolio with Isotope script
const iso = $(".portfolio-container").isotope({
    // options...
    itemSelector: ".portfolio-item",
    layoutMode: "fitRows",
});

// filter functions
const filterFns = {
    // show if contain with react tag
    react: function () {
        let name = $(this).find(".tech-tags").children().text();
        return name.match(/react/);
    },
};

// bind filter button click
let filtersElem = $(".portfolio-flters");
filtersElem.on("click", function (event) {
    // only work with buttons
    if (!matchesSelector(event.target, "li")) {
        return;
    }
    let filterValue = event.target.getAttribute("data-filter");
    console.log(filterValue);
    // use matching filter function
    filterValue = filterFns[filterValue] || filterValue;
    $(".portfolio-container").isotope({ filter: filterValue });
});

/////////////////////////
// let portfolioFilters = $(".portfolio-flters li");
// console.log(portfolioFilters);

// $(".portfolio-flters li").each((element) => {
//     console.log(element);
//     element.on("click", function (e) {
//         e.preventDefault();
//         portfolioFilters.forEach(function (el) {
//             el.classList.remove("filter-active");
//         });
//         this.classList.add("filter-active");

//         $isotope.arrange({
//             filter: this.getAttribute("data-filter"),
//         });
//     });
// });

/////////////////////

//     $(".portfolio-flters").on("click", "li", function (e) {
//         e.preventDefault();
//         let filterValue = $(this).attr("data-filter");
//         // use filterFn if matches value
//         filterValue = filterFns[filterValue] || filterValue;
//         $isotope.isotope({ filter: filterValue });
//     });

$(".portfolio-flters").each(function (i, filter) {
    const $filter = $(filter);
    $filter.on("click", "li", function (e) {
        e.preventDefault();
        $filter.find("filter-active").removeClass("filter-active");
        $(this).addClass("filter-active");
        console.log($filter);
        console.log(this);
    });
});

// const $filters = $(".portfolio-filters li");
// console.log($filters);

// $(".portfolio-flters").each(function () {
//     $filters.on("click", "li", function (e) {
//         e.preventDefault();
//         $filters.each((element) => element.removeClass("filter-active"));
//         $(this).addClass("filter-active");
//         $isotope.isotope.arrange({
//             filter: this.getAttribute("data-filter"),
//         });
//     });
// });
