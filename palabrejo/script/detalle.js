var favoritos= new LocalStorageList("favoritos");
favoritos.setDebug(true);

var palabras=null;

fetch("/json/diccionario.json")
    .then((r) => r.json())
    .then((d) => {
        palabras=d;
        init();
    });

var comunidades=null;

fetch("/json/CCAA.json")
    .then((r) => r.json())
    .then((d) => {
        comunidades=d;
        init();
    });

document.addEventListener("DOMContentLoaded", init);

function init() {
    if(palabras==null) return;
    if(comunidades==null) return;

    let idParam = getUrlParam("id");
    if (idParam == null) {
        location.href="error.html";
        return;
    }

    let palabra = palabras.find(
        (p)=> p.id == idParam
    );
    if (palabra==null) {
        location.href="error.html";
        return;
    }

    let elemento = document.getElementById("palabra");
    elemento.innerHTML = palabra.word;
    elemento = document.getElementById("CA");
    elemento.innerHTML = getCA(palabra.location);

    elemento = document.getElementById("definiciones");
    let html="";
    palabra.definition.forEach(
        def => {
            html+=`
            <li>${def}</li>
            `;
    });
    elemento.innerHTML =html;
}

function getCA(idCA){
    let ca = comunidades.find(
        (ca) => ca.id == idCA
    );
    if (ca == null) return "??";
    return ca.name;
}