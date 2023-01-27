import { Request, Response, NextFunction } from 'express'
import { dataBaseLists } from './database'
import { idType, iItensRequiredKeys, iListRequiredKeys } from './interfaces'

export const validatedBodyMiddleware = (request: Request, response: Response, next: NextFunction): Response | void => {
    const keys: Array<string> = Object.keys(request.body)
    const requiredKeys: Array<iListRequiredKeys> = ["listname","data"]
    const requiredItens: Array<iItensRequiredKeys> = ["name","quantity"]

    if (typeof request.body.listName !== "string") {
        return response.status(400).json({message: `The list name need to be a string`})
    }

    let validatedKeys: boolean = requiredKeys.some((key: string) => keys.includes(key))

    if (!validatedKeys || keys.length > 2 || keys.length < 2 ) {
        return response.status(400).json({message: `This correct keys are ${requiredKeys}`})
    }

    request.body.data.forEach((element: any, index:any) => {
        const keysData: Array<string> = Object.keys(element)

        if(typeof request.body.data[index].name !== "string" || typeof request.body.data[index].quantity !== "string"){
            return response.status(400).json({message: `The list name need to be a string`})
        }

        let validatedKeysData: boolean = requiredItens.every((key: string) => keysData.includes(key))
        if (!validatedKeysData) {
            return response.status(400).json({message: `This correct keys are ${requiredItens}`})
        }
    });
    return next()
}

export const ensureListExistId = (request: Request, response: Response, next: NextFunction): Response | void => {
    const idList: number = parseInt(request.params.id)

    const indexAboutListId = dataBaseLists.findIndex((elem) => elem.id === idList)

    request.listPurchasing = {
        indexAboutListId:indexAboutListId
    }

    if (indexAboutListId === -1) {
        return response.status(404).json({message: `List with id: ${request.params.id}, does not exist`})
    }

    return next()
}

export const deleteWithIdAndUpdate = (request: Request, response: Response, next: NextFunction): Response | void => {
    const idList: number = parseInt(request.params.id)
    const nameProduct:string = request.params.name
    const myList = dataBaseLists.find(elem => elem.id === idList)

    if (!myList) {
        return response.status(404).json({message: `List with id: ${idList}, does not exist`})
    }

    const productKeyNameIndex = myList.data.findIndex((elem )=> elem.name === nameProduct)

    request.listItensDelete = {
        productKeyNameIndex:productKeyNameIndex,
        myList:myList
    }

    if (productKeyNameIndex === -1) {
        return response.status(404).json({message: `List with name: ${nameProduct}, does not exist`})
    } 

    return next()
}