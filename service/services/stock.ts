import stockListDB from '../db/stockListDB'

/**
 * 获取股票所有列表
 */
export function getStockList() {}
/**
 * 更新股票列表
 */
export async function updateStockList() {
    const saveInfo = await stockListDB.save({
        name: '贵州茅台',
        desc: '垃圾玩意儿'
    })
    return {
        success: true,
        code: 0,
        data: saveInfo
    }
}
