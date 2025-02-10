export class DietVo {
    constructor(data = {}) {
        this.date = data.date || new Date()
        this.breakfast = (data.breakfast || []).map(item => new Diet(item))
        this.lunch = (data.lunch || []).map(item => new Diet(item))
        this.dinner = (data.dinner || []).map(item => new Diet(item))
    }
}

export class Diet {
    constructor(data = {}) {
        this.id = data.id || ''
        this.account = data.account || null
        this.createDate = data.createDate || null
        this.updateDate = data.updateDate || null
        this.meal = data.meal || ''
        this.name = data.name || ''
        this.brand = data.brand || null
        this.barcode = data.barcode || null
        this.quantity = data.quantity || 0
        this.unit = data.unit || ''
        this.calorie = data.calorie || 0
        this.carbohydrate = data.carbohydrate || null
        this.sugar = data.sugar || null
        this.fiber = data.fiber || null
        this.protein = data.protein || null
        this.fat = data.fat || null
        this.saturatedFat = data.saturatedFat || null
        this.monounsaturatedFat = data.monounsaturatedFat || null
        this.polyunsaturatedFat = data.polyunsaturatedFat || null
        this.transFat = data.transFat || null
        this.sodium = data.sodium || null
    }
}