export default class Body {
    constructor(data = {}) {
        // 唯一标识
        this.id = data.id || null;

        // 关联账户
        this.accountId = data.accountId || null;

        // 出生日期
        this.birthday = data.birthday || null;

        // 性别
        this.gender = data.gender || '';

        // 身高（cm）
        this.height = data.height || 0.0;

        // 体重（kg）
        this.weight = data.weight || 0.0;

        // 体脂率
        this.bodyFat = data.bodyFat || 0.0;

        // 腰围
        this.waistCircumference = data.waistCircumference || 0.0;

        // 臀围
        this.hipCircumference = data.hipCircumference || 0.0;

        // 更新日期
        this.updateDate = data.updateDate || null;
    }

    /**
     * 用于将后端返回的 JSON 数据转换成 Body 实例
     * @param {Object} json 后端返回的 JSON 数据
     * @returns {Body} Body 实例
     */
    static fromJson(json = {}) {
        return new Body({
            id: json.id,
            accountId: json.accountId,
            birthday: json.birthday,
            gender: json.gender,
            height: json.height,
            weight: json.weight,
            bodyFat: json.bodyFat,
            waistCircumference: json.waistCircumference,
            hipCircumference: json.hipCircumference,
            updateDate: json.updateDate,
        });
    }

    /**
     * 将 Body 实例转换成 JSON 数据
     * @returns {Object} JSON 数据
     */
    toJson() {
        return {
            id: this.id,
            accountId: this.accountId,
            birthday: this.birthday,
            gender: this.gender,
            height: this.height,
            weight: this.weight,
            bodyFat: this.bodyFat,
            waistCircumference: this.waistCircumference,
            hipCircumference: this.hipCircumference,
            updateDate: this.updateDate,
        };
    }
}