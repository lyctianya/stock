import { getIpAddress } from '../utils/util'

export const ENV = {
    development: 'development',
    production: 'production'
}

export const SERVER = {
    port: 8100,
    ip: getIpAddress()
}

export const DATABASE = {
    development: '',
    production: ''
}

export const JWT = {
    secret: 'KSDfjuw.USDjds',
    expires: 60 * 60 * 24 * 30 // 30天
}

export const db = {
    url: 'mongodb://localhost:27017/stock'
}
