// Inicializar favoritos
var favoritos = new LocalStorageList("favoritos");
favoritos.setDebug(true);

var palabras = null;
var comunidades = null;

// Cargar diccionario
fetch("/json/palabras.json")
    .then((r) => r.json())
    .then((d) => {
        palabras = d;
        init();
    });

// Cargar comunidades
fetch("/json/CCAA.json")
    .then((r) => r.json())
    .then((d) => {
        comunidades = d;
        init();
    });

// Inicializar tabs cuando el DOM está listo
document.addEventListener("DOMContentLoaded", tabs_init);

function init() {
    if (palabras == null || comunidades == null) return;

    let idParam = getUrlParam("id");
    if (idParam == null) {
        location.href = "error.html";
        return;
    }

    let palabra = palabras.find((p) => p.id == idParam);
    if (palabra == null) {
        location.href = "error.html";
        return;
    }

    // Asignar palabra
    let elemento = document.getElementById("palabra");
    elemento.innerHTML = palabra.word;

    // Asignar CA
    elemento = document.getElementById("CA");
    elemento.innerHTML = getCA(palabra.location);

    // Definiciones
    elemento = document.getElementById("definiciones");
    let html = "";
    palabra.definition.forEach(def => {
        html += `<li>${def}</li>`;
    });

    // Phonetic
    elemento.innerHTML = html;
    elemento = document.getElementById("phonetic");
    html = "";
    palabra.phonetic.forEach(pho => {
        html += `<p>${pho}</p>`;
    });    
    elemento.innerHTML = html;

    // Tipo
    elemento.innerHTML = html;
    elemento = document.getElementById("type");
    html = "";
    palabra.type.forEach(typ => {
        html += `<p>${typ}</p>`;
    });    
    elemento.innerHTML = html;

        // Origen
    elemento.innerHTML = html;
    elemento = document.getElementById("origen");
    html = "";
    palabra.origine.forEach(ori => {
        html += `<li>${ori}</li>`;
    });    
    elemento.innerHTML = html;
    
    // Asignar frases
    elemento = document.getElementById("frases");
    html = "";
    palabra.phrases.forEach(fra => {
        html += `<li>${fra}</li>`;
    });
    elemento.innerHTML = html;

    // Asignar botón de favoritos
    let favButton = document.getElementById("favorito");
    if (favoritos.indexOf(palabra.id) >= 0) {
        favButton.innerHTML = '<img src="img/star_full_y.svg" alt="Estrella llena">';
    } else {
        favButton.innerHTML = '<img src="img/star_contorno_w.svg" alt="Estrella">';
    }
    favButton.addEventListener("click", () => {
        addRemoveFav(palabra.id, "favorito");
    });
}

function getCA(idCA) {
    let ca = comunidades.find((ca) => ca.id == idCA);
    if (ca == null) return "??";
    return ca.name;
}

// Buscar todos los conjuntos de tabs y darles tratamiento
function tabs_init() {
    let tabs = document.querySelectorAll(".tabs");
    tabs.forEach(tab => tabs_tratarTab(tab));
}

// Dar tratamiento a un tab, es decir, un elemento con clase "tabs"
function tabs_tratarTab(tab) {
    let btns = tab.querySelectorAll(".tabs__tabbutton");
    let tabs = tab.querySelectorAll(".tabs__tab");

    btns.forEach((btn) => {
        btn.classList.remove("tabs__tabbutton--selected");
        if (btn.tagName == "A") {
            btn.href = "javascript:tabs_none()";
        }
    });

    tabs.forEach((tab) => tab.classList.remove("tabs__tab--visible"));

    btns.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            tabs.forEach((tab) => tab.classList.remove("tabs__tab--visible"));
            btns.forEach((btn) => btn.classList.remove("tabs__tabbutton--selected"));
            btn.classList.add("tabs__tabbutton--selected");
            tabs[i].classList.add("tabs__tab--visible");
        });
    });

    btns[0].classList.add("tabs__tabbutton--selected");
    tabs[0].classList.add("tabs__tab--visible");
}

function tabs_none() {
    // No se hace nada de manera intencionada.
}

// Utilidad para obtener parámetros de la URL
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Función para agregar o remover una palabra de favoritos
function addRemoveFav(id, idEnlace) {
    console.log("addRemoveFav - " + id + "," + idEnlace);
    favoritos.toggle(id);
    let enlace = document.getElementById(idEnlace).getElementsByTagName("img")[0];
    enlace.src = favoritos.indexOf(id) >= 0 
        ? "img/star_full_y.svg" 
        : "img/star_contorno_w.svg"; // Actualizar la imagen de la estrella
}
