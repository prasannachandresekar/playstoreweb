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

if (backToTop) {

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
            left: 0,
            behavior: "smooth"
        });
    });

}
// APP PREVIEW MODAL LOGIC
document.addEventListener("DOMContentLoaded", () => {
    const appPreviewModal = document.getElementById('appPreviewModal');
    const appPreviewModalDetailed = document.getElementById('appPreviewModalDetailed');
    const downloadToast = document.getElementById('downloadToast');

    // Basic Modal Elements
    const modalAppImg = document.getElementById('modalAppImg');
    const modalAppName = document.getElementById('modalAppName');
    const modalAppDesc = document.getElementById('modalAppDesc');
    const playStoreBtn = document.getElementById('playStoreBtn');
    const appStoreBtn = document.getElementById('appStoreBtn');

    // Detailed Modal Elements
    const modalDetailedImg = document.getElementById('modalDetailedImg');
    const modalDetailedName = document.getElementById('modalDetailedName');
    const modalDetailedRating = document.getElementById('modalDetailedRating');
    const modalDetailedCategory = document.getElementById('modalDetailedCategory');
    const modalDetailedDownloads = document.getElementById('modalDetailedDownloads');
    const modalDetailedDesc = document.getElementById('modalDetailedDesc');
    const detailedPlayBtn = document.getElementById('detailedPlayBtn');
    const detailedAppStoreBtn = document.getElementById('detailedAppStoreBtn');

    // Populate and show modal when any ".app-preview-btn" is clicked (using event delegation)
    document.addEventListener('click', (e) => {
        const button = e.target.closest('.app-preview-btn');
        if (!button) return;

        const appData = button.dataset;
        const currentPath = window.location.pathname;
        const isIndexPage = currentPath.endsWith('index.html') || currentPath.endsWith('/') || currentPath === '';

        if (isIndexPage && appPreviewModalDetailed) {
            // Populate detailed modal
            if (modalDetailedImg) modalDetailedImg.src = appData.img || '';
            if (modalDetailedName) modalDetailedName.textContent = appData.app || 'App Name';
            if (modalDetailedRating) modalDetailedRating.textContent = appData.rating || '4.5';
            if (modalDetailedCategory) modalDetailedCategory.textContent = appData.category || 'App';
            if (modalDetailedDownloads) modalDetailedDownloads.textContent = appData.downloads || '1M+';
            if (modalDetailedDesc) modalDetailedDesc.textContent = appData.desc || '';
            if (detailedPlayBtn) detailedPlayBtn.href = appData.play || '#';
            if (detailedAppStoreBtn) detailedAppStoreBtn.href = appData.ios || '#';

            const modal = new bootstrap.Modal(appPreviewModalDetailed);
            modal.show();
        } else if (appPreviewModal) {
            // Populate basic modal
            if (modalAppImg) modalAppImg.src = appData.img || '';
            if (modalAppName) modalAppName.textContent = appData.app || 'App Name';
            if (modalAppDesc) modalAppDesc.textContent = appData.desc || '';
            if (playStoreBtn) playStoreBtn.href = appData.play || '#';
            if (appStoreBtn) appStoreBtn.href = appData.ios || '#';

            const modal = new bootstrap.Modal(appPreviewModal);
            modal.show();
        }
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
    if (detailedPlayBtn) detailedPlayBtn.addEventListener('click', handleDownload);
    if (detailedAppStoreBtn) detailedAppStoreBtn.addEventListener('click', handleDownload);

    // Hide toast when modal closes
    const hideToast = () => {
        if (downloadToast) {
            const toastInstance = bootstrap.Toast.getInstance(downloadToast);
            if (toastInstance) {
                toastInstance.hide();
            }
        }
    };

    if (appPreviewModal) appPreviewModal.addEventListener('hidden.bs.modal', hideToast);
    if (appPreviewModalDetailed) appPreviewModalDetailed.addEventListener('hidden.bs.modal', hideToast);
});
