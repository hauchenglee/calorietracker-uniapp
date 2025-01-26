// utils/dateFormatter.js
export const dateFormatter = {
    // 将 yyyy/mm/dd 转换为 yyyy-mm-dd
    formatToHyphen(dateStr) {
        if (!dateStr) return '';
        return dateStr.replace(/\//g, '-');
    },

    // 将 yyyy-mm-dd 转换为 yyyy/mm/dd
    formatToSlash(dateStr) {
        if (!dateStr) return '';
        return dateStr.replace(/-/g, '/');
    },

    // 获取当前日期，格式为 YYYY-MM-DD
    getCurrentDate(date = new Date()) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
};