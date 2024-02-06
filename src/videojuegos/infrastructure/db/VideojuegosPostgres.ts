import  format  from "pg-format";
import Videojuego from "../../domain/Videojuego";
import VideojuegoRepository from "../../domain/VideojuegoRepository";
import executeQuery from "../../../context/db/postgres.connection";

export default class VideojuegoPostgres implements VideojuegoRepository{
    async getAll(): Promise<void> {
        try{
           const response=await fetch("https://api.steampowered.com/ISteamApps/GetAppList/v2/")
            if(response.ok){
                const result:any=await response.json();
                const data: any[]=result.applist.apps
                const videojuegos: Videojuego[]=[];
                for(const item of data){
                    const videojuego: Videojuego={
                        nombre: item.name || " "
                    }
                    videojuegos.push(videojuego)
                }
                this.save(videojuegos)
            }else{
                throw new Error (`Error en la solicitud ${response.status}`)
            }
        }catch (error){
            console.error(error);
            
        }
        
      
    }
    async save(videojuego: Videojuego[]): Promise<void> {
        const data: any[]=[];
        for(const videojuegoLista of videojuego){
            data.push([videojuegoLista.nombre])
        }
        await executeQuery(format(`insert into videojuegos (nombre) values %L`,data))
       
    }

}