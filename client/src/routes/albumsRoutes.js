import express from "express";
import AlbumController from "../controllers/albumController.js";

const albumRouter = express.Router();

//lista albums na rota '/albums'
albumRouter.get("/albums", AlbumController.listAlbums);

//cria um album na rota '/albums'
albumRouter.post("/albums", AlbumController.registerAlbum);

//lista album pelo ID na rota "/albums/:id"
albumRouter.get("/albums/:id", AlbumController.listAlbumByID)

//atualiza album na rota "/albums/:id"
albumRouter.put("/albums/:id", AlbumController.updateAlbumByID)


export default albumRouter;

