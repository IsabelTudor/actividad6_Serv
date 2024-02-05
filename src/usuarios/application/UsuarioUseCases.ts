import Usuario from "../domain/Usuario";
import UsuarioRepository from "../domain/UsuarioRepository";

export default class UsuarioUseCases{
    private usuarioRepository:UsuarioRepository;

    constructor(usuarioRepository:UsuarioRepository){
        this.usuarioRepository=usuarioRepository;
    }
    async registrar(usuario:Usuario){
        return await this.usuarioRepository.registrar(usuario);
    }
    async login(usuario:Usuario){
        return await this.usuarioRepository.login(usuario);
    }
    async getUserById(id:number){
        return await this.usuarioRepository.getUserById(id);
    }
}