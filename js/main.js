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
        if (window.scrollY > 150) {
            backtotop.addClass("active");
        } else {
            backtotop.removeClass("active");
        }
    }

    $(window).on("scroll", toggleBacktotop);
}

backToTop(backtotop);

// Scroll to section when click on navbar link with navbar sticky on top
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
    // use matching filter function
    filterValue = filterFns[filterValue] || filterValue;
    $(".portfolio-container").isotope({ filter: filterValue });
});

// change filter-active class on buttons
$(".portfolio-flters").each(function (i, filter) {
    var $filter = $(filter);
    $filter.on("click", "li", function () {
        $filter.find(".filter-active").removeClass("filter-active");
        $(this).addClass("filter-active");
    });
});
