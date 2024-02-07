import test from "node:test"
import Usuario from "./src/usuarios/domain/Usuario"
import UsuarioUseCases from "./src/usuarios/application/UsuarioUseCases";
import UsuarioRepositoryPostgres from "./src/usuarios/infrastructure/db/Usuario.postgres";
const usuarioUseCases:UsuarioUseCases=new UsuarioUseCases(new UsuarioRepositoryPostgres())
import assert from 'assert'

//No registra a dos personas con el mismo nombre, esta pensado para que sea por usuarios.
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
        nombre: "Prueba3",
        password:"dkddfs"
    }
    await usuarioUseCases.registrar(usuarioIntroducido);
    
    const usuarioIntroducido2:Usuario={
        nombre: "Prueba3",
        password:"dkddfs"
    }
    const usuarioLogeado= await usuarioUseCases.login(usuarioIntroducido2)
    assert.strictEqual("Prueba3",usuarioLogeado.nombre)
    
})
test('insercion en carrito y dimension carrito',async(t)=>{
    const idUsuario:number=39;
    const idVideojuego:number=25;
    await usuarioUseCases.insertEnCarrito(idUsuario,idVideojuego);
    const carrito= await usuarioUseCases.getCarrito(idUsuario);
    assert.strictEqual(2,carrito?.length)
})
test('comprar',async(t)=>{
    const idUsuario:number=39;
    const idVideojuego:number=25;
    await usuarioUseCases.comprar(idUsuario,idVideojuego);
    const compra= await usuarioUseCases.getComprados(idUsuario);
    assert.strictEqual(2,compra?.length)
})