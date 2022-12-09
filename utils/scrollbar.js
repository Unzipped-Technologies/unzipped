/** Helper function to set up a MutationObserver to watch the simplebar-scrollbar element.
 * When the element has the class simplebar-visible added, change the background-color
 * of the parentNode. */
const observeScrollbars = () => {
    const scrollbars = document.getElementsByClassName('simplebar-scrollbar');

    setTimeout(() => {
        const observer = new MutationObserver(callback);
        [].forEach.call(scrollbars, scrollbar => {
            observer.observe(scrollbar, config);
        });
    }, 50);

    const config = {attributes: true};

    const callback = mutationsList => {
        for (const mutation of mutationsList) {
            if (mutation.attributeName === 'class') {
                if (mutation.target.classList.contains('simplebar-visible')) {
                    mutation.target.parentNode.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                } else {
                    mutation.target.parentNode.style.backgroundColor = 'rgba(255, 255, 255, 0)';
                }
            }
        }
    };
};

export default observeScrollbars;
