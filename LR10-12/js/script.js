function formula(a = 1, b = 1, c = 1) {

    try {
        if (a == 4) throw new Error("Деление на ноль: a - 4 == 0");
        if (c + Math.PI < 0) throw new Error("Попытка взять корень из отрицательного числа");
    
        return (b**2 - Math.PI) / Math.abs(a - 4) + 7 * Math.sqrt(c + Math.PI);
    
    } catch (error) {
        alert(error.name + ": " + error.message);
    }

}