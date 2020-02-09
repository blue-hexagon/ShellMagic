//Code Highlighting
document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('pre code').forEach((block) => {
        let hljs;
        hljs.highlightBlock(block);
        hljs.initHighlightingOnLoad();
    });
});

// Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag() {
    dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'UA-157938008-1');
