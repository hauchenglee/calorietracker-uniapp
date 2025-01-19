export class DietSummary {
    constructor(data = {}) {
        this.id = data.id || null;
        this.calorieTotal = parseFloat(data.calorieTotal) || 0;
        this.calorieIntake = parseFloat(data.calorieIntake) || 0;
        this.calorieConsume = parseFloat(data.calorieConsume) || 0;
        this.calorieRemain = parseFloat(data.calorieRemain) || 0;
        this.caloriePercent = parseFloat(data.caloriePercent) || 0;

        this.carbohydrateTotal = parseFloat(data.carbohydrateTotal) || 0;
        this.carbohydrateIntake = parseFloat(data.carbohydrateIntake) || 0;
        this.carbohydrateRemain = parseFloat(data.carbohydrateRemain) || 0;
        this.carbohydratePercent = parseFloat(data.carbohydratePercent) || 0;

        this.proteinTotal = parseFloat(data.proteinTotal) || 0;
        this.proteinIntake = parseFloat(data.proteinIntake) || 0;
        this.proteinRemain = parseFloat(data.proteinRemain) || 0;
        this.proteinPercent = parseFloat(data.proteinPercent) || 0;

        this.fatTotal = parseFloat(data.fatTotal) || 0;
        this.fatIntake = parseFloat(data.fatIntake) || 0;
        this.fatRemain = parseFloat(data.fatRemain) || 0;
        this.fatPercent = parseFloat(data.fatPercent) || 0;
    }
}