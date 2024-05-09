var position1;
 var opacity1;
 var palabra;


class Palabra {
    constructor() {
        this.position = null;
        this.opacity = 0;
        this.palabra = null;
        this.id = null;
    }

    // Método para establecer la posición
    setPosition(newPosicion) {
        this.position = newPosicion;
    }

    setOpacity(newOpacidad) {
        this.opacity = newOpacidad;
    }

    setPalabra(newPalabra) {
        // Buscar el ID en el JSON y asignar la palabra correspondiente
        for (const key in miJSON) {
            if (miJSON[key].texto === newPalabra) {
                this.palabra = newPalabra;
                this.setId(miJSON[key].id);
                break;
            }
        } }
}

const miPalabra = new Palabra();

// Establecer valores
miPalabra.setPosition("top");
miPalabra.setOpacity(0.5);
miPalabra.setId(1); 

console.log(miPalabra.position); // Muestra: "top"
console.log(miPalabra.opacity); // Muestra: 0.5
console.log(miPalabra.palabra); // Muestra: "Hola"
console.log(miPalabra.id); // Muestra: 1
