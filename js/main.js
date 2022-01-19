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
