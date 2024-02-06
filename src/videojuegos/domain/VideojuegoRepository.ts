import Videojuego from "./Videojuego";

export default interface VideojuegoRepository{
    getAll():Promise<void>
    save(videojuego: Videojuego[]):Promise<void>
}