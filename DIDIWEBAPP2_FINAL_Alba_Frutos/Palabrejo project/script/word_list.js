// Inicializar la lista de favoritos utilizando LocalStorageList
var favoritos = new LocalStorageList("favoritos");
favoritos.setDebug(true); 

// Variables para almacenar datos de palabras y comunidades autónomas
var palabras = null;
var comunidades = null;

// Cargar el archivo JSON de palabras
fetch("/json/palabras.json")
    .then((r) => r.json()) // Convertir la respuesta a JSON
    .then((d) => {
        palabras = d; // Almacenar los datos en la variable palabras
        init();
        buscador(palabras, ""); // Realizar una búsqueda inicial en palabras con un valor vacío
    });

// Cargar el archivo JSON de comunidades autónomas
fetch("/json/CCAA.json")
    .then((r) => r.json())
    .then((d) => {
        comunidades = d;
        init();
    });

// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    if (palabras !== null && comunidades !== null) {
        init();
        buscador(palabras, "");
    }
    setupSearch();
});

// Función para inicializar la interfaz
function init() {
    if (palabras == null || comunidades == null) return; // Si no hay datos, salir de la función

    let div = document.getElementById("mi-palabra"); // Obtener el elemento con id 'mi-palabra'
    if (!div) return;
    let html = "";

    // Recorrer cada palabra y generar el HTML correspondiente
    palabras.forEach((palabra, i) => {
        // Determinar la imagen de la estrella según si la palabra está en favoritos
        let estrellaImgSrc = favoritos.indexOf(palabra.id) >= 0 
            ? "img/star_full_y.svg" 
            : "img/star_contorno_w.svg";

        // Generar el HTML para cada palabra
        html += `
        <div class="card_container">
            <div class="card__palabrejo">
                <a href="detalle.html?id=${palabra.id}">
                    <h3>${palabra.word}</h3>
                    <div class="card__info">
                        <div class="card__text">
                            <p>${palabra.definition[0]}</p>
                        </div>
                        <a href="javascript:addRemoveFav('${palabra.id}', 'fav${i}')" id="fav${i}">
                            <img class="fav" src="${estrellaImgSrc}" alt="Estrella" />
                        </a>
                    </div>
                </a>
            </div>
        </div>
        `;
    });

    div.innerHTML = html;
}

// Función para agregar o quitar una palabra de favoritos
function addRemoveFav(id, idEnlace) {
    console.log("addRemoveFav - " + id + "," + idEnlace);
    favoritos.toggle(id);
    let enlace = document.getElementById(idEnlace).getElementsByTagName("img")[0]; // Obtener la imagen de la estrella
    enlace.src = favoritos.indexOf(id) >= 0 
        ? "img/star_full_y.svg" 
        : "img/star_contorno_w.svg";
}

// Función para buscar palabras en el diccionario
function buscador(palabras, searchVal) {
    if (!palabras || !searchVal) return;

    let results = []; // Lista para almacenar los resultados de la búsqueda

    // Recorrer cada palabra y buscar coincidencias
    palabras.forEach((palabra, index) => {
        for (const key in palabra) {
            if (palabra.hasOwnProperty(key) && typeof palabra[key] === 'string' && palabra[key].toLowerCase() === searchVal.toLowerCase()) {
                results.push(palabra);
                console.log("Se ha encontrado una palabra en index", index);
                break;
            }
        }
    });

    console.log(results);
    displaySearchResults(results);
}

// Función para configurar el formulario de búsqueda
function setupSearch() {
    const form = document.getElementById("search-form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const query = document.getElementById("search").value.trim();
        if (query) {
            buscador(palabras, query);
        }
    });
}

// Función para mostrar los resultados de la búsqueda en la interfaz
function displaySearchResults(results) {
    let div = document.getElementById("search-results");
    if (!div) return;
    let html = "";

    // Si hay resultados, generar el HTML para cada resultado
    if (results.length > 0) {
        results.forEach((palabra, i) => {
            // Determinar la imagen de la estrella según si la palabra está en favoritos
            let estrellaImgSrc = favoritos.indexOf(palabra.id) >= 0 
                ? "img/star_full_y.svg" 
                : "img/star_contorno_w.svg";

            // Generar el HTML para cada resultado
            html += `
            <div class="card_container">
                <div class="card__palabrejo">
                    <a href="detalle.html?id=${palabra.id}">
                        <h3>${palabra.word}</h3>
                        <div class="card__info">
                            <div class="card__text">
                                <p>${palabra.definition[0]}</p>
                            </div>
                            <a href="javascript:addRemoveFav('${palabra.id}', 'fav${i}')" id="fav${i}">
                                <img class="fav" src="${estrellaImgSrc}" alt="Estrella" />
                            </a>
                        </div>
                    </a>
                </div>
            </div>
            `;
        });
    } else {
        // Si no hay resultados, mostrar un mensaje
        html = "<p>No se ha encontrado ningún palabrejo, por favor, inténtalo de nuevo</p>";
    }

    div.innerHTML = html; // Asignar el HTML generado al elemento 'search-results'
}