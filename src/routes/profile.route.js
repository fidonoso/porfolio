import {Router} from 'express';

const router=Router()

import {getProfile} from '../controllers/profile.controller.js'

router.get('/profile', getProfile)


export default router