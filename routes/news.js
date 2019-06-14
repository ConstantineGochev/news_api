import NewsController from '.././controllers/news'
import {Router} from 'express'
const router = Router()

router.get('/', (req, res) => { res.send('success')})

router.post('/add', NewsController.add)
router.get('/sort', NewsController.sort_by_date)
router.get('/get_all', NewsController.get_all)
router.get('/filter', NewsController.filter_by_date)


export default router
