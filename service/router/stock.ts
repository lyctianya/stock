import koaRouter from 'koa-router'
import * as StockService from '../services/stock'

const router = new koaRouter()
router.prefix('/stock')
// 获取列表
router.get('/list', async (ctx) => {
    ctx.body = {
        success: true
    }
})
// 更新列表
router.post('/list/update', async (ctx) => {
    ctx.body = await StockService.updateStockList()
})
export default router
