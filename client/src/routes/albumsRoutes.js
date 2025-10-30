import express from "express";
import AlbumController from "../controllers/albumController.js";

const albumRouter = express.Router();

//lista albums na rota '/albums'
albumRouter.get("/albums", AlbumController.getAlbums);

//cria um album na rota '/albums'
albumRouter.post("/albums", AlbumController.createAlbum);

//lista album pelo ID na rota "/albums/:id"
albumRouter.get("/albums/:id", AlbumController.getAlbumByID);

//atualiza album na rota "/albums/:id"
albumRouter.put("/albums/:id", AlbumController.updateAlbumByID);

//deleta album na rota "/albums/:id"
albumRouter.delete("/albums/:id", AlbumController.deleteAlbumByID);

export default albumRouter;
