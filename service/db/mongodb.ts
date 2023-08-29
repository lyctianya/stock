import mongoose from 'mongoose'
import log4js from '../utils/log4js'
import * as Config from '../config/config'

// Use native promises
mongoose.Promise = global.Promise

const db = mongoose.connection

db.on('error', (err) => {
    console.error('mongoose 连接出错', err)
    log4js.otherLogger('mongoose', {
        msg: 'mongoose 连接出错',
        err
    })
    mongoose.disconnect()
})

db.once('open', () => {
    // we're connected!
    log4js.otherLogger('mongoose', {
        msg: `mongodb已连上了。。。。`
    })
})

db.on('disconnected', () => {
    console.log('MongoDB disconnected!')
    log4js.otherLogger('mongoose', {
        msg: `MongoDB disconnected!`
    })
    setTimeout(() => {
        mongoose.connect(Config.db.url, {
            // reconnectInterval: 20 * 1000,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 20000,
            heartbeatFrequencyMS: 20000,
            family: 4
        })
    }, 20 * 1000)
})

mongoose.set('strictQuery', false)

mongoose.connect(Config.db.url, {
    // reconnectInterval: 20 * 1000,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 20000,
    heartbeatFrequencyMS: 20000,
    family: 4
})

// mongoose.plugin(timestamps,  {
//   createdAt: 'create_time',
//   updatedAt: 'update_time'
// });

export default mongoose
