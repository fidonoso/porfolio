import {Router} from 'express';

const router=Router()

import {getProjectId} from '../controllers/projects.controller.js'

router.get('/project/:id', getProjectId)


export default router