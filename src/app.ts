import express, { Application, json, Request, Response } from "express";
import { createList,getList,getListWithId } from "./logic";

const app: Application = express();
app.use(json());

app.post("/purchaseList", createList)
app.get("/purchaseList", getList)
app.get("/purchaseList/:id",getListWithId)

const PORT:number = 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

