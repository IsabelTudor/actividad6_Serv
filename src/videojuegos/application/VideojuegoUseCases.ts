import Videojuego from "../domain/Videojuego";
import VideojuegoRepository from "../domain/VideojuegoRepository";

export default class VideojuegoUseCases{
    private videojuegoRepository: VideojuegoRepository;

    constructor(videojuegoRepository: VideojuegoRepository){
        this.videojuegoRepository=videojuegoRepository;
    }
    async getAll(){
        return await this.getAll()
    }
    async save(videojuego: Videojuego){
        return await this.videojuegoRepository.save(videojuego)
    }
}