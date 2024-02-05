import Usuario from "../../domain/Usuario";
import UsuarioRepository from "../../domain/UsuarioRepository";
import executeQuery from "../../../context/db/postgres.connection"
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
            return undefined
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
    async getUserById(id: number): Promise<Usuario | undefined> {
        try{
            const query = `SELECT * FROM usuarios WHERE id = ${id}`;
            const rows: any[] = await executeQuery(query);
            if (rows.length > 0) {
                const usuarioEncontrado: Usuario = {
                    id: rows[0].id,
                    nombre: rows[0].nombre,
                    password: rows[0].password
                };
                return usuarioEncontrado;
        }}catch(error){
            console.error("No se ha encontrado ningun usuario");
            return undefined   
        }
    }

}