import express from "express";
import { taskCtrl } from "../../controllers/front/index.js";

const router = express.Router()

router.route('/')
    .get(taskCtrl.index)
    .post(taskCtrl.store)

router.route('/:id')
    .get(taskCtrl.show)
    .put(taskCtrl.update)
    .patch(taskCtrl.update)
    .delete(taskCtrl.destroy)
    
export default router
