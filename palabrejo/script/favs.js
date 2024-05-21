
var favoritos= new LocalStorageList("favoritos");
favoritos.setDebug(true);

var palabras=null;

fetch("/json/palabras.json")
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

    // Obtener el elemento div con el id 'pizarra'
    let div = document.getElementById("mi-palabra");
    if (!div) return;
    let html= "";
    palabras.forEach(
        (palabra, i) => {
            if (favoritos.indexOf(palabra.id) < 0) return;
            let estrella = "no";
            if (favoritos.indexOf(palabra.id)>=0){
                estrella = "si";
            }
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
    // Crear el HTML para la ficha de información
    // let html = `
    //   <div class="ficha">
    //     <p class="ficha__etiqueta">Nombre: </p>
    //     <p class="ficha__valor">${datos.nombre}</p>
    //     <p class="ficha__etiqueta">Apellido: </p>
    //     <p class="ficha__valor">${datos.apellido}</p>
    //     <p class="ficha__etiqueta">Edad: </p>
    //     <p class="ficha__valor">${datos.edad}</p>
    //     <p class="ficha__etiqueta">Profesión: </p>
    //     <p class="ficha__valor">${datos.profesion}</p>
    //   </div>
    // `;
  
    // Asignar el HTML al div 'pizarra'
  }

function addRemoveFav (id, idEnlace) {
    console.log ("addRemoveFav - " + id + "," + idEnlace)
    favoritos.toggle(id);
    let enlace = document.getElementById(idEnlace);
    enlace.innerText = (favoritos.indexOf(id) >= 0) ? "si" : "no";
}
