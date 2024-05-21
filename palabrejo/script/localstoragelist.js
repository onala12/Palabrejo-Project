
/*
    CLASE LocalStorageList
    ----------------------
    Permite gestionar una lista de datos guardada en el localStorage
*/

class LocalStorageList {

    // Propiedades privadas
    #valueLC = null;
    #values = null;
    #keyLS = "defaultKey";
    #autosave = true;
    #duplicates = false;
    #separator = ",";
    #debug = false;

    // Constructor
    // - key = String. Clave que se usa en localStorage
    // - duplicates = Boolean. Si se permiten o no duplicados.
    // - separator = String. Separador entre elementos de la lista.
    // - debug = Boolean. Si vuelca o no información en la consola.
    constructor (key, autosave = true, duplicates = false, separator = ",", debug = false) {
        // Apuntar los valores de creación del objeto
        this.#keyLS = key;
        this.#autosave = autosave;
        this.#separator = separator;
        this.#duplicates = duplicates;
        this.#debug = debug;

        // Buscar la clave en el localStorage
        this.#valueLC = localStorage.getItem(this.#keyLS);
        // Si está vacía o no está, se crea la lista vacía.
        if (this.#valueLC == null || (this.#valueLC != null && this.#valueLC.length == 0)) {
            this.#values = [];
        } else {
            // Crear la lista de valores separando por el separador
            this.#values = this.#valueLC.split(this.#separator);
        }

        // Log
        this.#log (`constructor -> [${this.#values.join(separator)}]`);
    }

    // Cambia el comportamiento de escribir automáticamente información por consola
    setDebug (debug) {
        this.#debug = debug;
    }

    // Limpiar totalmente la lista
    clear() {
        this.#values = [];
        this.#checkAutosave();
        this.#log(`clear ()`);
    }

    // Añadir un elemento a la lista
    add (value) {
        this.#log(`add(${value})`);
        // Si no admite duplicados, comprobar que no está ya el valor en la lista
        if (!this.#duplicates){
            let pos = this.#values.indexOf (value);
            if (pos >= 0) return;
        }
        // Añadir el valor.
        this.#values.push (value);
        this.#log(`          ${this.#values.join(this.#separator)}`);
        this.#checkAutosave();
    }

    // Añade si no está o borra si está el valor
    toggle (value) {
        if (this.indexOf(value) < 0) {
            this.add(value);
        } else {
            this.remove(value);
        }
    }

    // Eliminar un valor de la lista
    remove (value) {
        this.#log(`remove(${value})`);
        let pos = this.#values.indexOf(value);
        if (pos < 0) return;
        this.#values.splice (pos, 1);
        this.#log(`          ${this.#values.join(this.#separator)}`);
        this.#checkAutosave();
    }

    // Eliminar TODOS los valores que coincidan en la lista (solo ocurrirá si admite duplicados)
    removeAll (value) {
        this.#log(`removeAll(${value})`);
        for (let pos = this.#values.indexOf(value); pos >= 0; pos = this.#values.indexOf(value)) {
            this.#values.splice (pos, 1);
        }
        this.#log(`          ${this.#values.join(this.#separator)}`);
        this.#checkAutosave();
    }

    // Devuelve un ARRAY con los valores de la lista.
    getValues () {
        return this.#values;
    }

    // Devuelve el número de valores que hay en la lista
    getLength () {
        return this.#values.length;
    }
    
    // Devuelve el valor que está en una posición de la lista
    // Devuelve null si se sale del rango
    getValue (index) {
        if ((index < 0) || (index >= this.#values.length)) return null;
        return this.#values[index];
    }
    
    // Devuelve la posición de un elemento en la lista
    // Si no lo encuentra devuelve -1
    indexOf (value) {
        return this.#values.indexOf (value);
    }
    
    // Grabar datos en localStorage
    save () {
        // Generar un string con los valores de la lista separados por el separador
        this.#valueLC = this.#values.join(this.#separator);
        // Guardar los datos en el localStorage
        localStorage.setItem (this.#keyLS, this.#valueLC);
        this.#log("save()");
    }

    // Devuelve un string con los valores de la lista separados por el separador
    join () {
        return this.#values.join(this.#separator);
    }

    // Devuelve un string con un resumen del objeto
    joinLog () {
        return `LocalStorage[${this.#keyLS}] = [${this.join()}]`;
    }
    
    // Verifica si se debe o no hacer el guardado de datos
    #checkAutosave () {
        if (this.#autosave) this.save();
    }

    // Hace o no el log del objeto en la consola.
    #log (text) {
        if (this.#debug) console.log (`LocalStorage[${this.#keyLS}] -> ${text}`);
    }
}