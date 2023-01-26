import { Request, Response, NextFunction } from 'express'
import { dataBaseLists } from './database'

export const listExist = (request: Request, response: Response, next: NextFunction): Response | void => {
    const idList: number = parseInt(request.params.id)

    const indexAboutListId = dataBaseLists.findIndex((elem) => elem.id === idList)

    if (indexAboutListId === -1) {
        return response.status(404).json({message: "List Not Found"})
    }

    request.listPurchasing = {
        indexAboutListId:indexAboutListId
    }

    return next()
}