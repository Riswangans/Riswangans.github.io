// ====== TESTIMONI SLIDER ======
let currentTesti = 0;

function showTestimonial(index) {
    const items = document.querySelectorAll(".testi-card");
    items.forEach((item, i) => {
        item.style.display = i === index ? "block" : "none";
    });
}

function nextTestimonial() {
    const items = document.querySelectorAll(".testi-card");
    currentTesti = (currentTesti + 1) % items.length;
    showTestimonial(currentTesti);
}

function prevTestimonial() {
    const items = document.querySelectorAll(".testi-card");
    currentTesti = (currentTesti - 1 + items.length) % items.length;
    showTestimonial(currentTesti);
}

document.addEventListener("DOMContentLoaded", () => {
    showTestimonial(0);
});


// ====== LIHAT SEMUA TESTIMONI / TUTUP ======
let allShown = false;

function toggleAllTestimonials() {
    const items = document.querySelectorAll(".testi-card");
    const btn = document.getElementById("toggleTestiBtn");

    if (!allShown) {
        items.forEach(i => i.style.display = "block");
        btn.innerText = "Tutup Semua Ulasan";
        allShown = true;
    } else {
        items.forEach((i, idx) => {
            i.style.display = idx === 0 ? "block" : "none";
        });
        btn.innerText = "Lihat Semua Ulasan";
        allShown = false;
        currentTesti = 0;
    }
}


// ====== FAQ ACCORDION ======
const acc = document.getElementsByClassName("faq-item");

for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        const panel = this.querySelector(".faq-answer");

        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}


// ====== SMOOTH SCROLL FOR CTA BUTTONS ======
document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});


// ====== DEBUG ======
console.log("script.js loaded successfully.");
