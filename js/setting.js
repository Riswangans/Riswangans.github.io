// ============================
// SETTING PRODUK KHUSUS - VERSI FLEKSIBEL
// ============================

const settingInfoKhusus = {
    // ==================== BERDASARKAN KATEGORI ====================
    kategori: {
        // Format: "nama_kategori": "pesan_info_khusus"
        
        "APK Premium": "📱 *INFO APK PREMIUM:*\n\n• Akun akan dikirim dalam 1-24 jam\n• Garansi sesuai durasi produk\n• Pastikan email aktif untuk verifikasi\n• Tidak bisa refund setelah akun dikirim",
        
        "Nokos": "📞 *INFO NOMOR KOSONG:*\n\n⚠️ PERINGATAN!\n1. Nomor hanya aktif 24 jam\n2. Tidak bisa untuk verifikasi WhatsApp\n3. Hanya untuk OTP aplikasi biasa\n4. Tidak ada garansi setelah 24 jam",
        
        "Suntik Media Sosial": "📈 *INFO SUNTIK MEDSOS:*\n\n⏱️ PROSES 1-48 JAM\n• Proses dimulai setelah pembayaran\n• Tidak bisa refund setelah proses\n• Garansi drop >70% dalam 30 hari\n• Real human followers/subscribers"
    },
    
    // ==================== BERDASARKAN NAMA PRODUK ====================
    namaProduk: {
        // Format: "keyword_nama": "pesan_info_khusus"
        // Akan dicek apakah nama produk mengandung keyword ini
        
        "INSTAGRAM": "📸 *INFO INSTAGRAM FOLLOWERS:*\n\n⚠️ NONAKTIFKAN LAPORAN UNTUK DITINJAU!\n\nLangkah-langkah:\n1. Buka Instagram → Settings\n2. Pilih Privacy → Followers and following\n3. Matikan 'Hide offensive comments'\n4. Nonaktifkan 'Tandai untuk Ditinjau'",
        
        "AI CHATGPT": "🤖 *INFO AI CHATGPT:*\n\n• Hanya bisa digunakan di browser web\n• Tidak support aplikasi mobile\n• Akun sharing (bisa dipakai 4 user)\n• No garansi untuk banned account",
        
        "ADOBE": "🎨 *INFO ADOBE:*\n\n• Akun dikirim via email manual (1x24 jam)\n• Private akun - 1 user saja\n• Include Write Pro feature\n• Garansi 20 hari",
        
        "YOUTUBE PREMIUM": "📺 *INFO YOUTUBE PREMIUM:*\n\n• Pastikan logout akun Google dari semua device\n• Bisa invite 5 orang (HEAD plan)\n• Garansi 20 hari\n• Work on Android & iOS",
        
        "CANVA PRO": "🎨 *INFO CANVA PRO:*\n\n• Link invite dikirim via email (1-2 jam)\n• Edu lifetime available\n• Garansi sesuai paket\n• Full feature access",
        
        "TIKTOK": "🎵 *INFO TIKTOK FOLLOWERS:*\n\n• Proses slow drip (24-48 jam)\n• Non-drop quality followers\n• Garansi refill 30 hari\n• Real engagement",
        
        "FOLLOWERS": "👥 *INFO FOLLOWERS UMUM:*\n\n⏱️ PROSES 1-24 JAM\n• Mulai setelah pembayaran confirm\n• No refund setelah proses start\n• Garansi drop >70% dalam 30 hari\n• Support semua platform",
        
        "SUBSCRIBERS": "📊 *INFO SUBSCRIBERS:*\n\n⏱️ PROSES 24-48 JAM\n• Slow drip untuk natural growth\n• Real human subscribers\n• Garansi 60 hari\n• High retention rate"
    },
    
    // ==================== BERDASARKAN KEYWORD SPESIFIK ====================
    keywordSpesifik: {
        // Format: ["array_keyword"]: "pesan_info_khusus"
        // Akan dicocokkan jika SEMUA keyword ada di nama produk
        
        '["INSTAGRAM", "1508"]': "💸 *INFO PAKET TERMURAH:*\n\n• Harga paling murah\n• Non Indo followers\n• Garansi refill 30 hari\n• Proses cepat (1-6 jam)",
        
        '["INSTAGRAM", "879"]': "⭐ *INFO PAKET PREMIUM:*\n\n• Non-drop quality\n• Real looking followers\n• Garansi refill 30 hari\n• Proses 6-24 jam",
        
        '["TIKTOK", "1371"]': "🇧🇷 *INFO TIKTOK BRAZIL:*\n\n• Brazil followers\n• Garansi refill 365 HARI\n• High quality\n• Proses 12-48 jam"
    }
};

// ============================
// FUNGSI UTAMA - CHECK SEMUA JENIS SETTING
// ============================

function getInfoKhususUntukProduk(namaProduk, kategoriProduk) {
    if (!namaProduk) return null;
    
    const namaUpper = namaProduk.toUpperCase();
    const kategoriUpper = kategoriProduk ? kategoriProduk.toUpperCase() : "";
    
    // ===== 1. CEK BERDASARKAN KATEGORI =====
    if (kategoriProduk && settingInfoKhusus.kategori[kategoriProduk]) {
        return settingInfoKhusus.kategori[kategoriProduk];
    }
    
    // ===== 2. CEK BERDASARKAN KEYWORD SPESIFIK (ARRAY) =====
    for (const [keywords, message] of Object.entries(settingInfoKhusus.keywordSpesifik)) {
        try {
            const keywordArray = JSON.parse(keywords);
            const semuaCocok = keywordArray.every(keyword => 
                namaUpper.includes(keyword.toUpperCase())
            );
            
            if (semuaCocok) {
                return message;
            }
        } catch (e) {
            // Skip jika format tidak valid
        }
    }
    
    // ===== 3. CEK BERDASARKAN NAMA PRODUK =====
    for (const [keyword, message] of Object.entries(settingInfoKhusus.namaProduk)) {
        if (namaUpper.includes(keyword.toUpperCase())) {
            return message;
        }
    }
    
    // ===== 4. CEK FALLBACK BERDASARKAN KATEGORI SAJA =====
    if (kategoriProduk) {
        // Cek partial match untuk kategori
        for (const [kategoriKey, message] of Object.entries(settingInfoKhusus.kategori)) {
            if (kategoriUpper.includes(kategoriKey.toUpperCase())) {
                return message;
            }
        }
    }
    
    return null; // Tidak ada info khusus
}

// --- DATA SEMUA PRODUK ---
const allProducts = [
    // ==================== APK PREMIUM ====================
    {
        kategori: "APK Premium",
        nama: "AI CHATGPT HEAD 1 BULAN",
        desc: "Durasi 25-30 hari | Invite 4 orang | No Garansi",
        harga: "Rp 12.000"
    },
    {
        kategori: "APK Premium",
        nama: "ADOBE PRIVATE 4 BULAN",
        desc: "Durasi 25-30 hari | Private akun | Inc Write Pro",
        harga: "Rp 27.000"
    },
    {
        kategori: "APK Premium",
        nama: "AI GEMINI 1 BULAN",
        desc: "Durasi 25-30 hari | Garansi 20 hari",
        harga: "Rp 14.000"
    },
    {
        kategori: "APK Premium",
        nama: "AI GEMINI 12 BULAN",
        desc: "Plan INDPLAN | Tanpa Garansi",
        harga: "Rp 14.000"
    },
    {
        kategori: "APK Premium",
        nama: "GEMINI + VEO3 + GDRIVE 2TB 12B",
        desc: "Plan INDPLAN | Tanpa Garansi",
        harga: "Rp 21.000"
    },
    {
        kategori: "APK Premium",
        nama: "AI PERPLEXITY 1 BULAN",
        desc: "Durasi 25-30 hari | Garansi 20 hari",
        harga: "Rp 12.000"
    },
    {
        kategori: "APK Premium",
        nama: "WINK & MEITU PRIV 7 HARI (Android)",
        desc: "Gar login only",
        harga: "Rp 3.500"
    },
    {
        kategori: "APK Premium",
        nama: "ALIGHT MOTION 1 TAHUN",
        desc: "Android & iOS | Garansi 3 Bulan",
        harga: "Rp 3.500"
    },
    {
        kategori: "APK Premium",
        nama: "APPLE MUSIC INDPLAN 1 BULAN",
        desc: "Android only | Garansi 20 hari",
        harga: "Rp 6.500"
    },
    {
        kategori: "APK Premium",
        nama: "APPLE MUSIC HEAD 1 BULAN",
        desc: "Android only | Garansi 20 hari",
        harga: "Rp 6.500"
    },
    {
        kategori: "APK Premium",
        nama: "BSTATION SHARING 1 BULAN",
        desc: "Garansi 20 hari",
        harga: "Rp 4.500"
    },
    {
        kategori: "APK Premium",
        nama: "BSTATION PRIVATE 1 BULAN",
        desc: "Garansi 20 hari",
        harga: "Rp 26.000"
    },
    {
        kategori: "APK Premium",
        nama: "CAPCUT 7 HARI - 5 AKUN",
        desc: "Garansi Backfree 5 Hari | Plan Member Pro",
        harga: "Rp 6.000"
    },
    {
        kategori: "APK Premium",
        nama: "CAPCUT 7 HARI - 10 AKUN",
        desc: "Garansi Backfree 5 Hari | Plan Member Pro",
        harga: "Rp 9.900"
    },
    {
        kategori: "APK Premium",
        nama: "CAPCUT 14 HARI - 5 AKUN",
        desc: "Garansi Backfree 5 Hari | Plan Member Pro",
        harga: "Rp 11.800"
    },
    {
        kategori: "APK Premium",
        nama: "CAPCUT 14 HARI - 10 AKUN",
        desc: "Garansi Backfree 5 Hari | Plan Member Pro",
        harga: "Rp 21.000"
    },
    {
        kategori: "APK Premium",
        nama: "CAPCUT 21 HARI - 5 AKUN",
        desc: "Garansi Backfree 5 Hari | Plan Member Pro",
        harga: "Rp 14.500"
    },
    {
        kategori: "APK Premium",
        nama: "CAPCUT 21 HARI - 10 AKUN",
        desc: "Garansi Backfree 5 Hari | Plan Member Pro",
        harga: "Rp 22.000"
    },
    {
        kategori: "APK Premium",
        nama: "CAPCUT 28 HARI - 5 AKUN",
        desc: "Garansi Backfree 5 Hari | Plan Member Pro",
        harga: "Rp 19.000"
    },
    {
        kategori: "APK Premium",
        nama: "CAPCUT 28 HARI - 10 AKUN",
        desc: "Garansi Backfree 5 Hari | Plan Member Pro",
        harga: "Rp 22.000"
    },
    {
        kategori: "APK Premium",
        nama: "CAPCUT 30 HARI - 5 AKUN",
        desc: "Garansi Backfree 5 Hari | Plan Member Pro",
        harga: "Rp 27.000"
    },
    {
        kategori: "APK Premium",
        nama: "CAPCUT 6 BULAN - 1 AKUN",
        desc: "Garansi Backfree 5 Hari | Plan Member Pro",
        harga: "Rp 117.000"
    },
    {
        kategori: "APK Premium",
        nama: "CAPCUT 5 BULAN - 1 AKUN",
        desc: "Tanpa Garansi",
        harga: "Rp 107.000"
    },
    {
        kategori: "APK Premium",
        nama: "CAPCUT KOSONGAN",
        desc: "No Garansi",
        harga: "Rp 2.350"
    },
    {
        kategori: "APK Premium",
        nama: "PAY CC HEAD",
        desc: "Garansi Backfree 5 Hari | Plan Member Pro",
        harga: "Rp 203.036"
    },
    {
        kategori: "APK Premium",
        nama: "CAPCUT 7 HARI - 1 AKUN",
        desc: "Garansi Backfree 5 Hari | Plan Member Pro",
        harga: "Rp 3.000"
    },
    {
        kategori: "APK Premium",
        nama: "CAPCUT 11 HARI - 1 AKUN",
        desc: "Garansi Backfree 5 Hari | Plan Member Pro",
        harga: "Rp 4.000"
    },
    {
        kategori: "APK Premium",
        nama: "CAPCUT 28 HARI - 1 AKUN",
        desc: "Garansi Backfree 5 Hari | Plan Member Pro",
        harga: "Rp 7.500"
    },
    {
        kategori: "APK Premium",
        nama: "CAPCUT 24 HARI - 1 AKUN",
        desc: "Garansi Backfree 5 Hari | Plan Member Pro",
        harga: "Rp 7.000"
    },
    {
        kategori: "APK Premium",
        nama: "CAPCUT 32 HARI - 1 AKUN",
        desc: "Garansi Backfree 5 Hari | Plan Member Pro",
        harga: "Rp 7.000"
    },
    {
        kategori: "APK Premium",
        nama: "CAPCUT 35 HARI - 1 AKUN",
        desc: "Garansi Backfree 5 Hari | Plan Member Pro",
        harga: "Rp 9.000"
    },
    {
        kategori: "APK Premium",
        nama: "CAPCUT 40 HARI - 1 AKUN",
        desc: "Garansi Backfree 5 Hari | Plan Member Pro",
        harga: "Rp 9.500"
    },
    {
        kategori: "APK Premium",
        nama: "CANVA PRO HEAD 1 BULAN",
        desc: "Garansi Backfree 25 Hari",
        harga: "Rp 5.100"
    },
    {
        kategori: "APK Premium",
        nama: "CANVA PRO HEAD EDULIFETIME FULLGAR",
        desc: "Durasi Seumur Hidup | Garansi 1 Bulan",
        harga: "Rp 152.000"
    },
    {
        kategori: "APK Premium",
        nama: "CANVA PRO HEAD EDULIFETIME NOGAR",
        desc: "Durasi Seumur Hidup | Tanpa Garansi",
        harga: "Rp 32.000"
    },
    {
        kategori: "APK Premium",
        nama: "CANVA PRO MEMBER 1 BULAN",
        desc: "Via Link | Garansi 20 Hari",
        harga: "Rp 1.400"
    },
    {
        kategori: "APK Premium",
        nama: "CANVA PRO MEMBER EDULIFETIME",
        desc: "Via Email Manual | Garansi 2 Bulan",
        harga: "Rp 5.000"
    },
    {
        kategori: "APK Premium",
        nama: "DISNEY+ HOTSTAR SHAR 1 BULAN",
        desc: "25-30 Hari | Relogin 1x | Garansi 20 Hari | Login Manual",
        harga: "Rp 11.000"
    },
    {
        kategori: "APK Premium",
        nama: "DISNEY+ HOTSTAR PRIVATE 1 BULAN",
        desc: "Login 10 Device | Sistem Mudah | Garansi 20 Hari",
        harga: "Rp 52.000"
    },
    {
        kategori: "APK Premium",
        nama: "GOGGLE DRIVE 2TB 12B",
        desc: "Tanpa Garansi",
        harga: "Rp 19.000"
    },
    {
        kategori: "APK Premium",
        nama: "GSUITEXGOPAY ACAK - 1 AKUN",
        desc: "Trial Playstore | Aktif 1 Hari Fresh",
        harga: "Rp 3.000"
    },
    {
        kategori: "APK Premium",
        nama: "GSUITEXGOPAY URUT - 5 AKUN",
        desc: "Trial Playstore | Aktif 1 Hari Fresh",
        harga: "Rp 6.800"
    },
    {
        kategori: "APK Premium",
        nama: "GSUITEXPSC ACAK - 1 AKUN",
        desc: "Trial Playstore | Aktif 1 Hari Fresh",
        harga: "Rp 3.000"
    },
    {
        kategori: "APK Premium",
        nama: "GSUITEXPSC URUT - 5 AKUN",
        desc: "Trial Playstore | Aktif 1 Hari Fresh",
        harga: "Rp 6.800"
    },
    {
        kategori: "APK Premium",
        nama: "GSUITEXPSC URUT - 10 AKUN",
        desc: "Trial Playstore | Aktif 1 Hari Fresh",
        harga: "Rp 10.900"
    },
    {
        kategori: "APK Premium",
        nama: "LINK REDEEM SPOTIFY STUDENT",
        desc: "Tanpa Garansi | Mengerti Penggunaan",
        harga: "Rp 1.450"
    },
    {
        kategori: "APK Premium",
        nama: "LINK REDEEM PERPLEXITY 1 BULAN",
        desc: "Garansi Redeem | Mengerti Penggunaan",
        harga: "Rp 3.900"
    },
    {
        kategori: "APK Premium",
        nama: "PICSART PRIVATE 1 BULAN",
        desc: "Login 10 User | Garansi 20 Hari",
        harga: "Rp 6.000"
    },
    {
        kategori: "APK Premium",
        nama: "PICSART SHARING 1 BULAN",
        desc: "Garansi 20 Hari",
        harga: "Rp 3.000"
    },
    {
        kategori: "APK Premium",
        nama: "VIDIO PLATINUM MOBILE PRIVATE 1 BULAN",
        desc: "Garansi Backfree 20 Hari",
        harga: "Rp 21.500"
    },
    {
        kategori: "APK Premium",
        nama: "PRIME VIDIO PRIVATE GARBF 1 BULAN",
        desc: "3 User | Garansi 20 Hari",
        harga: "Rp 10.000"
    },
    {
        kategori: "APK Premium",
        nama: "SCRIBD PRIVATE 1 BULAN",
        desc: "Garansi 15 Hari",
        harga: "Rp 5.500"
    },
    {
        kategori: "APK Premium",
        nama: "SCRIBD PRIVATE 2 BULAN",
        desc: "Garansi 30 Hari",
        harga: "Rp 6.500"
    },
    {
        kategori: "APK Premium",
        nama: "SCRIBD PRIVATE 3 BULAN",
        desc: "Garansi 40 Hari",
        harga: "Rp 8.500"
    },
    {
        kategori: "APK Premium",
        nama: "SPOTIFY STUDENT 2 BULAN",
        desc: "Auto Renew | No Garansi",
        harga: "Rp 7.000"
    },
    {
        kategori: "APK Premium",
        nama: "STRAVA PRIVATE 1 BULAN",
        desc: "Garansi 15 Hari",
        harga: "Rp 7.000"
    },
    {
        kategori: "APK Premium",
        nama: "VIDIO ONLY TV 12 BULAN",
        desc: "Untuk Nonton TIMNAS | Garansi 50 Hari",
        harga: "Rp 2.500"
    },
    {
        kategori: "APK Premium",
        nama: "WINK PRIVATE 7 HARI (Android)",
        desc: "2 Device | Garansi 2 Hari",
        harga: "Rp 4.500"
    },
    {
        kategori: "APK Premium",
        nama: "MEITU PRIVATE 7 HARI (Android)",
        desc: "2 Device | Garansi 2 Hari",
        harga: "Rp 5.000"
    },
    {
        kategori: "APK Premium",
        nama: "VIU PRIVATE 1 BULAN",
        desc: "Durasi 25-50 Hari | Garansi 30 Hari",
        harga: "Rp 2.800"
    },
    {
        kategori: "APK Premium",
        nama: "VIU PRIVATE 2 BULAN",
        desc: "Durasi 60-70 Hari | Garansi 30 Hari",
        harga: "Rp 3.000"
    },
    {
        kategori: "APK Premium",
        nama: "VIU PRIVATE 3 BULAN",
        desc: "Durasi 80-100 Hari | Garansi 30 Hari",
        harga: "Rp 3.500"
    },
    {
        kategori: "APK Premium",
        nama: "VIU PRIVATE 6 BULAN",
        desc: "Durasi 170-200 Hari | Garansi 30 Hari",
        harga: "Rp 3.800"
    },
    {
        kategori: "APK Premium",
        nama: "VIU PRIVATE 12 BULAN",
        desc: "Durasi 350-365 Hari | Garansi 60 Hari",
        harga: "Rp 4.000"
    },
    {
        kategori: "APK Premium",
        nama: "VIU PRIVATE UNLIMITED",
        desc: "Garansi 60 Hari",
        harga: "Rp 4.500"
    },
    {
        kategori: "APK Premium",
        nama: "VPN EXPRESS PRIVATE 1 BULAN",
        desc: "Garansi 20 Hari | Paham cara login",
        harga: "Rp 6.500"
    },
    {
        kategori: "APK Premium",
        nama: "VPN HMA PRIVATE 1 BULAN",
        desc: "Garansi 20 Hari | Paham cara login",
        harga: "Rp 3.500"
    },
    {
        kategori: "APK Premium",
        nama: "YOUTUBE PREMIUM HEAD 1 BULAN",
        desc: "Bisa Invite 5 Orang | Garansi 20 Hari",
        harga: "Rp 6.500"
    },
    {
        kategori: "APK Premium",
        nama: "YOUTUBE PREMIUM INDPLAN 1 BULAN",
        desc: "Garansi 20 Hari",
        harga: "Rp 6.500"
    },
    {
        kategori: "APK Premium",
        nama: "ZOOM PRIVATE 14 HARI",
        desc: "Durasi 10-14 Hari | 100 Peserta | Garansi 5 Hari",
        harga: "Rp 4.700"
    },
    {
        kategori: "APK Premium",
        nama: "ZOOM PRIVATE 7 HARI",
        desc: "Durasi 5-7 Hari | 100 Peserta | Garansi 5 Hari",
        harga: "Rp 4.000"
    },
    {
        kategori: "APK Premium",
        nama: "IQIYI STANDARD SHARING 1 BULAN",
        desc: "Sharing Akun | Plan STD",
        harga: "Rp 4.500"
    },

    // ==================== NOKOS ====================
    {
        kategori: "Nokos",
        nama: "Nokos Premium",
        desc: "Nomor virtual premium untuk verifikasi berbagai aplikasi",
        harga: "Rp 25.000"
    },
    {
        kategori: "Nokos",
        nama: "Nokos Bulk (10 Nomor)",
        desc: "Paket 10 nomor virtual dengan harga spesial",
        harga: "Rp 70.000"
    },

    // ==================== SUNTIK MEDSOS ====================
    {
        kategori: "Suntik Media Sosial",
        nama: "INSTAGRAM (1508) - 100 FOLLOWERS",
        desc: "Termurah | Non Indo | Garansi Refill 30 Hari",
        harga: "Rp 5.000"
    },
    {
        kategori: "Suntik Media Sosial",
        nama: "INSTAGRAM (1508) - 500 FOLLOWERS",
        desc: "Termurah | Non Indo | Garansi Refill 30 Hari",
        harga: "Rp 20.000"
    },
    {
        kategori: "Suntik Media Sosial",
        nama: "INSTAGRAM (1508) - 1.000 FOLLOWERS",
        desc: "Termurah | Non Indo | Garansi Refill 30 Hari",
        harga: "Rp 40.000"
    },
    {
        kategori: "Suntik Media Sosial",
        nama: "INSTAGRAM (879) - 100 FOLLOWERS",
        desc: "Non Drop | Non Indo | Garansi Refill 30 Hari",
        harga: "Rp 13.000"
    },
    {
        kategori: "Suntik Media Sosial",
        nama: "INSTAGRAM (879) - 500 FOLLOWERS",
        desc: "Non Drop | Non Indo | Garansi Refill 30 Hari",
        harga: "Rp 60.000"
    },
    {
        kategori: "Suntik Media Sosial",
        nama: "INSTAGRAM (879) - 1.000 FOLLOWERS",
        desc: "Non Drop | Non Indo | Garansi Refill 30 Hari",
        harga: "Rp 117.000"
    },
    {
        kategori: "Suntik Media Sosial",
        nama: "INSTAGRAM (1415) - 100 FOLLOWERS",
        desc: "Low Drop | Indo | Tanpa Garansi",
        harga: "Rp 7.000"
    },
    {
        kategori: "Suntik Media Sosial",
        nama: "INSTAGRAM (1415) - 500 FOLLOWERS",
        desc: "Low Drop | Indo | Tanpa Garansi",
        harga: "Rp 25.000"
    },
    {
        kategori: "Suntik Media Sosial",
        nama: "INSTAGRAM (1415) - 1.000 FOLLOWERS",
        desc: "Low Drop | Indo | Tanpa Garansi",
        harga: "Rp 50.000"
    },
    {
        kategori: "Suntik Media Sosial",
        nama: "INSTAGRAM (1416) - 100 FOLLOWERS",
        desc: "Low Drop | Indo | Garansi Refill 15 Hari",
        harga: "Rp 7.000"
    },
    {
        kategori: "Suntik Media Sosial",
        nama: "INSTAGRAM (1416) - 500 FOLLOWERS",
        desc: "Low Drop | Indo | Garansi Refill 15 Hari",
        harga: "Rp 30.000"
    },
    {
        kategori: "Suntik Media Sosial",
        nama: "INSTAGRAM (1416) - 1.000 FOLLOWERS",
        desc: "Low Drop | Indo | Garansi Refill 15 Hari",
        harga: "Rp 58.000"
    },
    {
        kategori: "Suntik Media Sosial",
        nama: "TIKTOK (1452) - 100 FOLLOWERS",
        desc: "Ultra | Non Indo | Garansi Refill 30 Hari",
        harga: "Rp 6.000"
    },
    {
        kategori: "Suntik Media Sosial",
        nama: "TIKTOK (1452) - 500 FOLLOWERS",
        desc: "Ultra | Non Indo | Garansi Refill 30 Hari",
        harga: "Rp 22.000"
    },
    {
        kategori: "Suntik Media Sosial",
        nama: "TIKTOK (1452) - 1.000 FOLLOWERS",
        desc: "Ultra | Non Indo | Garansi Refill 30 Hari",
        harga: "Rp 44.000"
    },
    {
        kategori: "Suntik Media Sosial",
        nama: "TIKTOK (1371) - 100 FOLLOWERS",
        desc: "Brazil | Non Indo | Garansi Refill 365 Hari",
        harga: "Rp 5.000"
    },
    {
        kategori: "Suntik Media Sosial",
        nama: "TIKTOK (1371) - 500 FOLLOWERS",
        desc: "Brazil | Non Indo | Garansi Refill 365 Hari",
        harga: "Rp 16.000"
    },
    {
        kategori: "Suntik Media Sosial",
        nama: "TIKTOK (1371) - 1.000 FOLLOWERS",
        desc: "Brazil | Non Indo | Garansi Refill 365 Hari",
        harga: "Rp 33.000"
    },
    {
        kategori: "Suntik Media Sosial",
        nama: "TIKTOK (1517) - 100 FOLLOWERS",
        desc: "High Quality | Indo | Tanpa Garansi",
        harga: "Rp 8.000"
    },
    {
        kategori: "Suntik Media Sosial",
        nama: "TIKTOK (1517) - 500 FOLLOWERS",
        desc: "High Quality | Indo | Tanpa Garansi",
        harga: "Rp 33.000"
    },
    {
        kategori: "Suntik Media Sosial",
        nama: "TIKTOK (1517) - 1.000 FOLLOWERS",
        desc: "High Quality | Indo | Tanpa Garansi",
        harga: "Rp 67.000"
    },
    {
        kategori: "Suntik Media Sosial",
        nama: "TIKTOK (682) - 100 FOLLOWERS",
        desc: "Non Drop | Indo | Garansi Refill 30 Hari",
        harga: "Rp 11.000"
    },
    {
        kategori: "Suntik Media Sosial",
        nama: "TIKTOK (682) - 500 FOLLOWERS",
        desc: "Non Drop | Indo | Garansi Refill 30 Hari",
        harga: "Rp 47.000"
    },
    {
        kategori: "Suntik Media Sosial",
        nama: "TIKTOK (682) - 1.000 FOLLOWERS",
        desc: "Non Drop | Indo | Garansi Refill 30 Hari",
        harga: "Rp 95.000"
    },
    {
        kategori: "Suntik Media Sosial",
        nama: "YOUTUBE (166) - 100 SUBSCRIBERS",
        desc: "High Quality | Garansi Refill 30 Hari",
        harga: "Rp 34.000"
    },
    {
        kategori: "Suntik Media Sosial",
        nama: "YOUTUBE (166) - 500 SUBSCRIBERS",
        desc: "High Quality | Garansi Refill 30 Hari",
        harga: "Rp 162.000"
    },
    {
        kategori: "Suntik Media Sosial",
        nama: "YOUTUBE (166) - 1.000 SUBSCRIBERS",
        desc: "High Quality | Garansi Refill 30 Hari",
        harga: "Rp 324.000"
    },
    {
        kategori: "Suntik Media Sosial",
        nama: "YOUTUBE (532) - 100 SUBSCRIBERS",
        desc: "Non Drop | Garansi Refill 365 Hari",
        harga: "Rp 57.000"
    },
    {
        kategori: "Suntik Media Sosial",
        nama: "YOUTUBE (532) - 500 SUBSCRIBERS",
        desc: "Non Drop | Garansi Refill 365 Hari",
        harga: "Rp 279.000"
    },
    {
        kategori: "Suntik Media Sosial",
        nama: "YOUTUBE (532) - 1.000 SUBSCRIBERS",
        desc: "Non Drop | Garansi Refill 365 Hari",
        harga: "Rp 559.000"
    }
];
