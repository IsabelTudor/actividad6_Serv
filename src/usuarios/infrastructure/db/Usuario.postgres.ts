import Usuario from "../../domain/Usuario";
import UsuarioRepository from "../../domain/UsuarioRepository";
import executeQuery from "../../../context/db/postgres.connection"
import Compras from "../../domain/compras";
export default class UsuarioRepositoryPostgres implements UsuarioRepository{
    async registrar(usuario: Usuario): Promise<Usuario | undefined> {
        const {nombre, password}= usuario;
        try{
          const query=`insert into usuarios (nombre,password) values ('${nombre}','${password}') returning *`
        const rows: any[]=await executeQuery(query);
        const usuarioDB:Usuario={
            id: rows[0].id,
            nombre:rows[0].nombre,
            password:rows[0].password
        }
        return usuarioDB;  
        }catch (error){
            console.error("No se ha podido registrar el usuario");
        }
    }
    async login(usuario: Usuario): Promise<Usuario | undefined> {
        const {nombre}=usuario;
        try{
          const query=`select * from usuarios where nombre ='${nombre}'`
        const rows: any[]= await executeQuery(query);
        if(rows.length===0){
            throw new Error("Usuario/contraseña no es correcto");
        }else{
            const usuarioDB: Usuario={
                id: rows[0].id,
                nombre:rows[0].nombre,
                password:rows[0].password
            }
            return usuarioDB;
        }  
        }catch(error){
            console.error("No se ha podido logear el usuario");
            return undefined
        }
    }
    async insertarEnCarrito(idUsuario: number, idVideojuego: number): Promise<Compras[] | undefined> {
        try{
            const sql=`insert into compras(idUsuario,idVideojuego,comprado) values (${idUsuario},${idVideojuego},'false')`;
            await executeQuery(sql);
            return this.getCarrito(idUsuario)
        }catch (error){
            console.error("No se pudo insertar en el carrito");
            
        }
        
    }
    async getCarrito(idUsuario:number): Promise<Compras[] | undefined> {
        try{
            const sql=`SELECT * from compras where idUsuario=${idUsuario} AND comprado='false'`
            const carritoDB= await executeQuery(sql);
            return carritoDB;
        }catch(error){
            console.error("Error al obtener el carrito");
            
        }
    }
    async getComprados(idUsuario: number): Promise<Compras[] | undefined> {
        try{
            const sql=`SELECT * from compras where idUsuario=${idUsuario} AND comprado='true'`
            const compradosDB= await executeQuery(sql);
            return compradosDB;
        }catch(error){
            console.error("Error al obtener el carrito");
        }
    }


}