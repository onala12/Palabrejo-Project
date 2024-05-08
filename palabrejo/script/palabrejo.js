class Palabra {
    constructor() {
        this.position = null;
        this.opacity = 0;
        this.palabra = null;
    }

    // Método para establecer la posición
    setPosition(newPosicion) {
        this.position = newPosicion;
    }

    setOpacity(newOpacidad) {
        this.opacity = newOpacidad;
    }

    setPalabra(newPalabra) {
        this.palabra = newPalabra;
    }
}

const miPalabra = new Palabra();

// Establecer valores
miPalabra.setPosition("top");
miPalabra.setOpacity(0.5);
miPalabra.setPalabra("Hola");

console.log(miPalabra.position); // Muestra: "top"
console.log(miPalabra.opacity); // Muestra: 0.5
console.log(miPalabra.palabra); // Muestra: "Hola"
