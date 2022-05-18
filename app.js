'use strict';
//targetting all css link elements
const links = document.querySelectorAll("link");
console.log(links);

//target all input/radio button elements
const toggleBtn = document.querySelectorAll("input");

//targeting the screen out put for both current and previous operands
const prevOperandText = document.querySelector("[data-previous-operand]");
const currentOperandText = document.querySelector("[data-current-operand]");

//targeting the calculator buttons
const deleteBtn = document.querySelector("[data-delete]");
const resultBtn = document.querySelector("[data-output]");
const resetBtn = document.querySelector("[data-reset]");
const operands = document.querySelectorAll("[data-num]");
const operatorBtn = document.querySelectorAll("[data-operator]");

//
let prevOperand = prevOperandText.innerText;
let currentOperand = currentOperandText.innerText;
let operation;

//function for theme change
//recall that we had set the value to each of the button/input elements to 0, 1 and 2 respectively
function themeChange(i) {
    if(i === "0"){
        links[0].setAttribute("href", "/design/css/styles.css");
    } else {
        links[0].setAttribute("href", /design/css/theme${i}.css);
    }
}

//calling the theme change function, by using foreach to loop through all three buttons
toggleBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        themeChange(btn.value);
    });
})

//the reset function
function reset() {
    prevOperand = "";    
    currentOperand = "";
    operation = undefined;
}



function deleteOperand() {
    currentOperand = currentOperand.toString().slice(0, -1);
}

function addNumber(number) {
    if(number === "." && currentOperand.includes(".")) return;
    currentOperand = currentOperand.toString() + number.toString();
}

function operationSelection(operate) {
    if(currentOperandText === "") return;
    if(prevOperandText !== "") {
        calculatorOperation();
    }
    operation = operate;
    prevOperand = currentOperand;
    currentOperand = "";
}

function calculatorOperation() {
    let result;
    let prev = parseFloat(prevOperand);
    let current = parseFloat(currentOperand);
    if(isNaN(prev) || isNaN(current)) return;

    switch(operation){
        case "+":
            result = prev + current;
            break;

        case "-":
            result = prev - current 
            break;

        case "×":
            result = prev * current; 
            break; 

        case "/":
            result = prev / current;
            break;

        default: 
            return;
    } 
    currentOperand = result;
    operation = undefined;
    prevOperand = "";
    prevOperandText.innerText = "";
}

function displayNum() {
    currentOperandText.innerText = currentOperand.toLocaleString("en");
    if(operation !== undefined) {
        prevOperandText.innerText = ${prevOperand} ${operation.toString("en")};
    } else {
        prevOperandText.innerText = prevOperand;
    }
}   

resetBtn.addEventListener("click", () => {
    reset();
    displayNum();
});

deleteBtn.addEventListener("click", () => {
    deleteOperand();
    displayNum();
});

operands.forEach(operand => {
    operand.addEventListener("click", () => {
        addNumber(operand.innerText);
        displayNum();
    });
});
    
operatorBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        operationSelection(btn.innerText);
        displayNum();        
    })
})

resultBtn.addEventListener("click", () => {
    calculatorOperation();
    displayNum();
});

// let text = 'hello world';
// console.log(text.slice(0, -1));

// let numba = 123;
// console.log(numba.toString().slice(0, -1));