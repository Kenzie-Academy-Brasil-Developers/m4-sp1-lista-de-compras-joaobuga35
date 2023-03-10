import express, { Application, json, Request, Response } from 'express';
import { createList,deleteItemList,deleteList,getList,getListWithId, updateItemList } from './logic';
import { deleteWithIdAndUpdate, ensureListExistId, validatedBodyMiddleware, validatedBodyPatch } from './middlewares';

const app: Application = express();
app.use(json());

app.post('/purchaseList',validatedBodyMiddleware, createList)
app.get('/purchaseList', getList)
app.get('/purchaseList/:id',ensureListExistId,getListWithId)
app.delete('/purchaseList/:id',ensureListExistId, deleteList)
app.delete('/purchaseList/:id/:name',deleteWithIdAndUpdate, deleteItemList)
app.patch('/purchaseList/:id/:name',deleteWithIdAndUpdate,validatedBodyPatch,updateItemList)

const PORT:number = 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

