let currentQuotePage = 0;
const quotesContainer = document.getElementById('my-quotes');
const prevQuotesBtn = document.getElementById('prev-quotes');
const nextQuotesBtn = document.getElementById('next-quotes');
let myQuotes = [];

fetch('/pages/json/my_quotes.json')
    .then(response => response.json())
    .then(data => {
        myQuotes = data;
        updatePagination();
    })
    .catch(err => console.log('Error loading my_quotes.json:', err));

function updatePagination() {
    const quoteStart = currentQuotePage * itemsPerPage;
    const quoteEnd = quoteStart + itemsPerPage;

    // Update My Quotes display
    quotesContainer.innerHTML = '';
    for (let i = quoteStart; i < quoteEnd && i < myQuotes.length; i++) {
        const quote = myQuotes[i];
        const quoteElement = document.createElement('div');
        quoteElement.classList.add('project');
        quoteElement.innerHTML = `
            <a href="${quote.link}" class="project-title" target="_blank">${quote.quote}</a>
            <p class="project-description">${quote.description}</p>
        `;
        quotesContainer.appendChild(quoteElement);
    }

    prevQuotesBtn.disabled = currentQuotePage === 0;
    nextQuotesBtn.disabled = currentQuotePage === Math.ceil(myQuotes.length / itemsPerPage) - 1;
}

nextQuotesBtn.addEventListener('click', () => {
    if (currentQuotePage < Math.ceil(myQuotes.length / itemsPerPage) - 1) {
        currentQuotePage++;
        updatePagination();
    }
});

prevQuotesBtn.addEventListener('click', () => {
    if (currentQuotePage > 0) {
        currentQuotePage--;
        updatePagination();
    }
});

updatePagination();
