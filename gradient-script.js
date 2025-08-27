const gradientCodeSpan = document.getElementById('gradient-code');
const generateGradientBtn = document.getElementById('generate-gradient-btn');
const copyGradientBtn = document.getElementById('copy-gradient-btn');
const body = document.body;
const copyMessage = document.getElementById('copy-message');
const gradientHeading = document.querySelector('h1');

function generateRandomHexColor() {
    const symbols = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * symbols.length);
        color += symbols[randomIndex];
    }
    return color;
}

function generateRandomDegree() {
    return Math.floor(Math.random() * 360);
}

function getBrightness(hexColor) {
    const hex = hexColor.startsWith('#') ? hexColor.substring(1) : hexColor;
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness;
}

function updateGradient() {
    const color1 = generateRandomHexColor();
    const color2 = generateRandomHexColor();
    const degree = generateRandomDegree();
    const newGradient = `linear-gradient(${degree}deg, ${color1}, ${color2})`;

    gradientCodeSpan.textContent = newGradient;
    body.style.backgroundImage = newGradient;

    const brightness1 = getBrightness(color1);
    const brightness2 = getBrightness(color2);
    const averageBrightness = (brightness1 + brightness2) / 2;

    if (averageBrightness < 128) {
        gradientHeading.style.color = '#fff';
    } else {
        gradientHeading.style.color = '#333';
    }
}

function copyGradientToClipboard() {
    const textToCopy = gradientCodeSpan.textContent;
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

generateGradientBtn.addEventListener('click', updateGradient);
copyGradientBtn.addEventListener('click', copyGradientToClipboard);

updateGradient();