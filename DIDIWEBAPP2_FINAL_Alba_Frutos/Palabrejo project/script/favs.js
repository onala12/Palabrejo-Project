// Se crea una la clase LocalStorageList con el nombre "favoritos"
var favoritos = new LocalStorageList("favoritos");
favoritos.setDebug(true); 
// Variables para almacenar datos que se obtendrán de archivos JSON
var palabras = null;
var comunidades = null;

// Petición asíncrona fetch para acceder al json
fetch("/json/palabras.json")
    .then((r) => r.json()) // Se convierte la respuesta a JSON
    .then((d) => {
        palabras = d; // Se asigna el JSON obtenido a la variable palabras
        init(); 
    });

// Fetch para obtener el archivo CCAA.json y inicializar la variable comunidades
fetch("/json/CCAA.json")
    .then((r) => r.json()) // Se convierte la respuesta a JSON
    .then((d) => {
        comunidades = d; // Se asigna el JSON obtenido a la variable comunidades
        init(); t
    });

// Evento para inicializar el contenido una vez que el DOM está cargado
document.addEventListener("DOMContentLoaded", init);

function init() {
    // Se verifica si palabras o comunidades son null, si es así, se sale de la función
    if (palabras == null || comunidades == null) return;

    // Se obtiene el elemento con el id 'mi-palabra'
    let div = document.getElementById("mi-palabra");
    if (!div) return; 
    let html = "";

    // Se recorre el array palabras y se agrega contenido basado en los favoritos
    palabras.forEach((palabra, i) => {
        // Se determina la imagen de la estrella (llena o vacía) según si la palabra está en favoritos
        let estrellaImgSrc = favoritos.indexOf(palabra.id) >= 0 
            ? "img/star_full_y.svg" 
            : "img/star_contorno_w.svg";
        
        // Este bloque parece un error ya que reemplaza el valor de estrellaImgSrc sin usar la variable estrella
        if (favoritos.indexOf(palabra.id) < 0) return;
        let estrella = "img/star_contorno_w.svg";
        if (favoritos.indexOf(palabra.id) >= 0) {
            estrella = "img/star_full_y.svg";
        }

        // Se genera el HTML para cada palabra, incluyendo enlaces y la imagen de la estrella
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
                    </div>
                </a>
 
                </a>
            </div>
            </div>

        `;
    });

    // Se asigna el HTML generado al elemento con id 'mi-palabra'
    div.innerHTML = html;
}

// Función para agregar o remover una palabra de favoritos
function addRemoveFav(id, elementId) {
    console.log("addRemoveFav - " + id + "," + elementId);
    favoritos.toggle(id); // Se agrega o quita la palabra de favoritos
    let enlace = document.getElementById(elementId).getElementsByTagName("img")[0];
    // Se actualiza la imagen de la estrella según si la palabra está en favoritos
    enlace.src = (favoritos.indexOf(id) >= 0) 
        ? "img/star_full_y.svg" 
        : "img/star_contorno_w.svg";
}