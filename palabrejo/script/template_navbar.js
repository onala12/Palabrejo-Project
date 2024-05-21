//------------------------------------------TEMPLATING NAVBAR------------------------------------------------
// Variables globales
var template = 0;
// html de carga
const template_href = "data-templating-href";

// Verificar que se han cargado los templates
function template_final() {
    return template <= 0;
}

// Función para cambiar el aspecto del icono correspondiente a la página en la que está el usuario
function navbar_activa() {
    // Variables
    // Obtener la página en la que está el usuario
    var pag_actual = window.location.href;
    // Seleccionar los elementos de la navbar 
    var iconos_navbar = document.querySelectorAll(".navbar li");

    // Itera sobre los elementos de la navbar
    iconos_navbar.forEach(function (item) {
        //obtener todos los elementos con "a"
        var enlace = item.querySelector("a");
        // Compara el href de cada apartado del navbar con la URL de la página donde está el usuario
        if (enlace.href === pag_actual) {
            // Añade la clase del CSS que cambia el color del iciono si la URL actual se corresponde con la del enlace
            item.classList.add("navbar__activa");
        }
    });
}

// Iniciar templates
function iniciar_template() {
    const elementos = document.querySelectorAll(`[${template_href}]`);
    //Itera sobre los elementos con el atributo data-templating-href y suma uno en la variable template para saber cuántos templates se van a cargar
    template = 0;
    elementos.forEach((elemento) => {
        if (elemento.dataset.templatingHref) template++;
    });

    // Obtener templates
    elementos.forEach((elemento) => {
        const href = elemento.dataset.templatingHref;
        //Volver si no hay template
        if (!href) return;
        //Pedir el contenido a través de fetch
        fetch(href)
        //Función de éxito
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text(); //Devuelve la promesa como texto
            })
            .then(function (html) {
                //Reemplazar contenido de la plantilla
                elemento.innerHTML = html;
                template--;
                //Si al verificar los templates
                if (template_final()) {
                    navbar_activa();
                }
            })
            //Función de error
            .catch(function (error) {
                //Aviso por consola del error
                console.error('No se puede obtener el HTML:', error);
                template--;
                if (template_final()) {
                    navbar_activa();
                }
            });
    });
}

// Cargar templates con la carga de la página
window.addEventListener("load", iniciar_template);
