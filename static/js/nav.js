const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const links = navLinks.querySelectorAll("a");

menuBtn.addEventListener("click", () => {
    const isActive = navLinks.classList.toggle("active");
    document.body.classList.toggle("body-no-scroll", isActive);

    if(isActive){
        menuBtn.innerHTML = "&#10005;"
        menuBtn.setAttribute("aria-expanded", "true")
    } else {
        menuBtn.innerHTML = "&#9776;";
        menuBtn.setAttribute("aria-expanded", "false")
    }
});

links.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.innerHTML = "&#9776;";
        menuBtn.setAttribute("aria-expanded", "false")});
});