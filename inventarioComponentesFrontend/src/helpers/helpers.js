

export function getWeekDay(day) {
    switch (day) {
        case 0: return 'Domingo';
        case 1: return 'Lunes';
        case 2: return 'Martes';
        case 3: return 'Miercoles';
        case 4: return 'Jueves';
        case 5: return 'Viernes';
        case 6: return 'Sábado';
        default: return ''; 
    }
}


export function getWeek(date) {
    let week = [];
    let aux;
    for (let i = -3; i <= 3; i++) {        
        aux = new Date(date);
        aux.setDate(date.getDate() + i);
        week.push(aux);
    }
    return week;
}

export function equalsDates(date1, date2) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}