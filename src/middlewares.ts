import { Request, Response, NextFunction } from 'express'
import { dataBaseLists } from './database'

export const listExist = (request: Request, response: Response, next: NextFunction): Response | void => {
    const idList: number = parseInt(request.params.id)

    const indexAboutListId = dataBaseLists.findIndex((elem) => elem.id === idList)

    request.listPurchasing = {
        indexAboutListId:indexAboutListId
    }

    return next()
}