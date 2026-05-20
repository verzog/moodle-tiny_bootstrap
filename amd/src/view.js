// Stop videos when a Bootstrap modal that was inserted by tiny_bootstrap is
// dismissed. Without this, YouTube/Vimeo iframes and HTML5 <video> elements
// keep playing audio in the hidden modal.

const stopVideosIn = (root) => {
    root.querySelectorAll('video').forEach((v) => {
        try {
            v.pause();
            v.currentTime = 0;
        } catch (e) {
            // Ignore — element may be in a partial state.
        }
    });
    root.querySelectorAll('iframe').forEach((iframe) => {
        const src = iframe.getAttribute('src');
        if (!src) {
            return;
        }
        // Reassigning the same src reloads the iframe, which stops playback
        // for YouTube, Vimeo and other embeds without needing their JS APIs.
        iframe.setAttribute('src', src);
    });
};

const onHidden = (event) => {
    const modal = event.target;
    if (!modal || !modal.classList || !modal.classList.contains('modal')) {
        return;
    }
    stopVideosIn(modal);
};

export const init = () => {
    if (window.tinyBootstrapViewInit) {
        return;
    }
    window.tinyBootstrapViewInit = true;
    document.addEventListener('hidden.bs.modal', onHidden, true);
};
