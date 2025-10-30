import express from "express";
import albumRouter from "./albumsRoutes.js";

const routesArray = [albumRouter]

function routes(app) {
    app.get("/", (req, res) => {
        res.send("hello world!")
    })

    app.use(express.json(), routesArray);
}
export default routes;
