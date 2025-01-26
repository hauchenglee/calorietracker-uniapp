export default class DietPlan {
    constructor(data = {}) {
        // 唯一标识
        this.id = data.id || null;

        // 关联账户 ID
        this.accountId = data.accountId || null;

        // 关联身体信息 ID
        this.bodyId = data.bodyId || null;

        // 更新日期
        this.updateDate = data.updateDate || null;

        // 理想体重 (Ideal Body Weight)
        this.ibw = data.ibw || 0.0;

        // 腰臀比 (Waist-Hip Ratio)
        this.whr = data.whr || 0.0;

        // 体重指数 (Body Mass Index)
        this.bmi = data.bmi || 0.0;

        // 基础代谢率 (Basal Metabolic Rate)
        this.bmr = data.bmr || 0.0;

        // 每日总能量消耗 (Total Daily Energy Expenditure)
        this.tdee = data.tdee || 0.0;

        // 活动指数
        this.activityLevel = data.activityLevel || 0;

        // 体重建议
        this.weightAdviceAction = data.weightAdviceAction || '';

        // 体重建议详细
        this.weightAdviceSuggestion = data.weightAdviceSuggestion || '';

        // 营养素建议
        this.nutrientSuggestion = data.nutrientSuggestion || '';

        // 详细饮食建议
        this.detailedSuggestion = data.detailedSuggestion || '';

        // 卡路里
        this.calorie = data.calorie || 0.0;

        // 碳水化合物
        this.carbohydrate = data.carbohydrate || 0.0;

        // 蛋白质
        this.protein = data.protein || 0.0;

        // 脂肪
        this.fat = data.fat || 0.0;
    }

    /**
     * 用于将后端返回的 JSON 数据转换为 DietPlan 实例
     * @param {Object} json 后端返回的 JSON 数据
     * @returns {DietPlan} DietPlan 实例
     */
    static fromJson(json = {}) {
        return new DietPlan({
            id: json.id,
            accountId: json.accountId,
            bodyId: json.bodyId,
            updateDate: json.updateDate,
            ibw: json.ibw,
            whr: json.whr,
            bmi: json.bmi,
            bmr: json.bmr,
            tdee: json.tdee,
            activityLevel: json.activityLevel,
            weightAdviceAction: json.weightAdviceAction,
            weightAdviceSuggestion: json.weightAdviceSuggestion,
            nutrientSuggestion: json.nutrientSuggestion,
            detailedSuggestion: json.detailedSuggestion,
            calorie: json.calorie,
            carbohydrate: json.carbohydrate,
            protein: json.protein,
            fat: json.fat,
        });
    }

    /**
     * 将 DietPlan 实例转换为 JSON 数据
     * @returns {Object} JSON 数据
     */
    toJson() {
        return {
            id: this.id,
            accountId: this.accountId,
            bodyId: this.bodyId,
            updateDate: this.updateDate,
            ibw: this.ibw,
            whr: this.whr,
            bmi: this.bmi,
            bmr: this.bmr,
            tdee: this.tdee,
            activityLevel: this.activityLevel,
            weightAdviceAction: this.weightAdviceAction,
            weightAdviceSuggestion: this.weightAdviceSuggestion,
            nutrientSuggestion: this.nutrientSuggestion,
            detailedSuggestion: this.detailedSuggestion,
            calorie: this.calorie,
            carbohydrate: this.carbohydrate,
            protein: this.protein,
            fat: this.fat,
        };
    }
}