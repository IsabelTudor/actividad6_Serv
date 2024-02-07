import express, { Request, Response } from "express";
import UsuarioRepository from "../../domain/UsuarioRepository";
import UsuarioRepositoryPostgres from "../../infrastructure/db/Usuario.postgres";
import UsuarioUseCases from "../../application/UsuarioUseCases";
import { createToken, isAuth } from "../../../context/security/auth";
import Usuario from "../../domain/Usuario";


const usuariosRepository: UsuarioRepository = new UsuarioRepositoryPostgres();

const usuarioUseCases: UsuarioUseCases= new UsuarioUseCases(usuariosRepository)

const router = express.Router();

router.post("/registro", async (req: Request, res: Response) => {
    const {nombre, password} = req.body;
    const usuarioAPI: Usuario = {
      nombre,
      password
    };
    const usuario: any = await usuarioUseCases.registrar(usuarioAPI);
    res.json(usuario);
  });

  router.post("/login", async (req: Request, res: Response) => {
    const { nombre, password } = req.body;
    const usuarioAPI: Usuario = {
      nombre,
      password
    };
    const usuario: any = await usuarioUseCases.login(usuarioAPI);
    if (usuario === null)
      res.status(404).json({ mensaje: "Usuario no encontrado" });
    const token = createToken(usuario);
    res.json({ token });
  });
  router.post("/insertar", isAuth,async(req,res)=>{
    const idUsuario=req.body.user;
    const idVideojuego=req.body.id;

    const carritoInsercion=await usuarioUseCases.insertEnCarrito(idUsuario,idVideojuego);
    res.json(carritoInsercion)
  })
  router.get("/carrito",isAuth,async(req,res)=>{
    const idUsuario=req.body.user;

    const carritoUsuario=await usuarioUseCases.getCarrito(idUsuario);
    res.json(carritoUsuario);
  })
  router.post("/comprar", isAuth,async(req,res)=>{
    const idUsuario=req.body.user;
    const idVideojuego=req.body.id;
    const comprar=await usuarioUseCases.comprar(idUsuario,idVideojuego);
    return comprar;
  })
  router.get("/compra", isAuth, async(req,res)=>{
    const idUsuario= req.body.user;
    const comprasUsuario= await usuarioUseCases.getComprados(idUsuario);
    res.json(comprasUsuario);
  })
  export default router;