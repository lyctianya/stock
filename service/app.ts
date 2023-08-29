import Koa from 'koa'
import cors from 'koa-cors' // 跨域
import bodyparser from 'koa-bodyparser' // 请求体JSON解析
import json from 'koa-json'
import logger from 'koa-logger'
import views from 'koa-views'
import koaJwt from 'koa-jwt'
import http from 'http'
import koaBody from 'koa-body'
import * as Config from './config/config'
import { privateRouter, publicRouter } from './router'
import { errorHandler, responseHandler } from './middleware/response'

const app = new Koa()

//允许跨域
app.use(cors())
//请求体json解析
app.use(
    bodyparser({
        enableTypes: ['json', 'form', 'text']
    })
)
app.use(json())

app.use(logger())

app.use(require('koa-static')(`${__dirname}/public`))

app.use(
    views(`${__dirname}/views`, {
        extension: 'ejs'
    })
)

// Error Handler
app.use(errorHandler)

// Global middleware
app.use(koaBody({ multipart: true }))

// Routes
app.use(publicRouter.routes()).use(publicRouter.allowedMethods()) // 公共路由
app.use(privateRouter.routes()).use(privateRouter.allowedMethods()) // 私有路由

// Response
app.use(responseHandler)

const server = http.createServer(app.callback())

server.listen(Config.SERVER.port)

server.on('error', (err: Error) => {
    console.log(err)
})

server.on('listening', () => {
    const address = `http://${Config.SERVER.ip}:${Config.SERVER.port}`
    const localAddress = `http://localhost:${Config.SERVER.port}`
    console.log(`app started at address \n\n${localAddress}\n\n${address}`)
})
