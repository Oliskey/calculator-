
const numbers = document.querySelectorAll('.numbers');
const result = document.querySelector('.result');
const signs = document.querySelectorAll('.sign');
const clear = document.querySelector('.clear');
const negative = document.querySelector('.negative');
const percent = document.querySelector('.percent');
const equals = document.querySelector('.equals');

let firstValue = "";
let isFirstvalue = false;
let secondValue = "";
let isSecondValue = false;
let sign = "";
let resultValue = 0;

for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', (e) => {
        let atr = e.target.getAttribute('value');
        if (!isFirstvalue) {
            getFirstValue(atr);
        } else {
            getSecondValue(atr);
        }
    });
}

function getFirstValue(el) {
    result.innerHTML = "";
    firstValue += el;
    result.innerHTML = firstValue;
    firstValue = +firstValue;
}

function getSecondValue(el) {
    if (firstValue !== "" && sign !== "") {
        secondValue += el;
        result.innerHTML = secondValue;
        secondValue = +secondValue;
    }
}

function getSign() {
    for (let i = 0; i < signs.length; i++) {
        signs[i].addEventListener('click', (e) => {
            sign = e.target.getAttribute('value');
            isFirstvalue = true;
        });
    }
}
getSign();

function checkResultLength() {
    resultValue = JSON.stringify(resultValue);
    if (resultValue.length >= 8) {
        resultValue = JSON.parse(resultValue);
        result.innerHTML = resultValue.toFixed(5);
    }
}

clear.addEventListener('click', () => {
    result.innerHTML = 0;
    firstValue = "";
    isFirstValue = false;  // Corrected here
    secondValue = "";
    isSecondValue = false;  // Corrected here
    sign = "";
    resultValue = 0;
});


negative.addEventListener('click', () => {
    result.innerHTML = "";
    if (firstValue !== "") {
        resultValue = -firstValue;
        firstValue = resultValue;
    }
    if (firstValue !== "" && secondValue !== "" && sign) {
        resultValue = -resultValue;
    }
    result.innerHTML = resultValue;
});

percent.addEventListener('click', () => {
    result.innerHTML = "";
    if (firstValue !== "") {
        resultValue = firstValue / 100;
        firstValue = resultValue;
    }
    if (firstValue !== "" && secondValue !== "" && sign) {
        resultValue = resultValue / 100;
    }
    result.innerHTML = resultValue;
});

equals.addEventListener('click', () => {
    result.innerHTML = " ";
    if (firstValue !== "" && secondValue !== "" && sign) {
        if (sign === "+") {
            resultValue = firstValue + secondValue;
        } else if (sign === "-") {
            resultValue = firstValue - secondValue;
        } else if (sign === "x") {
            resultValue = firstValue * secondValue;
        } else if (sign === "/" && secondValue !== 0) {  // Added check for division by zero
            resultValue = firstValue / secondValue;
        } else if (firstValue !== "") {
            if (secondValue === "") {
                resultValue = firstValue;
                resultValue = "";  // This line seems redundant
            }
        } else {
            resultValue = 0;
        }

        result.innerHTML = resultValue;
        firstValue = resultValue;
        secondValue = "";
        sign = "";
        isFirstValue = false;
    }
});
