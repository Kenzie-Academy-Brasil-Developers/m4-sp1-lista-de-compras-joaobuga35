import { Request, Response } from "express";
import { iList,idType } from "./interfaces";
import { dataBase,dataBaseIds } from "./database";

export const createList = (request: Request, response:Response) : Response => {
    const body:iList = request.body

    const id = dataBase.length + 1
    const newBody:idType = {
        ...body,
        id:id
    }

    dataBaseIds.push(id)
    dataBase.push(newBody)
    return response.status(201).json({newBody})
}

export const getList = (request: Request, response: Response): Response => {
    console.log(request.body)

    return response.status(200).json({ dataBase })
}

export const getListWithId = (request: Request, response: Response): Response => {
    const idList: number = parseInt(request.params.id)

    const indexAboutListId = dataBase.findIndex((elem) => elem.id === idList)

    return response.status(200).json(dataBase[indexAboutListId])
}