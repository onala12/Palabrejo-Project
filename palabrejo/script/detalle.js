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

document.addEventListener("DOMContentLoaded", tabs_init);

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

// Buscar todos los conjuntos de tabs y darles tratamiento
function tabs_init () {
    // Buscar todos los elementos de clase "tabs"
    let tabs = document.querySelectorAll(".tabs");

    // Por cada uno de ellos, darle un tratamiento
    tabs.forEach (
        (tab) => tabs_tratarTab(tab)
    );
}

// Dar tratamiento a un tab, es decir, un elemento con clase "tabs"
function tabs_tratarTab (tab) {
    // Buscar los botones para cambiar de tab, clase ".tabs__tabbutton"
    let btns = tab.querySelectorAll(".tabs__tabbutton");
    // Buscar las tabs, clase ".tabs__tab"
    let tabs = tab.querySelectorAll(".tabs__tab");

    // NOTA: Se supone que está bien construido el HTML
    // y hay un botón para cada tab respetando el orden
    // para que corresponda: botón posición 0 con tab posición 0,
    // botón posición 1 con tab posición 1 y así sucesivamente.
    // De esta manera sabemos que btns[0] corresponde con tabs[0] y
    // así sucesivamente.

    // Apagar todos los botones quitándoles la clase que hace que
    // se vean activados.
    // NOTA: Si son enlaces, hay que cambiarles el href porque puede
    // que muevan la página si va al enlace genérico hashtag (#)
    // así que se cambia a una llamada javascript que evita que se
    // mueva la página
    btns.forEach (
        (btn) => {
            btn.classList.remove ("tabs__tabbutton--selected");
            // Si es un enlace: <a>
            if (btn.tagName == "A") {
                // Cambiar el href a una llamada a la funcion tabs_none()
                // que no hace nada pero permite evitar movimientos de
                // scroll de la página.
                btn.href = "javascript:tabs_none()";
            }
        }
    );

    // Apagar todas las tabs quitándoles la clase que hace que
    // se vean.
    tabs.forEach (
        (tab) => tab.classList.remove("tabs__tab--visible")
    );

    // Para cada botón...
    btns.forEach (
        // Tomamos el botón y su índice (posición en el array)
        (btn, i) => {
            // Añadimos tratamiento al CLICK del botón
            btn.addEventListener("click", 
                () => {
                    // Apagamos todas las tabs.
                    tabs.forEach (
                        (tab) => tab.classList.remove ("tabs__tab--visible")
                    );
                    // Apagamos todos los botones.
                    btns.forEach (
                        (btn) => btn.classList.remove ("tabs__tabbutton--selected")
                    );
                    // Activamos el botón que hicieron clic (btn)
                    btn.classList.add("tabs__tabbutton--selected");
                    // Activamos el tab correspondiente a este botón
                    // que es la misma que corresponde al índice del
                    // botón.
                    tabs[i].classList.add("tabs__tab--visible");
                }
            )
        }
    );

    // Activamos el primer botón
    btns[0].classList.add("tabs__tabbutton--selected");
    // Activamos la primera tab.
    tabs[0].classList.add("tabs__tab--visible");
}

// Función que no hace nada
// Se usa para evitar que la página haga scroll involuntario
// cuando los botones de las tabs son enlaces <a>
function tabs_none () {
    // No se hace nada de manera intencionada.
}
