var favoritos = new LocalStorageList("favoritos");
favoritos.setDebug(true);

var palabras = null;
var comunidades = null;

fetch("/json/palabras.json")
    .then((r) => r.json())
    .then((d) => {
        palabras = d;
        if (document.readyState === "complete") {
            init();
            init2(palabras);
        }
    });

fetch("/json/CCAA.json")
    .then((r) => r.json())
    .then((d) => {
        comunidades = d;
        if (document.readyState === "complete") {
            init();
        }
    });

document.addEventListener("DOMContentLoaded", () => {
    if (palabras !== null && comunidades !== null) {
        init();
        init2(palabras);
    }
    setupSearch();
});

function init() {
    if (palabras == null || comunidades == null) return;

    let div = document.getElementById("mi-palabra");
    if (!div) return;
    let html = "";
    palabras.forEach((palabra, i) => {
        let estrella = favoritos.indexOf(palabra.id) >= 0 ? "si" : "no";
        html += `
            <div>
                <a href="detalle.html?id=${palabra.id}">
                    <p>${palabra.word}</p>
                    <p>${palabra.definition[0]}</p>
                </a>
                <a href="javascript:addRemoveFav('${palabra.id}', 'fav${i}')" id="fav${i}">${estrella}</a>
            </div>
        `;
    });

    div.innerHTML = html;
}

function addRemoveFav(id, idEnlace) {
    console.log("addRemoveFav - " + id + "," + idEnlace);
    favoritos.toggle(id);
    let enlace = document.getElementById(idEnlace);
    enlace.innerText = favoritos.indexOf(id) >= 0 ? "si" : "no";
}

function init2(palabras) {
    if (!palabras) return;
    let searchField = "word";
    let searchVal = "Arambol";
    let results = [];

    for (let i = 0; i < palabras.length; i++) {
        if (palabras[i][searchField] === searchVal) {
            results.push(palabras[i]);
            console.log("Found a match at index", i);
        }
    }

    console.log(results);
}

function setupSearch() {
    const form = document.getElementById("search-form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const query = document.getElementById("s").value.trim();
        searchWords(query);
    });
}

function searchWords(query) {
    if (!query || !palabras) return;

    let results = palabras.filter(palabra => palabra.word.toLowerCase().includes(query.toLowerCase()));

    displaySearchResults(results);
}

function displaySearchResults(results) {
    let div = document.getElementById("mi-palabra");
    if (!div) return;
    let html = "";

    if (results.length > 0) {
        results.forEach((palabra, i) => {
            let estrella = favoritos.indexOf(palabra.id) >= 0 ? "si" : "no";
            html += `
                <div>
                    <a href="detalle.html?id=${palabra.id}">
                        <p>${palabra.word}</p>
                        <p>${palabra.definition[0]}</p>
                    </a>
                    <a href="javascript:addRemoveFav('${palabra.id}', 'fav${i}')" id="fav${i}">${estrella}</a>
                </div>
            `;
        });
    } else {
        html = "<p>No results found</p>";
    }

    div.innerHTML = html;
}
