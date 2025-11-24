import express from "express";
import albumRouter from "./albumsRoutes.js";
import musicRouter from "./musicsRoutes.js"
import postRouter from "./postsRoutes.js";

const routersArray = [albumRouter, musicRouter, postRouter]

function routes(app) {
    app.get("/", (req, res) => {
        res.send("api symphonia project")
    })

    app.use(express.json(), routersArray);
}
export default routes;
