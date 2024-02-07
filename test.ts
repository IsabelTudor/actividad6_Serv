import test from "node:test"
import Usuario from "./src/usuarios/domain/Usuario"
import UsuarioUseCases from "./src/usuarios/application/UsuarioUseCases";
import UsuarioRepositoryPostgres from "./src/usuarios/infrastructure/db/Usuario.postgres";
const usuarioUseCases:UsuarioUseCases=new UsuarioUseCases(new UsuarioRepositoryPostgres())
import assert from 'assert'

test('registro',async (t)=>{
    const usuario:Usuario={
        nombre:"Prueba",
        password:"dkddfs"
    }
    const usuarioRegistrado:any=await usuarioUseCases.registrar(usuario);
    assert.strictEqual("Prueba",usuarioRegistrado.nombre)
})
test('login',async(t)=>{
 
    const usuarioIntroducido:Usuario={
        nombre: "Prueba",
        password:"dkddfs"
    }
    const usuarioLogeado= await usuarioUseCases.login(usuarioIntroducido)
    console.log(usuarioLogeado);

    assert.strictEqual("Prueba",usuarioLogeado.nombre)
    
})