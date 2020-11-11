document.addEventListener("DOMContentLoaded", function() {
    const headerHeight = document.querySelector('.header-wrapper').offsetHeight;

    // add margin-top depending on the header height
    const app = document.querySelector('.app');
    const header = document.querySelector('.header-wrapper');
    if (header.classList.contains('fixed')) {
        app.style.marginTop = headerHeight / 10 + 'rem';
    }

    // smooth scroll to id
    function anchorLinkHandler(e) {
        const distanceToTop = el => Math.floor(el.getBoundingClientRect().top - headerHeight);

        e.preventDefault();
        const targetID = this.getAttribute("href");
        const targetAnchor = document.querySelector(targetID);
        if (!targetAnchor) return;
        const originalTop = distanceToTop(targetAnchor);

        window.scrollBy({ top: originalTop, left: 0, behavior: "smooth" });

        const checkIfDone = setInterval(function() {
            const atBottom = window.innerHeight + window.pageYOffset  >= document.body.offsetHeight - 2;
            if (distanceToTop(targetAnchor) === 0 || atBottom) {
                targetAnchor.tabIndex = "-1";
                targetAnchor.focus();
                window.history.pushState("", "", targetID);
                clearInterval(checkIfDone);
            }
        }, 100);
    }

    const linksToAnchors = document.querySelectorAll('a[href^="#"]');
    linksToAnchors.forEach(each => (each.onclick = anchorLinkHandler));

});