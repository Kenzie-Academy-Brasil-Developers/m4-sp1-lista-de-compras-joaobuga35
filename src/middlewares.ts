import { Request, Response, NextFunction } from 'express'
import { dataBaseLists } from './database'
import { iItensRequiredKeys, iListRequiredKeys } from './interfaces'

export const validatedBodyMiddleware = (request: Request, response: Response, next: NextFunction): Response | void => {
    const keys: Array<string> = Object.keys(request.body)
    const requiredKeys: Array<iListRequiredKeys> = ["listname","data"]
    const requiredItens: Array<iItensRequiredKeys> = ["name","quantity"]


    let validatedKeys: boolean = requiredKeys.some((key: string) => keys.includes(key))

    if (!validatedKeys || keys.length > 2 ) {
        return response.status(400).json({message: `This correct keys are ${requiredKeys}`})
    }

    request.body.data.forEach((element: string, i: number) => {
        const keysData: Array<string> = Object.keys(element)

        let validatedKeysData: boolean = requiredItens.every((key: string) => keysData.includes(key))
        console.log(validatedKeysData)
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