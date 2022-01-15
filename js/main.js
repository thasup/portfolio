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
