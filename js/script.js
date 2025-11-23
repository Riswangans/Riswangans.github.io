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

let lastScroll = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
        // scroll ke bawah -> sembunyikan header
        header.classList.add("header-hidden");
    } else {
        // scroll ke atas -> tampilkan header
        header.classList.remove("header-hidden");
    }

    lastScroll = currentScroll;
});

function setupTablePagination(tableId, rowsPerPage = 5) {
    const table = document.getElementById(tableId);
    const tbody = table.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));
    const filterInput = table.parentElement.querySelector(".filter-input");

    let currentPage = 1;
    let filteredRows = rows;

    const prevBtn = table.parentElement.querySelector(".btn-prev");
    const nextBtn = table.parentElement.querySelector(".btn-next");
    const paginationNumbers = table.parentElement.querySelector(".pagination-numbers");

    function renderTable() {
        tbody.innerHTML = "";
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        filteredRows.slice(start, end).forEach(row => tbody.appendChild(row));
        
        AOS.refresh();

        // Update pagination numbers
        const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
        paginationNumbers.innerHTML = "";
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement("button");
            btn.classList.add("btn", "btn-sm", i === currentPage ? "btn-primary" : "btn-light", "mx-1");
            btn.innerText = i;
            btn.addEventListener("click", () => {
                currentPage = i;
                renderTable();
            });
            paginationNumbers.appendChild(btn);
        }

        // Enable/disable prev & next
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
    }

    // Event filter
    filterInput.addEventListener("input", () => {
        const val = filterInput.value.toLowerCase();
        filteredRows = rows.filter(row => {
            return Array.from(row.cells).some(cell => cell.innerText.toLowerCase().includes(val));
        });
        currentPage = 1;
        renderTable();
    });

    prevBtn.addEventListener("click", () => { currentPage--; renderTable(); });
    nextBtn.addEventListener("click", () => { currentPage++; renderTable(); });

    renderTable();
}

// Inisialisasi tabel
setupTablePagination("tableApk");
setupTablePagination("tableNokos");
setupTablePagination("tableBoost");

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".accordion-collapse").forEach(el => {
        el.style.visibility = "visible";
    });
});
