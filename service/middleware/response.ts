import Koa from 'koa'
import log4js from '../utils/log4js'
import { CODE } from '../config/code'

// 这个middleware用于将ctx.result中的内容最终回传给客户端
export const responseHandler = async (ctx: Koa.Context, next: Koa.Next) => {
    const start = Date.now()
    await next()
    if (ctx.body !== undefined) {
        ctx.type = 'json'
        ctx.body = {
            code: CODE.success.code,
            data: ctx.body,
            message: CODE.success.message
        }
    }
    log4js.resLogger(ctx, Date.now() - start)
}

// 这个middleware处理在其它middleware中出现的异常,我们在next()后面进行异常捕获，出现异常直接进入这个中间件进行处理
export const errorHandler = (ctx: Koa.Context, next: Koa.Next) => {
    return next().catch((err) => {
        if (typeof err === 'object') {
            ctx.body = {
                code: err.code,
                data: null,
                message: err.message
            }
        } else {
            ctx.body = {
                code: -1,
                data: null,
                message: err
            }
        }
        log4js.errLogger(ctx, err)
        // 保证返回状态是 200
        ctx.status = 200

        return Promise.resolve()
    })
}
