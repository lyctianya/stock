import BaseDB from './baseDB'

class StockListDB extends BaseDB {}

export default new StockListDB(
    {
        name: String, //数据名称，也可称为值，易辨识且唯一
        desc: String, //描述
        code: String
    },
    'stockList'
)
