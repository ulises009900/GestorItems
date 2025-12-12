export default class Articulo {
    constructor(datos) {
        Object.assign(this, datos);
    }

    precioSinIVA() {
        return this.costo * (1 + this.ganancia / 100);
    }

    precioFinal() {
        return this.precioSinIVA() * (1 + this.iva / 100);
    }

    stockCritico() {
        return this.stock <= this.stock_minimo;
    }
}
