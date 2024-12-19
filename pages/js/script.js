let currentDailyPage = 0;
let currentQuotePage = 0;

const dailyReflectionsContainer = document.getElementById('daily-reflections');
const quotesContainer = document.getElementById('my-quotes');

const prevDailyBtn = document.getElementById('prev-daily');
const nextDailyBtn = document.getElementById('next-daily');
const prevQuotesBtn = document.getElementById('prev-quotes');
const nextQuotesBtn = document.getElementById('next-quotes');

const itemsPerPage = 2;

let dailyReflections = [];
let myQuotes = [];

Promise.all([
    fetch('/pages/json/daily_reflections.json').then(response => response.json()),
    fetch('/pages/json/my_quotes.json').then(response => response.json())
]).then(([dailyData, quotesData]) => {
    dailyReflections = dailyData;
    myQuotes = quotesData;
    updatePagination(); // Call once both are loaded
}).catch(err => console.log('Error loading JSON files:', err));

function updatePagination() {
    const dailyStart = currentDailyPage * itemsPerPage;
    const dailyEnd = dailyStart + itemsPerPage;
    const quoteStart = currentQuotePage * itemsPerPage;
    const quoteEnd = quoteStart + itemsPerPage;

    // Update Daily Reflections display
    dailyReflectionsContainer.innerHTML = '';
    for (let i = dailyStart; i < dailyEnd && i < dailyReflections.length; i++) {
        const daily = dailyReflections[i];
        const dailyElement = document.createElement('div');
        dailyElement.classList.add('project');
        dailyElement.innerHTML = `
            <div class="project-title">
                <a href="${daily.link || '#'}" class="project-link">${daily.title}</a>
            </div>
            <div class="date">${daily.date}</div>
            <p class="project-description">${daily.description}</p>
        `;
        dailyReflectionsContainer.appendChild(dailyElement);
    }

    prevDailyBtn.disabled = currentDailyPage === 0;
    nextDailyBtn.disabled = currentDailyPage === Math.ceil(dailyReflections.length / itemsPerPage) - 1;

    // Update My Quotes display
    quotesContainer.innerHTML = '';
    for (let i = quoteStart; i < quoteEnd && i < myQuotes.length; i++) {
        const quote = myQuotes[i];
        const quoteElement = document.createElement('div');
        quoteElement.classList.add('project');
        quoteElement.innerHTML = `
            <div class="project-title">${quote.quote}</div>
            <p class="project-description">${quote.description}</p>
        `;
        quotesContainer.appendChild(quoteElement);
    }

    prevQuotesBtn.disabled = currentQuotePage === 0;
    nextQuotesBtn.disabled = currentQuotePage === Math.ceil(myQuotes.length / itemsPerPage) - 1;
}

nextDailyBtn.addEventListener('click', () => {
    if (currentDailyPage < Math.ceil(dailyReflections.length / itemsPerPage) - 1) {
        currentDailyPage++;
        updatePagination();
    }
});

prevDailyBtn.addEventListener('click', () => {
    if (currentDailyPage > 0) {
        currentDailyPage--;
        updatePagination();
    }
});

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
