//POST
export interface Ijustificacion {
    fecha:string,
    asignatura:string,
    docente:string,
    descripcion:string,
    imagen:string

}

//GET, PUT, DELETE
export interface Ijustificaciones {
    id:number,
    fecha:string,
    asignatura:string,
    docente:string,
    descripcion:string,
    imagen:string
}
