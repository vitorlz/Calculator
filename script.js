const operators = document.querySelectorAll('.symbols');
const display = document.querySelector('.display')
const numbers = document.querySelectorAll('.n');
const equals = document.querySelector('.equal');
const clear = document.querySelector('.clear');
const del = document.querySelector('.delete');
let n1 = null;
let operator = null;
let n2 = null;
let result = null;
let operating = false;
let equalClick = false;
let operatorClick = false;
let chain = false;
display.textContent = null;


numbers.forEach(function(number){
    number.addEventListener('click', function(e){
        if (operating){
            display.textContent = null;
            operating = false;
            chain = true;
            equalClick = false;
        }
        else if (equalClick){
            display.textContent = null;
            operating = false;
            equalClick = false;
        }
        display.textContent += number.textContent;
    })
        
})

operators.forEach(function(op){
    op.addEventListener('click', function(e){
        if(chain){
            operator = e.target.className;
            n2 = +display.textContent;
            display.textContent = operate(n1, n2, operation[operator]);
            n1 = +display.textContent;
            chain = false;
            operating = true;
        }
        else {
            operating = true;
            n1 = +display.textContent;
            operator = e.target.className;
            operatorClick = true;
        }
        
    })
})

equals.addEventListener('click', function(e){
    if(equalClick || !operatorClick){
        return;
    }
    operatorClick = false;
    chain = false;
    equalClick = true;
    operating = false;
    n2 = +display.textContent;
    result = operate(n1, n2, operation[operator]);
    display.textContent = operate(n1, n2, operation[operator]);
    n1 = null;
    n2 = null;
    operator = null;
   
})

clear.addEventListener('click', function(e){
    display.textContent = null;
    n1 = null
    n2 = null
    operator = null

})

del.addEventListener('click', function(e){
    let numArray = display.textContent.split("");
    numArray.pop();
    display.textContent = numArray.join('');
})

const operation = {
    add: add,
    subtract: subtract,
    multiply: multiply,
    divide: divide,
}

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function operate(a, b, op){
    return op(a, b)
}

// add decimals, prevent numbers from leaving display. 





