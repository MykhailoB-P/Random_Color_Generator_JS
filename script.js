const colorCodeSpan = document.getElementById('color-code');
const changeColorBtn = document.getElementById('change-color-btn');
const body = document.body;

const colorInput = document.getElementById('color-input');
const applyColorBtn = document.getElementById('apply-color-btn');
const copyBtn = document.getElementById('copy-btn');
const copyMessage = document.getElementById('copy-message');

const colorHeading = document.querySelector('h1');

function generateRandomHexColor() {
    const symbols = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * symbols.length);
        color += symbols[randomIndex];
    }

    return color;
}

function getBrightness(hexColor) {
    const hex = hexColor.startsWith('#') ? hexColor.substring(1) : hexColor;

    const r = parseInt(hex.substring(0, 2), 16); // red component
    const g = parseInt(hex.substring(2, 4), 16); // green component
    const b = parseInt(hex.substring(4, 6), 16); // blue component

    const brightness = (r * 299 + g * 587 + b * 114) / 1000; // average brightness

    return brightness;
}

function updateColor() {
    const newColor = generateRandomHexColor();
    colorCodeSpan.textContent = newColor;
    body.style.backgroundColor = newColor;

    const brightness = getBrightness(newColor);

    // take a half between 0 and 255 = 128
    if (brightness < 128) {
        colorHeading.style.color = '#fff'; // text color becoming white
    } else {
        colorHeading.style.color = '#333'; // text color becoming black
    }
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

        const brightness = getBrightness(newColor);
        if (brightness < 128) {
            colorHeading.style.color = '#fff';
        } else {
            colorHeading.style.color = '#333'; 
        }
    } else {
        alert('Please enter a valid HEX color code, e.g., #FF5733');
    }
}

changeColorBtn.addEventListener('click', updateColor);
copyBtn.addEventListener('click', copyColorToClipboard);
applyColorBtn.addEventListener('click', applyManualColor);

updateColor();