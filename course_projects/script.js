let currentPage = 1;
let apiUrl = "";

document.getElementById("charactersLink").addEventListener("click", function() {
    apiUrl = "https://swapi.dev/api/people/?page=1";
    fetchData();
});

document.getElementById("shipsLink").addEventListener("click", function() {
    apiUrl = "https://swapi.dev/api/starships/?page=1";
    fetchData();
});

function fetchData() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let output = "<table><tr><th>Name</th><th>Details</th></tr>";
            data.results.forEach(item => {
                output += `<tr><td>${item.name}</td><td>${item.url}</td></tr>`;
            });
            output += "</table>";

            let buttonsHtml = `<button id="prevButton">Previous</button><button id="nextButton">Next</button>`;

            document.getElementById("resultsContainer").innerHTML = output + buttonsHtml;

            document.getElementById("prevButton").style.display = data.previous ? "inline-block" : "none";
            document.getElementById("nextButton").style.display = data.next ? "inline-block" : "none";

            document.getElementById("nextButton").addEventListener("click", function() {
                currentPage++;
                apiUrl = apiUrl.replace(/page=\d+/, `page=${currentPage}`);
                fetchData();
            });

            document.getElementById("prevButton").addEventListener("click", function() {
                currentPage--;
                apiUrl = apiUrl.replace(/page=\d+/, `page=${currentPage}`);
                fetchData();
            });
        });
}
