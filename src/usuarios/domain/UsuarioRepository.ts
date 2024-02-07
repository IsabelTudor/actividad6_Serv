import Usuario from "./Usuario";
import Compras from "./compras";

export default interface UsuarioRepository {
    registrar(usuario: Usuario): Promise<Usuario | undefined>;
    login(usuario: Usuario): Promise<Usuario | undefined>;
    insertarEnCarrito(idUsuario:number,idVideojuego:number):Promise<Compras[]|undefined>
    getCarrito(idUsuario:number):Promise<Compras[]|undefined>
    comprar(idUsuario:number,idVideojuego:number):Promise<Compras[]|undefined>
    getComprados(idUsuario:number):Promise<Compras[]|undefined>
}