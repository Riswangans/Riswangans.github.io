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

// --- Header Hide on Scroll ---
let lastScroll = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add("header-hidden");
    } else {
        header.classList.remove("header-hidden");
    }

    lastScroll = currentScroll;
});

// --- Global Variables ---
let currentPage = 1;
let filteredProducts = [];
const productsPerPage = 5;

// --- Prevent Horizontal Scroll on Layanan Section ---
function preventHorizontalScrollOnLayanan() {
    const layananSection = document.getElementById('layananSection');
    if (!layananSection) return;
    
    layananSection.addEventListener('wheel', (e) => {
        // Cek jika ada scroll horizontal
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            e.preventDefault();
            return false;
        }
    }, { passive: false });
    
    // Untuk touch devices
    let touchStartX = 0;
    let touchStartY = 0;
    
    layananSection.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    layananSection.addEventListener('touchmove', (e) => {
        if (e.touches.length !== 1) return;
        
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        
        const diffX = touchX - touchStartX;
        const diffY = touchY - touchStartY;
        
        // Jika scroll horizontal lebih dominan, prevent
        if (Math.abs(diffX) > Math.abs(diffY)) {
            e.preventDefault();
            return false;
        }
    }, { passive: false });
}

// --- Load Testimoni from setting.js ---
function loadTestimonials() {
    const testimonialSlider = document.getElementById("testimonialSlider");
    if (!testimonialSlider || !settingTestimoni) return;
    
    testimonialSlider.innerHTML = "";
    
    settingTestimoni.forEach((testimoni, index) => {
        const testimonialCard = document.createElement("div");
        testimonialCard.className = "testimonial-card col-md-4";
        testimonialCard.setAttribute("data-aos", "fade-up");
        testimonialCard.setAttribute("data-aos-delay", (index * 100).toString());
        
        testimonialCard.innerHTML = `
            <p>"${testimoni.text}"</p>
            <h4>- ${testimoni.author}</h4>
        `;
        
        testimonialSlider.appendChild(testimonialCard);
    });
    
    // Reinitialize AOS untuk testimoni baru
    AOS.refresh();
}

// --- Load FAQ from setting.js ---
function loadFAQ() {
    const faqList = document.getElementById("faqList");
    if (!faqList || !settingFAQ) return;
    
    faqList.innerHTML = "";
    
    settingFAQ.forEach((faq, index) => {
        const faqId = index + 1;
        const accordionItem = document.createElement("div");
        accordionItem.className = "accordion-item";
        
        accordionItem.innerHTML = `
            <h2 class="accordion-header" id="heading${faqId}">
                <button class="accordion-button collapsed" type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#collapse${faqId}" 
                        aria-expanded="false" 
                        aria-controls="collapse${faqId}">
                    ${faq.question}
                </button>
            </h2>
            <div id="collapse${faqId}" 
                 class="accordion-collapse collapse" 
                 aria-labelledby="heading${faqId}" 
                 data-bs-parent="#faqList">
                <div class="accordion-body">
                    ${faq.answer}
                </div>
            </div>
        `;
        
        faqList.appendChild(accordionItem);
    });
    
    // Show accordion content
    setTimeout(() => {
        document.querySelectorAll(".accordion-collapse").forEach(el => {
            el.style.visibility = "visible";
        });
    }, 100);
}

// --- Initialize Everything ---
document.addEventListener("DOMContentLoaded", () => {
    // Initialize AOS
    AOS.init();
    
    // Prevent horizontal scroll on layanan section
    preventHorizontalScrollOnLayanan();
    
    // Load dynamic content
    loadTestimonials();
    loadFAQ();
    
    // Sort produk berdasarkan kategori dan nama
    sortProducts();
    
    // Setup kategori filter dropdown
    setupKategoriFilter();
    
    // Load all products initially
    filteredProducts = allProducts;
    renderProducts();
    
    // Setup filter events
    setupFilterEvents();
});

// --- Sort Products (Kategori & Nama sesuai abjad) ---
function sortProducts() {
    if (!allProducts || !Array.isArray(allProducts)) return;
    
    allProducts.sort((a, b) => {
        if (a.kategori < b.kategori) return -1;
        if (a.kategori > b.kategori) return 1;
        if (a.nama < b.nama) return -1;
        if (a.nama > b.nama) return 1;
        return 0;
    });
}

// --- Setup Kategori Filter ---
function setupKategoriFilter() {
    const kategoriSelect = document.querySelector(".filter-kategori");
    if (!kategoriSelect) return;
    
    kategoriSelect.innerHTML = '<option value="all">Semua Kategori</option>';
    
    if (!allProducts || !Array.isArray(allProducts)) return;
    
    const kategoriSet = new Set(allProducts.map(p => p.kategori));
    const sortedKategori = Array.from(kategoriSet).sort();
    
    sortedKategori.forEach(kategori => {
        const option = document.createElement("option");
        option.value = kategori;
        option.textContent = kategori;
        kategoriSelect.appendChild(option);
    });
}

// --- Setup Filter Events ---
function setupFilterEvents() {
    const searchInput = document.querySelector(".filter-input");
    const kategoriSelect = document.querySelector(".filter-kategori");
    
    if (searchInput) searchInput.addEventListener("input", filterProducts);
    if (kategoriSelect) kategoriSelect.addEventListener("change", filterProducts);
}

// --- Filter Products ---
function filterProducts() {
    const searchInput = document.querySelector(".filter-input");
    const kategoriSelect = document.querySelector(".filter-kategori");
    
    if (!searchInput || !kategoriSelect || !allProducts) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    const selectedKategori = kategoriSelect.value;
    
    filteredProducts = allProducts.filter(product => {
        const matchesKategori = selectedKategori === "all" || product.kategori === selectedKategori;
        const matchesSearch = 
            product.nama.toLowerCase().includes(searchTerm) ||
            (product.desc && product.desc.toLowerCase().includes(searchTerm)) ||
            product.harga.toLowerCase().includes(searchTerm) ||
            product.kategori.toLowerCase().includes(searchTerm);
        
        return matchesKategori && matchesSearch;
    });
    
    currentPage = 1;
    renderProducts();
}

// --- Render Products to Table ---
function renderProducts() {
    const tbody = document.querySelector("#tableProduk tbody");
    if (!tbody) return;
    
    tbody.innerHTML = "";
    
    if (!filteredProducts || filteredProducts.length === 0) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td colspan="5" class="text-center py-4 text-muted">
                Tidak ada produk yang ditemukan
            </td>
        `;
        tbody.appendChild(row);
    } else {
        const start = (currentPage - 1) * productsPerPage;
        const end = start + productsPerPage;
        const productsToShow = filteredProducts.slice(start, end);
        
        productsToShow.forEach(product => {
            const row = document.createElement("tr");
            const hargaSatuBaris = product.harga ? product.harga.replace(/\s+/g, ' ').trim() : "";
            
            row.innerHTML = `
                <td class="align-middle">${product.kategori || ""}</td>
                <td class="nama align-middle">${product.nama || ""}</td>
                <td class="desc align-middle">${product.desc || ""}</td>
                <td class="harga align-middle text-nowrap">${hargaSatuBaris}</td>
                <td class="align-middle"><button class="btn btn-success btn-wa">Beli</button></td>
            `;
            tbody.appendChild(row);
        });
    }
    
    updatePagination();
    attachWAEvents();
}

// --- Smart Pagination Responsif ---
function updatePagination() {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const paginationNumbers = document.querySelector(".pagination-numbers");
    const prevBtn = document.querySelector(".btn-prev");
    const nextBtn = document.querySelector(".btn-next");
    
    if (!paginationNumbers || !prevBtn || !nextBtn) return;
    
    // Hapus info halaman jika ada
    const pageInfo = document.querySelector(".page-info");
    if (pageInfo) pageInfo.remove();
    
    // Clear existing pagination
    paginationNumbers.innerHTML = "";
    
    // Jika tidak ada produk
    if (totalPages === 0) {
        paginationNumbers.innerHTML = "";
        updateButtonColors(prevBtn, nextBtn, true, true);
        return;
    }
    
    // Responsif: Tampilkan lebih sedikit tombol di mobile
    const isMobile = window.innerWidth < 768;
    const maxVisibleButtons = isMobile ? 3 : 5;
    
    if (totalPages <= maxVisibleButtons) {
        // Tampilkan semua tombol jika sedikit
        for (let i = 1; i <= totalPages; i++) {
            addPageButton(i, paginationNumbers);
        }
    } else {
        // Tampilkan tombol pintar dengan ellipsis
        addPageButton(1, paginationNumbers);
        
        // Hitung tombol yang akan ditampilkan
        let startPage = Math.max(2, currentPage - 1);
        let endPage = Math.min(totalPages - 1, currentPage + 1);
        
        // Sesuaikan untuk mobile
        if (isMobile) {
            if (currentPage <= 2) {
                endPage = 3;
            } else if (currentPage >= totalPages - 1) {
                startPage = totalPages - 2;
            }
        }
        
        // Tambah ellipsis kiri jika perlu
        if (startPage > 2) {
            const ellipsis1 = document.createElement("span");
            ellipsis1.className = "pagination-ellipsis";
            ellipsis1.textContent = "...";
            paginationNumbers.appendChild(ellipsis1);
        }
        
        // Tombol tengah
        for (let i = startPage; i <= endPage; i++) {
            addPageButton(i, paginationNumbers);
        }
        
        // Tambah ellipsis kanan jika perlu
        if (endPage < totalPages - 1) {
            const ellipsis2 = document.createElement("span");
            ellipsis2.className = "pagination-ellipsis";
            ellipsis2.textContent = "...";
            paginationNumbers.appendChild(ellipsis2);
        }
        
        // Tombol terakhir
        addPageButton(totalPages, paginationNumbers);
    }
    
    // Update warna tombol
    updateButtonColors(prevBtn, nextBtn, currentPage === 1, currentPage === totalPages);
    
    // Event listeners untuk tombol prev/next
    prevBtn.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            renderProducts();
            scrollToTable();
        }
    };
    
    nextBtn.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderProducts();
            scrollToTable();
        }
    };
    
    // Force update styling tombol aktif
    setTimeout(() => {
        const activeButtons = paginationNumbers.querySelectorAll('.btn-primary');
        const inactiveButtons = paginationNumbers.querySelectorAll('.btn-light');
        
        activeButtons.forEach(btn => {
            btn.style.backgroundColor = '#007AFF';
            btn.style.borderColor = '#007AFF';
            btn.style.color = 'white';
            btn.style.fontWeight = '600';
        });
        
        inactiveButtons.forEach(btn => {
            btn.style.backgroundColor = '#f8f9fa';
            btn.style.borderColor = '#dee2e6';
            btn.style.color = '#495057';
        });
    }, 10);
}

// --- Helper untuk update warna tombol ---
function updateButtonColors(prevBtn, nextBtn, isPrevDisabled, isNextDisabled) {
    if (isPrevDisabled) {
        prevBtn.disabled = true;
        prevBtn.classList.remove("btn-success");
        prevBtn.classList.add("btn-secondary");
    } else {
        prevBtn.disabled = false;
        prevBtn.classList.remove("btn-secondary");
        prevBtn.classList.add("btn-success");
    }
    
    if (isNextDisabled) {
        nextBtn.disabled = true;
        nextBtn.classList.remove("btn-success");
        nextBtn.classList.add("btn-secondary");
    } else {
        nextBtn.disabled = false;
        nextBtn.classList.remove("btn-secondary");
        nextBtn.classList.add("btn-success");
    }
}

// --- Helper function untuk membuat tombol halaman ---
function addPageButton(pageNum, container) {
    const btn = document.createElement("button");
    btn.className = `btn page-btn ${pageNum === currentPage ? 'btn-primary' : 'btn-light'}`;
    btn.textContent = pageNum;
    
    // Tambah style inline untuk memastikan warna
    if (pageNum === currentPage) {
        btn.style.cssText = `
            background-color: #007AFF !important;
            border-color: #007AFF !important;
            color: white !important;
            font-weight: 600;
        `;
    } else {
        btn.style.cssText = `
            background-color: #f8f9fa !important;
            border-color: #dee2e6 !important;
            color: #495057 !important;
        `;
    }
    
    btn.addEventListener("click", () => {
        currentPage = pageNum;
        renderProducts();
        scrollToTable();
    });
    
    container.appendChild(btn);
}

// --- Scroll ke tabel ---
function scrollToTable() {
    const tableWrapper = document.querySelector('.table-wrapper');
    if (tableWrapper) {
        tableWrapper.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }
}

// --- Attach WhatsApp Button Events (DENGAN KATEGORI) ---
function attachWAEvents() {
    document.querySelectorAll(".btn-wa").forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            
            const row = this.closest("tr");
            const nama = row.querySelector(".nama")?.textContent || "-";
            const desc = row.querySelector(".desc")?.textContent || "Tidak ada deskripsi";
            const harga = row.querySelector(".harga")?.textContent || "-";
            const kategori = row.querySelector("td:first-child")?.textContent || "-";

            let pesan = `Halo, saya ingin membeli:\n\n`;
            pesan += `📦 *Kategori:* ${kategori}\n`;
            pesan += `🛒 *Produk:* ${nama}\n`;
            if (desc !== "-" && desc !== "Tidak ada deskripsi") pesan += `📝 *Deskripsi:* ${desc}\n`;
            pesan += `💰 *Harga:* ${harga}\n\n`;
            pesan += `Mohon kirimkan payment ya. Terima kasih!`;

            const encoded = encodeURIComponent(pesan);
            const nomor = "18254875043";
            const waLink = `https://wa.me/${nomor}?text=${encoded}`;
            
            // Cek info khusus - SEKARANG DENGAN PARAMETER KATEGORI
            if (typeof getInfoKhususUntukProduk === 'function') {
                const infoKhusus = getInfoKhususUntukProduk(nama, kategori);
                
                if (infoKhusus) {
                    Swal.fire({
                        title: "📋 INFORMASI PENTING",
                        html: `<div style="text-align: left; white-space: pre-line;">${infoKhusus}</div>`,
                        icon: "info",
                        confirmButtonText: "Saya Mengerti",
                        cancelButtonText: "Batal",
                        showCancelButton: true,
                        confirmButtonColor: "#007AFF",
                        width: Math.min(500, window.innerWidth - 40) + "px"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.open(waLink, "_blank");
                        }
                    });
                    return;
                }
            }
            
            // Tanpa info khusus langsung ke WA
            window.open(waLink, "_blank");
        });
    });
}

// --- Responsive pada resize window ---
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        updatePagination();
    }, 250);
});

// Indikator scroll tabel
const tableScroll = document.querySelector('.table-scroll');
if (tableScroll) {
    tableScroll.addEventListener('scroll', function() {
        if (this.scrollLeft > 10) {
            this.classList.add('scrolling');
        } else {
            this.classList.remove('scrolling');
        }
    });
}

// Pastikan body tidak scroll horizontal
document.body.style.overflowX = 'hidden';
document.documentElement.style.overflowX = 'hidden';
