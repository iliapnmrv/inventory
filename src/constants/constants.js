export const SESSIONS_INFO = {
    true: {
        info: "Сессия открыта",
        button: "Закрыть сессию",
    },
    false: {
        info: "Сессия закрыта",
        button: "Открыть сессию",
    }
}

export const SCAN_STATUS_COLOR = {
    modal: {
        "В учете": "lightGreen",
        "Позиция не в учете": "lightYellow",
        "Позиция сверх учета": "lightBlue",
        "Повторное считывание": "lightRed",
    },
    text: {
        "В учете": "green",
        "Позиция не в учете": "yellow",
        "Позиция сверх учета": "blue",
        "Повторное считывание": "red",
    }
}

export const LOGS_CATALOG = {
    qr: "QR",
    name: "Наименование по бухучету",
    sredstvo: "Средство",
    type: "Тип устройства",
    month: "Месяц ввода",
    year: "Год ввода",
    model: "Модель реальная",
    sernom: "Серийный номер",
    person: "МОЛ",
    owner: "Владелец",
    storage: "Местоположение",
    status: "Статус",
    info: "Примечания",
    addinfo: "Дополнительная информация",
}

// Сегодняшняя дата
let date = new Date();
let dd = String(date.getDate()).padStart(2, "0");
let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
let yyyy = date.getFullYear();

export const today = `${dd}.${mm}.${yyyy}`