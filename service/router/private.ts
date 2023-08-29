import koaRouter from 'koa-router'
import { jwtMiddlewareDeal } from '../middleware/jwt'
import stockRouter from './stock'

const router = new koaRouter()

// router.use(jwtMiddlewareDeal)

router.use(stockRouter.routes(), stockRouter.allowedMethods())

export default router
