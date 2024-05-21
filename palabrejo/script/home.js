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
                init2(palabras, "");
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
            search(palabras, "");
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
                        <p>${palabra.definition}</p>
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

    function search(palabras, searchVal) {
        if (!palabras) return;
        if (!searchVal) return;

        let results = [];

        palabras.forEach((palabra, index) => {
            for (const key in palabra) {
                if (palabra.hasOwnProperty(key) && typeof palabra[key] === 'string' && palabra[key].toLowerCase() === searchVal.toLowerCase()) {
                    results.push(palabra);
                    console.log("Found a match at index", index);
                    break;
                }
            }
        });

        console.log(results);
        displaySearchResults(results);
    }

    function setupSearch() {
        const form = document.getElementById("search-form");
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            const query = document.getElementById("s").value.trim();
            if (query) {
                init2(palabras, query);
            }
        });
    }

    function displaySearchResults(results) {
        let div = document.getElementById("search-results");
        if (!div) return;
        let html = "";

        if (results.length > 0) {
            results.forEach((palabra, i) => {
                let estrella = favoritos.indexOf(palabra.id) >= 0 ? "si" : "no";
                html += `
                    <div>
                        <a href="detalle.html?id=${palabra.id}">
                            <p>${palabra.word}</p>
                            <p>${palabra.definition}</p>
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

/*function displaySearchResults(results) {
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
*/
