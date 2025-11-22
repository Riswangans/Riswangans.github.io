const btnLihat = document.getElementById('btn-lihat');
    const btnTutup = document.getElementById('btn-tutup');
    const testimoniLengkap = document.getElementById('testimoni-lengkap');

    btnLihat.addEventListener('click', () => {
        testimoniLengkap.style.display = 'flex';
        btnLihat.style.display = 'none';
        btnTutup.style.display = 'inline-block';
    });

    btnTutup.addEventListener('click', () => {
        testimoniLengkap.style.display = 'none';
        btnLihat.style.display = 'inline-block';
        btnTutup.style.display = 'none';
        window.scrollTo({ top: document.getElementById('testimoni-awal').offsetTop - 120, behavior: 'smooth' });
    });
