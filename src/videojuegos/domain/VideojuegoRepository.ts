import Videojuego from "./Videojuego";

export default interface VideojuegoRepository{
    getAll():Promise<Videojuego[]|undefined>
    save(videojuego: Videojuego):Promise<Videojuego|undefined>
}