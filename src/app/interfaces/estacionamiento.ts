export interface Estacionamiento {
    id : number,
    patente: "ABC123",
    horaIngreso: "",
    horaEgreso: string,
    costo: number,
    idUsuarioIngreso: string,
    idUsuarioEgreso: string,
    idCochera: number,
    eliminado : boolean | undefined

}