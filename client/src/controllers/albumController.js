import album from "../models/Album.js";

class AlbumController {
    //MÉTODO GET lista albums
    static async listAlbums(req, res) {
        try {
            const albumsList = await album.find({});
            res.status(200).json(albumsList);
        } catch (e) {
            res.status(500).json({
                message: `listing album failed`,
                error: e.message,
            });
        }
    }

    //MÉTODO GET lista album por id
    static async listAlbumByID(req, res) {
        try {
            const id = req.params.id;
            const especificAlbum = await album.findById(id);
            res.status(200).json(especificAlbum);
        } catch (e) {
            res.status(500).json({
                message: `finding album failed`,
                error: e.message,
            });
        }
    }

    //MÉTODO POST cria album
    static async registerAlbum(req, res) {
        try {
            const newAlbum = req.body;
            await album.create(newAlbum);
            res.status(201).json({
                message: "album created!",
                album: newAlbum,
            });
        } catch (e) {
            res.status(500).json({
                message: `album registry failed`,
                eror: e.message,
            });
        }
    }

    //MÉTODO PUT atualiza album pelo id
    static async updateAlbumByID(req, res) {
        try {
            const id = req.params.id;
            const oldAlbum = await album.findByIdAndUpdate(id, req.body);
            const updatedAlbum = await album.findById(id);
            res.status(200).json({
                message: "album updated!",
                oldAlbum: oldAlbum,
                updatedAlbum: updatedAlbum,
            });
        } catch (e) {
            res.status(500).json({
                message: `album update failed`,
                eror: e.message,
            });
        }
    }
}

export default AlbumController;
