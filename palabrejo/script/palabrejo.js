/* Declaro variables*/

var map;
var output;

document.addEventListener('DOMContentLoaded', init);
/* Inicio el mapa */

function init() {
      /* Pongo zoom y posicion */
    map = L.map('map').setView([51.505, -0.09], 16);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        /* Añado openstreetmap */
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    /* añado pop up de posicion */
    var marker = L.marker([51.5, -0.09]).addTo(map);
    /* texto del pop-up posicion y lo añado al mapa */

    var standalonePopup = L.popup()
        .setLatLng([51.513, -0.09])
        .setContent("Pop-up posición")
        .openOn(map);
    /* boton de localizacion */
    var buttonLocalizame = document.getElementById('locateMe');
    buttonLocalizame.addEventListener('click', Localizame);
    /* consigo id de la consola*/

    output = document.getElementById("consola");
}
    /* funcion para localizar*/
    /* pongo texto para el proceso de localizar y las funciones error y success*/

function Localizame() {
    output.innerHTML = "<p>Localizandote . . .</p>";
    navigator.geolocation.getCurrentPosition(success, error);
}
    /* funcion success funciona cogiendo la latitud y longitud, localizando el mapa y poniendo mensaje en consola y pop-up*/

function success(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    map.setView([latitude, longitude], 16);
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    output.innerHTML = '<p>Posición encontrada</p>';

    map.setView([latitude, longitude], 16);

    L.marker([latitude, longitude])
        .bindPopup(`<p>Tu latitud es ${latitude}°</p><p>Tu longitud es ${longitude}°</p>`)
        .addTo(map)
        .openPopup();
        document.getElementById('map').style.display = 'block';

}
    /* funcion error funciona poniendo mensaje en la consola y pop-up, el pop-up se cierra*/

function error(err) {
    console.table(err);
    output.innerHTML = "ERROR, recarga y permite localización para continuar";
    map.closePopup();
    var errorPopup = L.popup()
        .setLatLng(map.getCenter())
        .setContent("No se pudo localizar")
        .addTo(map)
        .openPopup();
        setTimeout(function() {
            map.closePopup(errorPopup);
        }, 4000);
}
