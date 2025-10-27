import express from "express";
import album from "../models/Album.js";

function routes(app) {
    app.get("/", (req, res) => {
        res.send("projeto symphonia");
    });

    app.use(express.json());

    app.get("/albums", async (req, res) => {
        try {
            const albumsList = await album.find({});
            res.status(200).json(albumsList);
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - listing books failed`,
            });
        }
    });

    app.post("/albums", (req, res) => {
        
    });
}
export default routes;
