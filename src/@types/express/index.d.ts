import * as express from "express"
import { idType } from "../../interfaces"

declare global {
    namespace Express {
        interface Request {
            listPurchasing: {
                indexAboutListId:number
            },
            listItensDelete:{
                productKeyNameIndex:number,
                myList: idType
            }
        }
    }
}