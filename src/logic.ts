import { Request, Response } from "express";
import { iList,idType } from "./interfaces";
import { dataBaseIds, dataBaseLists } from "./database";

export const createList = (request: Request, response:Response) : Response => {
    const body:iList = request.body

    const id = dataBaseIds.length + 1
    const newBody:idType = {
        ...body,
        id:id
    }

    dataBaseIds.push(id)
    dataBaseLists.push(newBody)
    return response.status(201).json({id:id,...body})
}

export const getList = (request: Request, response: Response): Response => {
    return response.status(200).json( dataBaseLists )
}

export const getListWithId = (request: Request, response: Response): Response => {
    const indexFromMiddle: number = request.listPurchasing.indexAboutListId
    return response.status(200).json(dataBaseLists[indexFromMiddle])
}

export const deleteList = (request: Request, response: Response): Response => {
    const indexFromMiddle: number = request.listPurchasing.indexAboutListId
    dataBaseLists.splice(indexFromMiddle,1)

    return response.status(204).json()
}

export const deleteItemList = (request: Request, response: Response): Response => {
    const indexDeleteItens:number = request.listItensDelete.productKeyNameIndex
    const listDeleteItens: idType = request.listItensDelete.myList

    listDeleteItens?.data.splice(indexDeleteItens,1)
    return response.status(204).json()
}

export const updateItemList = (request: Request, response: Response): Response => {
    const indexUpdate:number = request.listItensDelete.productKeyNameIndex
    const listUpdate: idType = request.listItensDelete.myList

    dataBaseLists[indexUpdate] = {...listUpdate.data[indexUpdate],...request.body}
    console.log("deu bom")
    return response.status(200).json()
}