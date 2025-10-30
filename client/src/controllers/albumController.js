import album from "../models/Album.js";

class AlbumController {
    //MÉTODO GET lista albums
    static async getAlbums(req, res) {
        try {
            const albums = await album.find();
            res.status(200).json(albums);
        } catch (e) {
            res.status(500).json({
                message: `getting albums failed`,
                error: e.message,
            });
        }
    }

    //MÉTODO GET lista album por id
    static async getAlbumByID(req, res) {
        try {
            const id = req.params.id;
            const especificAlbum = await album.findById(id).populate("musics");
            res.status(200).json(especificAlbum);
        } catch (e) {
            res.status(500).json({
                message: `finding album failed`,
                error: e.message,
            });
        }
    }

    //MÉTODO POST cria album
    static async createAlbum(req, res) {
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

    //método DELETE, deleta album pelo ID
    static async deleteAlbumByID(req, res) {
        try {
            const id = req.params.id
            const albumToDelete = await album.findByIdAndDelete(id)
            res.status(200).json({
                message: "album deleted!",
                albumDeleted: albumToDelete
            })
        } catch (e) {
            res.status(500).json({
                message: "album delete failed",
                error: e.message
            })
        }
    }
}

export default AlbumController;
