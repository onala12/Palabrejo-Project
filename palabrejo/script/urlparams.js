
/*
    LA OBTENCIÓN DE PARÁMETROS DE LA URL DE LA PÁGINA
    SE PUEDE REALIZAR EN CUALQUIER MOMENTO, ESTÁ DESDE
    EL MISMO MOMENTO EN QUE LA PÁGINA SE SOLICITA Y LLEGAN
    LOS PRIMEROS DATOS. 
*/
// Obtener los parámetros de la URL dejando el objeto como constante
// de forma que no va a cambiar en la vida útil de la página y
// queda a disposición de quien lo desee.
const searchParams = new URLSearchParams(window.location.search);

// Función que simplifica el hecho de localizar un parámetro en la URL
// Preguntar primero si tiene el parámetro antes de obtenerlo, si no lo
// encuentra asignar directamente null para indicar que no lo han enviado.
function getUrlParam (nombreParam) {
    return (searchParams.has(nombreParam)) ? searchParams.get(nombreParam) : null;
}
