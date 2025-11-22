// --- Auto Slide Testimonial ---
const slider = document.getElementById("testimonialSlider");
let autoScroll = true;

function autoSlide() {
  if (!autoScroll) return;

  slider.scrollBy({
    left: slider.clientWidth,
    behavior: "smooth"
  });

  // balik ke awal kalau sudah mentok
  if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
    setTimeout(() => {
      slider.scrollTo({ left: 0, behavior: "smooth" });
    }, 2000);
  }
}

setInterval(autoSlide, 3000);

// Stop auto slide jika user swipe
slider.addEventListener("touchstart", () => {
  autoScroll = false;
});

slider.addEventListener("touchend", () => {
  setTimeout(() => autoScroll = true, 3000);
});



document.querySelectorAll(".btn-wa").forEach(btn => {
  btn.addEventListener("click", function () {

    const row = this.closest("tr");

    const nama = row.querySelector(".nama")?.innerText || "-";
    const desc = row.querySelector(".desc")?.innerText || "Tidak ada deskripsi";
    const harga = row.querySelector(".harga")?.innerText || "-";

    let pesan = `Halo, saya ingin membeli:\n\n`;
    pesan += `Produk: *${nama}*\n`;
    if (desc !== "-") pesan += `Deskripsi: ${desc}\n`;
    pesan += `Harga: ${harga}\n\n`;
    pesan += `Mohon diproses ya.`;

    const encoded = encodeURIComponent(pesan);
    const nomor = "18254875043";

    window.open(`https://wa.me/${nomor}?text=${encoded}`, "_blank");
  });
});
