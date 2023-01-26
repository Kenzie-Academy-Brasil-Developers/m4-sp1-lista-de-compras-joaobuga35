import { Request, Response } from "express";
import { iList,idType } from "./interfaces";
import { dataBase,dataBaseIds } from "./database";

export const createList = (request: Request, response:Response) : Response => {
    const body:iList = request.body
    
    const id = dataBase.length + 1
    const newBody:idType = {
        id:id,
        ...body
    }

    dataBaseIds.push(id)
    dataBase.push(newBody)
    return response.status(201).json({newBody})
}