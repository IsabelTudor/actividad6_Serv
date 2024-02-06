import express, { Request, Response } from "express";
import UsuarioRepository from "../../domain/UsuarioRepository";
import UsuarioRepositoryPostgres from "../../infrastructure/db/Usuario.postgres";
import UsuarioUseCases from "../../application/UsuarioUseCases";
import { createToken } from "../../../context/security/auth";
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
    res.json({ id: usuario.id,nombre: usuario.nombre });
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
  export default router;