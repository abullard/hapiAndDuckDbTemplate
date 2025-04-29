export const formatDuckDbDate = (date: Date) => {
    const yyyy = date.getFullYear();
    let mm: string | number = date.getMonth() + 1;
    let dd: string | number = date.getDate();

    if (mm < 10) {
        mm = `0${mm}`;
    }
    
    if (dd < 10) {
        dd = `0${dd}`;
    }

    return `${yyyy}-${mm}-${dd}`
};