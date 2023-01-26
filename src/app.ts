import express, { Application, json, Request, Response } from "express";
import { createList } from "./logic";

const app: Application = express();
app.use(json());

app.post("/purchaseList", createList)

const PORT:number = 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

