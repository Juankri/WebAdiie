const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    if(navLinks.classList.contains("active")){
        menuBtn.innerHTML = "&#10005;"
        menuBtn.setAttribute("aria-expanded", "true")
            } else {
                menuBtn.innerHTML = "&#9776;";
                menuBtn.setAttribute("aria-expanded", "false")
            }

            
});