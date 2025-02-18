export default class Food {
    constructor(data = {}) {
        // 唯一标识
        this.id = data.id || null;

        // 关联账户
        this.account = data.account || null;

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

        // 建立人员
        this.createUser = data.createUser || '';

        // 更新人员
        this.updateUser = data.updateUser || '';

        // 建立日期
        this.createDate = data.createDate || null;

        // 更新日期
        this.updateDate = data.updateDate || null;

        // 餐食
        this.meal = data.meal || '';
    }

    static fromJson(json = {}) {
        return new Food({
            id: json.id,
            account: json.account,
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
            createUser: json.createUser,
            updateUser: json.updateUser,
            createDate: json.createDate,
            updateDate: json.updateDate,
            meal: json.meal
        });
    }

    toJson() {
        return {
            id: this.id,
            account: this.account,
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
            createUser: this.createUser,
            updateUser: this.updateUser,
            createDate: this.createDate,
            updateDate: this.updateDate,
            meal: this.meal
        };
    }
}