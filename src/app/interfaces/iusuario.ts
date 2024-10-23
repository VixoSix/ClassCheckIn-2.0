//POST
export interface IUsuario {
    nombre:string,
    apellido:string,
    correo:string,
    nombreUsuario:string,
    contrasenia:string,
    rut:string,
    isactive:boolean
    imagen:string;
}

//GET y PUT
export interface IUsuarios {
    id:number,
    nombre:string,
    apellido:string,
    correo:string,
    nombreUsuario:string,
    contrasenia:string,
    rut:string,
    isactive:boolean
    imagen:string;
}
