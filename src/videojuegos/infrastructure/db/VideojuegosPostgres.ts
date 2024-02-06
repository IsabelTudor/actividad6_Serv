import { json, response } from "express";
import Videojuego from "../../domain/Videojuego";
import VideojuegoRepository from "../../domain/VideojuegoRepository";

export default class VideojuegoPostgres implements VideojuegoRepository{
    async getAll(): Promise<Videojuego[] | undefined> {
        fetch("http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=STEAMKEY&format=json")
        .then(response=>{
            if(response.ok){
                return json();
            }
        })
        throw new Error("Method not implemented.");
    }
    save(videojuego: Videojuego): Promise<Videojuego | undefined> {
        throw new Error("Method not implemented.");
    }

}