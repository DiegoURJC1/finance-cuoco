/**
 * Manages the top bar menu redirection confirmation using native markup nodes.
 */
function initTopMenuOverlayWarning() {
    let pendingUrl = "";

    document.addEventListener('click', (e) => {
        const gddLink = e.target.closest('#gdd-nav-link');

        if (gddLink) {
            e.preventDefault();
            pendingUrl = gddLink.getAttribute('href');

            const dialog = document.getElementById('gdd-warning-dialog');
            if (dialog) dialog.showModal();
            return;
        }

        if (e.target.id === 'dialog-cancel-btn') {
            const dialog = document.getElementById('gdd-warning-dialog');
            if (dialog) dialog.close();
            pendingUrl = "";
        }

        if (e.target.id === 'dialog-confirm-btn') {
            const dialog = document.getElementById('gdd-warning-dialog');
            if (dialog) dialog.close();
            if (pendingUrl) window.location.href = pendingUrl;
        }

        if (e.target.id === 'gdd-warning-dialog') {
            const rect = e.target.getBoundingClientRect();
            const isInDialog = (
                e.clientX >= rect.left && e.clientX <= rect.right &&
                e.clientY >= rect.top && e.clientY <= rect.bottom
            );
            if (!isInDialog) {
                document.getElementById('dialog-cancel-btn').click();
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", initTopMenuOverlayWarning);