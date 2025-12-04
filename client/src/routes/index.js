import express from "express";
import albumRouter from "./albumsRoutes.js";
import musicRouter from "./musicsRoutes.js"

const routesArray = [albumRouter, musicRouter]

function routes(app) {
    app.get("/", (req, res) => {
        res.send("hello world!")
    })

    app.use(express.json(), routesArray);
}
export default routes;
