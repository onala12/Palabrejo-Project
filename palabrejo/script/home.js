var palabras=null;
fetch("/json/palabras.json")
    .then((r) => r.json())
    .then((d) => {
        palabras=d;
        init();
    })
var comunidades=null;
fetch("/json/CCAA.json")
    .then((r) => r.json())
    .then((d) => {
        comunidades=d;
        init();
    })

document.addEventListener("DOMContentLoaded", init);

function init() {
    if(palabras==null) return;
    if(comunidades==null) return;

    // Obtener el elemento div con el id 'pizarra'
    let div = document.getElementById("pizarra");
    if (!div) return;
    let html= "";
    palabras.forEach(palabra => {
    html += `
        <a href="detalle.html?id=${palabra.id}"> ${palabra.word}</a>
    `
        
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
