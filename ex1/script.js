let currentPage = 1;
let currentCategory = '';

const peopleButton = document.getElementById('peopleButton');
const shipsButton = document.getElementById('shipsButton');
const previousButton = document.getElementById('previousButton');
const nextButton = document.getElementById('nextButton');
const tablesContainer = document.getElementById('tablesContainer');

peopleButton.addEventListener('click', () => {
    currentCategory = 'people';
    fetchData('people');
});

shipsButton.addEventListener('click', () => {
    currentCategory = 'starships';
    fetchData('starships');
});

function fetchData(category) {
    tablesContainer.innerHTML = '<p>Loading...</p>';
    const url = `https://swapi.dev/api/${category}/?page=${currentPage}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                createTable(data.results, category);
                handlePagination(data.next, data.previous);
            } else {
                tablesContainer.innerHTML = "<p>No data available for this category.</p>";
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            tablesContainer.innerHTML = "<p>Error fetching data.</p>";
        });
}

function createTable(data, category) {
    tablesContainer.innerHTML = '';

    const table = document.createElement('table');
    const header = document.createElement('thead');

    if (category === 'people') {
        header.innerHTML = `
            <tr>
                <th>Name</th>
                <th>Height</th>
                <th>Mass</th>
                <th>Gender</th>
                <th>Birth Year</th>
                <th>Appearances</th>
            </tr>
        `;
        table.appendChild(header);

        const tbody = document.createElement('tbody');
        data.forEach(person => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${person.name}</td>
                <td>${person.height}</td>
                <td>${person.mass}</td>
                <td>${person.gender}</td>
                <td>${person.birth_year}</td>
                <td>${person.films.length}</td>
            `;
            tbody.appendChild(row);
        });
        table.appendChild(tbody);

    } else if (category === 'starships') {
        header.innerHTML = `
            <tr>
                <th>Name</th>
                <th>Model</th>
                <th>Manufacturer</th>
                <th>Cost</th>
                <th>Crew</th>
                <th>Passengers</th>
                <th>Class</th>
            </tr>
        `;
        table.appendChild(header);

        const tbody = document.createElement('tbody');
        data.forEach(ship => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${ship.name}</td>
                <td>${ship.model}</td>
                <td>${ship.manufacturer}</td>
                <td>${ship.cost_in_credits}</td>
                <td>${ship.crew}</td>
                <td>${ship.passengers}</td>
                <td>${ship.starship_class}</td>
            `;
            tbody.appendChild(row);
        });
        table.appendChild(tbody);
    }

    tablesContainer.appendChild(table);
}

function handlePagination(next, previous) {
    previousButton.disabled = !previous;
    nextButton.disabled = !next;
}

function goToPreviousPage() {
    if (currentPage > 1) {
        currentPage--;
        fetchData(currentCategory);
    }
}

function goToNextPage() {
    currentPage++;
    fetchData(currentCategory);
}
