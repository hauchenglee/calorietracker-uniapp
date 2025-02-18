export default class SearchVo {
    constructor(data = {}) {
        // 搜索文本
        this.text = data.text || '';

        // 页码（从 0 开始）
        this.page = data.page || 0;

        // 每页大小
        this.size = data.size || 10;

        // 日期
        this.date = data.date || null;

        // 开始日期
        this.startDate = data.startDate || null;

        // 结束日期
        this.endDate = data.endDate || null;
    }

    static fromJson(json = {}) {
        return new SearchVo({
            text: json.text,
            page: json.page,
            size: json.size,
            date: json.date,
            startDate: json.startDate,
            endDate: json.endDate
        });
    }

    toJson() {
        return {
            text: this.text,
            page: this.page,
            size: this.size,
            date: this.date,
            startDate: this.startDate,
            endDate: this.endDate
        };
    }
}