import mongoosePaginate from 'mongoose-paginate-v2'
import { Model } from 'mongoose'
import mongodb from './mongodb'

const { Schema } = mongodb

class BaseDB {
    instance: any = undefined
    constructor(customSchemaObj: Object, dbname: string) {
        let selfSchema = new Schema(customSchemaObj, {
            timestamps: { createdAt: 'create_time', updatedAt: 'update_time' }
        })
        selfSchema.plugin(mongoosePaginate)
        this.instance = mongodb.model(dbname, selfSchema)
    }
    //保存
    save(obj: Object) {
        return this.instance(obj).save()
    }
    //单个更新
    updateOne(searchObj: Object, updateObj: Object) {
        return this.instance.updateOne(searchObj, { $set: updateObj })
    }
    //多个更新
    updateMany(searchObj: Object, updateObj: Object) {
        return this.instance.updateMany(searchObj, updateObj)
    }
    //自定义查询
    aggregate(rules: Array<Object>) {
        return this.instance.aggregate(rules)
    }
    //单个查询，多个时查最早的一个
    findOne(searchObj: Object) {
        return this.instance.findOne(searchObj)
    }
    //查询最新的一条
    async findLastOne(searchObj: Object) {
        return (await this.instance.find(searchObj).sort({ _id: -1 }).limit(1))[0]
    }
}

export default BaseDB
