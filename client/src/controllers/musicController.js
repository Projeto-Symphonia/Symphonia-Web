import music from "../models/Music.js";

class MusicController {
    //lista todas as músicas
    static async getMusics(req, res) {
        try {
            const musics = await music.find();
            res.status(200).json(musics);
        } catch (e) {
            res.status(500).json({
                message: `getting musics failed`,
                error: e.message,
            });
        }
    }

    //lista uma música pelo ID
    static async getMusicByID(req, res) {
        try {
            const id = req.params.id;

            //aqui ta referenciando 'albums' no 'albumID pra pegar o album especifico, e no campo à direita especificando que só retorne o atributo "photo"
            const especificMusic = await music.findById(id).populate('albumID', "photo"); 
            res.status(200).json(especificMusic);
        } catch (e) {
            res.status(500).json({
                message: `finding music failed`,
                error: e.message,
            });
        }
    }

    //create music
    static async createMusic(req, res) {
        try {
            const newMusic = await music.create(req.body);

            res.status(201).json({
                message: "music created!",
                album: newMusic,
            });
        } catch (e) {
            res.status(500).json({
                message: `music registry failed`,
                eror: e.message,
            });
        }
    }

    //update music pelo id
    static async updateMusicByID(req, res) {
        try {
            const id = req.params.id;
            const oldMusic = await music.findByIdAndUpdate(id, req.body);
            const updatedMusic = await music.findById(id);

            res.status(200).json({
                message: "music updated!",
                oldMusic: oldMusic,
                updatedMusic: updatedMusic,
            });
        } catch (e) {
            res.status(500).json({
                message: `music update failed`,
                eror: e.message,
            });
        }
    }

    //delete music pelo id
    static async deleteMusicByID(req, res) {
        try {
            const id = req.params.id;
            const musicToDelete = await music.findByIdAndDelete(id);
            res.status(200).json({
                message: "music deleted",
                musicDeleted: musicToDelete,
            });
        } catch (e) {
            res.status(500).json({
                message: `music update failed`,
                eror: e.message,
            });
        }
    }
}

export default MusicController;
