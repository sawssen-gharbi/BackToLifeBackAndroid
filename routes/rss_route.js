import { Router } from 'express'
import { runRssParser } from '../controllers/rss.js'

const router = Router()

router.route('/').get(runRssParser)

export default router