import VideojuegoUseCases from "../../application/VideojuegoUseCases";
import VideojuegoRepository from "../../domain/VideojuegoRepository";
import VideojuegoPostgres from "../db/VideojuegosPostgres";
import express from "express";

const videojuegoRepository:VideojuegoRepository=new VideojuegoPostgres();
const videojuegoUseCases: VideojuegoUseCases= new VideojuegoUseCases(videojuegoRepository)
const router= express.Router();

router.post("/insertar", async (req, res) => {
    try {
        await videojuegoUseCases.getAll();
        res.json("Se insertaron");
    } catch (error) {
        console.error("Error inserting videojuegos:", error);
        res.status(500).json("Error inserting videojuegos");
    }
});

export default router;