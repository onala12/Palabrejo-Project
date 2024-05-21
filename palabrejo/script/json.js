const datos = {
    nombre: "Samus",
    apellido: "Aran",
    edad: 25,
    profesion: "Cazarrecompensas"
  };
  
  // Esperar a que el contenido del DOM esté cargado
  document.addEventListener("DOMContentLoaded", init);
  
  function init() {
    // Obtener el elemento div con el id 'pizarra'
    let div = document.getElementById("pizarra");
    if (!div) return;
  
    // Crear el HTML para la ficha de información
    let html = `
      <div class="mi-palabra">
        <p class="nombre">${datos.nombre}</p>
        <p class="ficha__valor">${datos.apellido}</p>
        <p class="ficha__etiqueta">Edad: </p>
        <p class="ficha__valor">${datos.edad}</p>
        <p class="ficha__etiqueta">Profesión: </p>
        <p class="ficha__valor">${datos.profesion}</p>
      </div>
    `;
  
    // Asignar el HTML al div 'pizarra'
    div.innerHTML = html;
  }

  
  