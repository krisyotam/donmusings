document.addEventListener('DOMContentLoaded', function () {
    // Load the JSON file containing the page links
    fetch('page_links.json')
        .then(response => response.json())
        .then(data => {
            // Get the current date from the page (it should match one of the dates in the JSON)
            const currentDate = document.querySelector('.date').textContent.trim();
            const pages = data.page_link;
            
            let currentPageIndex = pages.findIndex(page => page.date === currentDate);
            let previousPageLink = '';
            let nextPageLink = '';

            // If current page is not the first, set the previous page link
            if (currentPageIndex > 0) {
                previousPageLink = pages[currentPageIndex - 1].link;
            }

            // If current page is not the last, set the next page link
            if (currentPageIndex < pages.length - 1) {
                nextPageLink = pages[currentPageIndex + 1].link;
            }

            // Insert the links into the pagination buttons
            const previousButton = document.querySelector('.pagination .previous');
            const nextButton = document.querySelector('.pagination .next');

            if (previousPageLink) {
                previousButton.setAttribute('href', previousPageLink);
                previousButton.style.pointerEvents = 'auto';
            } else {
                previousButton.removeAttribute('href');
                previousButton.style.pointerEvents = 'none';
            }

            if (nextPageLink) {
                nextButton.setAttribute('href', nextPageLink);
                nextButton.style.pointerEvents = 'auto';
            } else {
                nextButton.removeAttribute('href');
                nextButton.style.pointerEvents = 'none';
            }
        })
        .catch(error => console.error('Error loading page links:', error));
});
