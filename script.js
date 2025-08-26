const colorCodeSpan = document.getElementById('color-code');
const changeColorBtn = document.getElementById('change-color-btn');
const body = document.body;

const colorInput = document.getElementById('color-input');
const applyColorBtn = document.getElementById('apply-color-btn');
const copyBtn = document.getElementById('copy-btn');
const copyMessage = document.getElementById('copy-message');

function generateRandomHexColor() {
    const symbols = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * symbols.length);
        color += symbols[randomIndex];
    }

    return color;
}

function updateColor() {
    const newColor = generateRandomHexColor();
    colorCodeSpan.textContent = newColor;
    body.style.backgroundColor = newColor;
}

function copyColorToClipboard() {
    const textToCopy = colorCodeSpan.textContent;
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            copyMessage.classList.remove('hidden');
            copyMessage.classList.add('visible');
            
            setTimeout(() => {
                copyMessage.classList.remove('visible');
                copyMessage.classList.add('hidden');
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
        });
}

function applyManualColor() {
    const newColor = colorInput.value;

    if (newColor.startsWith('#') && newColor.length === 7) {
        colorCodeSpan.textContent = newColor;
        body.style.backgroundColor = newColor;
    } else {
        alert('Please enter a valid HEX color code, e.g., #FF5733');
    }
}

changeColorBtn.addEventListener('click', updateColor);
copyBtn.addEventListener('click', copyColorToClipboard);
applyColorBtn.addEventListener('click', applyManualColor);