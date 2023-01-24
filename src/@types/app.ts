import express, { Application, json, Request, Response } from "express";

const app: Application = express();
app.use(json());

app.post("/login", (request:Request, response:Response) => {
    console.log(request.body)
    return response.status(201).json({message:"Usuário criado"})
})

const PORT:number = 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

