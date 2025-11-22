import express from "express";
import MusicController from "../controllers/musicController.js";

const musicRouter = express.Router();

//lista todas as músicas
musicRouter.get("/musics", MusicController.getMusics);

//lista música pelo ID
musicRouter.get("/musics/:id", MusicController.getMusicByID);

//cria música
musicRouter.post("/musics", MusicController.createMusic);

//atualiza música pelo id
musicRouter.put("/musics/:id", MusicController.updateMusicByID);

//deleta música pelo id
musicRouter.delete("/musics/:id", MusicController.deleteMusicByID);

export default musicRouter;
