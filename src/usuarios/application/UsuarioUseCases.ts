import Usuario from "../domain/Usuario";
import UsuarioRepository from "../domain/UsuarioRepository";
import { hash } from "../../context/security/encrypter";
import { compare } from "bcrypt";

export default class UsuarioUseCases{
    private usuarioRepository:UsuarioRepository;

    constructor(usuarioRepository:UsuarioRepository){
        this.usuarioRepository=usuarioRepository;
    }
    async registrar(usuario:Usuario){
        if (!usuario.password) throw new Error("Falta password");
        const cifrada = hash(usuario.password);
        usuario.password = cifrada;
        return await this.usuarioRepository.registrar(usuario);
    }
    async login(usuario:Usuario){
        if (!usuario.password) throw new Error("Falta password");
    const usuarioBD = await this.usuarioRepository.login(usuario);
    if (!usuarioBD) throw new Error("Usuario no encontrado");
    const iguales = await compare(usuario.password, String(usuarioBD.password));
    if (iguales) {
      return usuarioBD;
    } else {
      throw new Error("Usuario/contraseña no es correcto");
    }
  }
    }
    
