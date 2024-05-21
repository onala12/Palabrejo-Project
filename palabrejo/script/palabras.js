class MiPalabra extends HTMLElement {
    constructor() {
        super();
        this.position = null;
        this.opacity = 0;
        this.palabra = null;
        this.id = null;
    }

    // Método para establecer la posición
    setPosition(newPosicion) {
        this.position = newPosicion;
    }

    // Método para establecer la opacidad
    setOpacity(newOpacidad) {
        this.opacity = newOpacidad;
    }

    // Método para asignar la palabra y buscar su ID en el JSON
    setPalabra(newPalabra) {
        // Reemplaza 'miJSON' con tus datos reales
        for (const key in miJSON) {
            if (miJSON[key].texto === newPalabra) {
                this.palabra = newPalabra;
                this.setId(miJSON[key].id);
                break;
            }
        }
    }

    // Método para establecer el ID
    setId(newId) {
        this.id = newId;
    }

    connectedCallback() {
        console.log("Elemento personalizado agregado al DOM.");
    }

    disconnectedCallback() {
        console.log("Elemento personalizado eliminado del DOM.");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`El atributo ${name} ha cambiado.`);
    }
}

customElements.define("mi-palabra", MiPalabra);

// Ejemplo de uso
const miPalabra = new MiPalabra();
miPalabra.setPosition("top");
miPalabra.setOpacity(0.5);
miPalabra.setPalabra("Hola"); // Cambia "Hola" por la palabra deseada
console.log(miPalabra.position); // Muestra: "top"
console.log(miPalabra.opacity); // Muestra: 0.5
console.log(miPalabra.palabra); // Muestra: "Hola" (o la palabra asignada)
console.log(miPalabra.id); // Muestra: ID correspondiente desde el JSON
