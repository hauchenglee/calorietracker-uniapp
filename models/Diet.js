export class Diet {
    constructor(data = {}) {
        this.id = data.id || null;
        this.meal = data.meal || '';
        this.name = data.name || '';
        this.brand = data.brand || '';
        this.barcode = data.barcode || '';
        this.quantity = parseFloat(data.quantity) || 0;
        this.unit = data.unit || '';
        this.calorie = parseFloat(data.calorie) || 0;
        this.carbohydrate = parseFloat(data.carbohydrate) || 0;
        this.sugar = parseFloat(data.sugar) || 0;
        this.fiber = parseFloat(data.fiber) || 0;
        this.protein = parseFloat(data.protein) || 0;
        this.fat = parseFloat(data.fat) || 0;
    }
}