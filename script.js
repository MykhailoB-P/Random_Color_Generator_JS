// Находим наши HTML-элементы по их уникальным ID и "запоминаем" их в переменных.
// const - это способ сказать: "эта переменная меняться не будет".
const colorCodeSpan = document.getElementById('color-code');
const changeColorBtn = document.getElementById('change-color-btn');
const body = document.body; // Тег <body> можно получить так

// --- Главная функция, которая будет генерировать случайный цвет ---
function generateRandomHexColor() {
    const symbols = '0123456789ABCDEF'; // Все возможные символы для HEX-цвета
    let color = '#'; // HEX-цвет всегда начинается с решетки

    // Нам нужно 6 случайных символов. Этот цикл повторится 6 раз.
    for (let i = 0; i < 6; i++) {
        // Выбираем случайный символ из строки 'symbols'
        // Math.random() дает случайное число от 0 до 1 (например, 0.453)
        // Умножаем на 16 (длина 'symbols'), чтобы получить число от 0 до 15.99...
        // Math.floor() округляет это число вниз до целого (например, 15)
        const randomIndex = Math.floor(Math.random() * symbols.length);
        
        // Добавляем случайный символ к нашему цвету
        color += symbols[randomIndex];
    }

    return color; // Возвращаем готовый цвет, например, '#A4F2C1'
}

// --- Функция, которая будет все обновлять на странице ---
function updateColor() {
    // 1. Получаем новый случайный цвет, вызывая нашу функцию
    const newColor = generateRandomHexColor();
    
    // 2. Меняем текст внутри <span> на новый код цвета
    colorCodeSpan.textContent = newColor;
    
    // 3. Меняем цвет фона всей страницы
    body.style.backgroundColor = newColor;
}

// --- Вешаем "прослушку" на кнопку ---
// addEventListener - это как дать команду: "Эй, кнопка, когда по тебе кликнут (событие 'click'),
// выполни, пожалуйста, вот эту функцию (updateColor)".
changeColorBtn.addEventListener('click', updateColor);