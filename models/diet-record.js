export default class DietRecord {
    constructor(data = {}) {
        // 唯一标识
        this.id = data.id || null;

        // 关联账户 ID
        this.accountId = data.accountId || null;

        // 更新日期
        this.updateDate = data.updateDate || null;

        // 日期
        this.date = data.date || null;

        // 正餐
        this.meal = data.meal || '';

        // 食物名称
        this.name = data.name || '';

        // 品牌名称
        this.brand = data.brand || '';

        // 条形码
        this.barcode = data.barcode || '';

        // 数量
        this.quantity = data.quantity || 0.0;

        // 数量单位
        this.unit = data.unit || '';

        // 卡路里
        this.calorie = data.calorie || 0.0;

        // 碳水化合物
        this.carbohydrate = data.carbohydrate || 0.0;

        // 糖
        this.sugar = data.sugar || 0.0;

        // 纤维
        this.fiber = data.fiber || 0.0;

        // 蛋白质
        this.protein = data.protein || 0.0;

        // 脂肪
        this.fat = data.fat || 0.0;

        // 饱和脂肪
        this.saturatedFat = data.saturatedFat || 0.0;

        // 单不饱和脂肪
        this.monounsaturatedFat = data.monounsaturatedFat || 0.0;

        // 多不饱和脂肪
        this.polyunsaturatedFat = data.polyunsaturatedFat || 0.0;

        // 反式脂肪
        this.transFat = data.transFat || 0.0;

        // 钠
        this.sodium = data.sodium || 0.0;
    }

    /**
     * 用于将后端返回的 JSON 数据转换成 DietRecord 实例
     * @param {Object} json 后端返回的 JSON 数据
     * @returns {DietRecord} DietRecord 实例
     */
    static fromJson(json = {}) {
        return new DietRecord({
            id: json.id,
            accountId: json.accountId,
            updateDate: json.updateDate,
            date: json.date,
            meal: json.meal,
            name: json.name,
            brand: json.brand,
            barcode: json.barcode,
            quantity: json.quantity,
            unit: json.unit,
            calorie: json.calorie,
            carbohydrate: json.carbohydrate,
            sugar: json.sugar,
            fiber: json.fiber,
            protein: json.protein,
            fat: json.fat,
            saturatedFat: json.saturatedFat,
            monounsaturatedFat: json.monounsaturatedFat,
            polyunsaturatedFat: json.polyunsaturatedFat,
            transFat: json.transFat,
            sodium: json.sodium,
        });
    }

    /**
     * 将 DietRecord 实例转换成 JSON 数据
     * @returns {Object} JSON 数据
     */
    toJson() {
        return {
            id: this.id,
            accountId: this.accountId,
            updateDate: this.updateDate,
            date: this.date,
            meal: this.meal,
            name: this.name,
            brand: this.brand,
            barcode: this.barcode,
            quantity: this.quantity,
            unit: this.unit,
            calorie: this.calorie,
            carbohydrate: this.carbohydrate,
            sugar: this.sugar,
            fiber: this.fiber,
            protein: this.protein,
            fat: this.fat,
            saturatedFat: this.saturatedFat,
            monounsaturatedFat: this.monounsaturatedFat,
            polyunsaturatedFat: this.polyunsaturatedFat,
            transFat: this.transFat,
            sodium: this.sodium,
        };
    }
}