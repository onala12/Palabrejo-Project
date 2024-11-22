
//para obtener el url de la página, se realiza en cualquier momento
// Obtiene los parámetros de la URL como constante
const searchParams = new URLSearchParams(window.location.search);

// Pregunta primero si ya tiene el parámetro
function getUrlParam (nombreParam) {
    return (searchParams.has(nombreParam)) ? searchParams.get(nombreParam) : null;
}
