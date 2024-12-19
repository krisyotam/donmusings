document.addEventListener('DOMContentLoaded', function () {
    // Initialize daily reflections script
    console.log("Initializing daily reflections script...");
    
    // Declare dailyReflections array globally
    let dailyReflections = [];
    
    // Fetch the data from the JSON file
    fetch('/pages/json/daily_reflections.json')
        .then(response => response.json())
        .then(data => {
            // Check if the data is loaded and not empty
            if (Array.isArray(data) && data.length > 0) {
                dailyReflections = data;
                console.log("Data loaded from daily_reflections.json:", dailyReflections);
                updatePagination(); // Proceed with pagination if data is available
            } else {
                console.log("No daily reflections found to display.");
            }
        })
        .catch(error => {
            console.error('Error loading daily reflections:', error);
        });

    // Pagination logic for displaying reflections
    let currentPage = 0; // Start on the first page
    const itemsPerPage = 3; // Define how many reflections per page
    
    // Function to update the pagination buttons and the reflections list
    function updatePagination() {
        // Guard clause: if no data to display, return
        if (dailyReflections.length === 0) {
            console.log('No daily reflections found to display.');
            return;
        }

        // Get the daily reflections container element
        const dailyReflectionsContainer = document.getElementById('daily-reflections');
        if (!dailyReflectionsContainer) {
            console.error('Error: Daily reflections container not found.');
            return;
        }

        // Clear the container before appending new content
        dailyReflectionsContainer.innerHTML = '';

        // Calculate the start and end indices for the current page's data
        const start = currentPage * itemsPerPage;
        const end = Math.min(start + itemsPerPage, dailyReflections.length);

        // Loop through the data to display reflections for the current page
        for (let i = start; i < end; i++) {
            const reflection = dailyReflections[i];
            
            // Validate the structure of each reflection
            if (!reflection.title || !reflection.date || !reflection.description || !reflection.link) {
                console.warn('Missing required fields in daily reflection entry:', reflection);
                continue; // Skip the entry if it's incomplete
            }

            // Construct the full URL for the post by appending the filename to the directory
            const fullPostLink = `/posts/html/${reflection.link}`;

            // Create and append the reflection to the container
            const dailyElement = document.createElement('div');
            dailyElement.classList.add('project');
            dailyElement.innerHTML = `
                <div class="project-title">
                    <a href="${fullPostLink}" class="project-link">${reflection.title}</a>
                </div>
                <div class="date">${reflection.date}</div>
                <p class="project-description">${reflection.description}</p>
            `;
            dailyReflectionsContainer.appendChild(dailyElement);
        }

        // Update pagination buttons
        updatePaginationButtons();
    }

    // Function to update the pagination buttons
    function updatePaginationButtons() {
        const prevDailyBtn = document.querySelector('.pagination .previous');
        const nextDailyBtn = document.querySelector('.pagination .next');

        // Enable/Disable Previous button
        prevDailyBtn.disabled = currentPage === 0;

        // Enable/Disable Next button
        nextDailyBtn.disabled = currentPage === Math.ceil(dailyReflections.length / itemsPerPage) - 1;

        // Event listeners for buttons
        prevDailyBtn.addEventListener('click', () => {
            if (currentPage > 0) {
                currentPage--;
                updatePagination();
            }
        });

        nextDailyBtn.addEventListener('click', () => {
            if (currentPage < Math.ceil(dailyReflections.length / itemsPerPage) - 1) {
                currentPage++;
                updatePagination();
            }
        });
    }
});
