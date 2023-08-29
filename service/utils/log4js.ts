import log4js from 'koa-log4'
import { Context, Next } from 'koa'
import { getClientIpAddress } from './util'
import path from 'path'

log4js.configure({
    pm2: true,
    pm2InstanceVar: 'INSTANCE_ID',
    appenders: {
        error: {
            type: 'dateFile', // 日志类型
            category: 'errLogger', // 日志名称
            filename: path.join('logs/', 'error/error.'), // 日志输出位置，当目录文件或文件夹不存在时自动创建
            pattern: 'yyyy-MM-dd.log', // 日志输出模式
            alwaysIncludePattern: true,
            maxLogSize: 104800, // 文件最大存储空间
            backups: 100 // 当文件内容超过文件存储空间时，备份文件的数量
        },
        response: {
            type: 'dateFile',
            category: 'resLogger',
            filename: path.join('logs/', 'responses/'),
            pattern: 'yyyy-MM-dd.log', // 日志输出模式
            alwaysIncludePattern: true,
            maxLogSize: 104800,
            backups: 100
        },
        other: {
            type: 'dateFile',
            category: 'resLogger',
            filename: path.join('logs/', 'other/'),
            pattern: 'yyyy-MM-dd.log', // 日志输出模式
            alwaysIncludePattern: true,
            maxLogSize: 104800,
            backups: 100
        }
    },
    categories: {
        error: { appenders: ['error'], level: 'info' },
        response: { appenders: ['response'], level: 'info' },
        other: { appenders: ['other'], level: 'info' },
        default: { appenders: ['response'], level: 'info' }
    }
})

const formatError = (ctx: Context, err: any) => {
    const { method, url } = ctx
    const { header, body } = ctx.request
    const { message } = ctx.response
    const status = err
        ? err.isBoom
            ? err.output.statusCode
            : err.status || 500
        : ctx.status || 404
    const user = (ctx.state.user && ctx.state.user) || ''
    return {
        method,
        url,
        status,
        message,
        body,
        header,
        user,
        err
    }
}

const formatRes = (ctx: Context, costTime: number) => {
    const {
        method,
        url,
        response: { status, message }
    } = ctx
    const { body } = ctx.request
    const { header } = ctx.request
    const { user } = ctx.state
    const remoteAddress = getClientIpAddress(ctx)
    return {
        method,
        url,
        user,
        body,
        costTime,
        header,
        remoteAddress,
        response: { status, message }
    }
}

const otherRes = (from: any, Options: any) => {
    // msg
    return {
        from,
        Options
    }
}

const errorLogger = log4js.getLogger('error')
const resLogger = log4js.getLogger('response')
const otherLogger = log4js.getLogger('other')

export default {
    errLogger: function (ctx: Context, error: Error) {
        if (ctx && error) {
            errorLogger.error(formatError(ctx, error))
        }
    },
    resLogger: function (ctx: Context, resTime: number) {
        if (ctx) {
            resLogger.info(formatRes(ctx, resTime))
        }
    },
    otherLogger: function (from: any, Options: any) {
        if (from) {
            otherLogger.info(otherRes(from, Options))
        }
    }
}
