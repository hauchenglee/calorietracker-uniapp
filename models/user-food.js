import Food from './food';

export default class UserFood {
    constructor(data = {}) {
        // 唯一标识
        this.id = data.id || null;

        // 关联账户
        this.account = data.account || null;

        // 关联食物
        this.food = data.food || null;

        // 使用次数
        this.frequency = data.frequency || 0;

        // 是否为最爱
        this.isFavorite = data.isFavorite || '';
    }

    static fromJson(json = {}) {
        return new UserFood({
            id: json.id,
            account: json.account,
            food: Food.fromJson(json.food),
            frequency: json.frequency,
            isFavorite: json.isFavorite
        });
    }

    toJson() {
        return {
            id: this.id,
            account: this.account,
            food: this.food?.toJson(),
            frequency: this.frequency,
            isFavorite: this.isFavorite
        };
    }
}