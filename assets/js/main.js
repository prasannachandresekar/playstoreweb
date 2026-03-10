const toggle = document.getElementById("themeToggle");

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}

if (toggle) {
    toggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        // Save theme preference
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
}
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// APP PREVIEW MODAL LOGIC
document.addEventListener("DOMContentLoaded", () => {
    const appPreviewModal = document.getElementById('appPreviewModal');
    if (!appPreviewModal) return;

    const modalAppImg = document.getElementById('modalAppImg');
    const modalAppName = document.getElementById('modalAppName');
    const modalAppDesc = document.getElementById('modalAppDesc');
    const playStoreBtn = document.getElementById('playStoreBtn');
    const appStoreBtn = document.getElementById('appStoreBtn');
    const downloadToast = document.getElementById('downloadToast');

    // Populate and show modal when any ".app-preview-btn" is clicked (using event delegation)
    document.addEventListener('click', (e) => {
        const button = e.target.closest('.app-preview-btn');
        if (!button) return;

        const appData = button.dataset;

        // Set modal content
        if (modalAppImg) modalAppImg.src = appData.img || '';
        if (modalAppName) modalAppName.textContent = appData.app || 'App Name';
        if (modalAppDesc) modalAppDesc.textContent = appData.desc || '';
        if (playStoreBtn) playStoreBtn.href = appData.play || '#';
        if (appStoreBtn) appStoreBtn.href = appData.ios || '#';

        // Show Bootstrap Modal
        const modal = new bootstrap.Modal(appPreviewModal);
        modal.show();
    });

    // Handle download button clicks with toast feedback
    const handleDownload = (e) => {
        const btn = e.currentTarget;
        const url = btn.href;

        if (url === '#' || url === '' || url.includes('javascript:void(0)')) {
            e.preventDefault();
            return;
        }

        e.preventDefault();

        // Show toast
        if (downloadToast) {
            const toast = new bootstrap.Toast(downloadToast);
            toast.show();
        }

        // Redirect after 1 second
        setTimeout(() => {
            window.location.href = url;
        }, 1000);
    };

    if (playStoreBtn) playStoreBtn.addEventListener('click', handleDownload);
    if (appStoreBtn) appStoreBtn.addEventListener('click', handleDownload);
});
