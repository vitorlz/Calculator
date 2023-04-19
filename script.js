const operators = document.querySelectorAll('#s');
const display = document.querySelector('.display')
const numbers = document.querySelectorAll('.n');
const equals = document.querySelector('.equal');
const clear = document.querySelector('.clear');
const del = document.querySelector('.delete');
const dot = document.querySelector('.dot');
let n1 = null;
let operator = null;
let n2 = null;
let operating = false;
let equalClick = false;
let operatorClick = false;
let chain = false;
let displayLength = null;
let evKey = null;
let evTargetClass = null;
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
        preventOverflow();
    })
  
})



document.addEventListener('keydown', function(e){

    if(!isNaN(e.key)){
        
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
        
        display.textContent += e.key;
        preventOverflow();
    }

    else if(e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/'){
        evKey = e.key;
        if(chain){
            chainOperationsKeybind();
        }
       
        else {
            singleOperationKeybind();
        }
    }

    else if(e.key === '=' || e.key === 'Enter'){
        e.preventDefault();
        showResultKeybind();
    }
    
    else if(e.key === 'Backspace'){
        deleteNumber();
    }

    else if(e.key === 'Escape' ){
        clearDisplay();
    }

    else if(e.key === '.'){
        displayDecimal();
    }

})


operators.forEach(function(op){
    op.addEventListener('click', function(e){
        evTargetClass = e.target.className;
        
        if(chain){
           chainOperationClick();
        }
        
        else {
           singleOperationClick();
        }
    })
})


equals.addEventListener('click', function(e){
    showResultClick();
})



clear.addEventListener('click', function(e){
    clearDisplay();
})

del.addEventListener('click', function(e){
    deleteNumber();
})

dot.addEventListener('click', function(e){
    displayDecimal();
})

function preventOverflow(){
    displayLength = display.textContent.length;
            
    if(displayLength > 14){
        display.style.fontSize = '32px';
    }
    
    else{
        display.style.fontSize = '42px';
    }
}

function deleteNumber(){
    let numArray = display.textContent.split("");
    numArray.pop();
    display.textContent = numArray.join('');
}

function clearDisplay(){
    display.textContent = null;
    n1 = null
    n2 = null
    operator = null
    operating = false;
    equalClick = false;
    operatorClick = false;
    chain = false;
}

function displayDecimal(){
    if(display.textContent.toString().includes('.')){
        return;
    }
    
    else if(display.textContent.toString().length === 0) {
        display.textContent = "0" + dot.textContent;
    }
    
    else{
        display.textContent = display.textContent + dot.textContent;
    } 
}

function showResultClick(){
    
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
    preventOverflow();
    
    if(operator === "divide" && n2 === 0){
                display.textContent = "ERROR";
    }
    
    n1 = null;
    n2 = null;
    operator = null;
}

function showResultKeybind(){
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
    
    preventOverflow();
    
    if(operator === "/" && n2 === 0){
        display.textContent = "ERROR";
    }
    
    n1 = null;
    n2 = null;
    operator = null;
}

function chainOperationsKeybind(){
    
    n2 = +display.textContent;
    display.textContent = operate(n1, n2, operation[operator]);
    n1 = +display.textContent;
    
    preventOverflow()
    
    if(operator === "/" && n2 === 0){
        display.textContent = "ERROR";
    }
    
    operator = evKey;
    
    chain = false;
    operating = true;
    
}

function singleOperationKeybind(){
    operating = true;
    n1 = +display.textContent;
    operator = evKey;
    operatorClick = true;
}

function chainOperationClick(){
   
    n2 = +display.textContent;
    display.textContent = operate(n1, n2, operation[operator]);
    n1 = +display.textContent;
    
    preventOverflow()
    
    if(operator === "divide" && n2 === 0){
        display.textContent = "ERROR";
    }
    
    operator = evTargetClass;
    
    chain = false;
    operating = true;
   
}

function singleOperationClick(){
    operating = true;
    n1 = +display.textContent;
    operator = evTargetClass;
    operatorClick = true;
}

const operation = {
    '+': add,
    '-': subtract,
    '*': multiply,
    '/': divide,
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
    return op(a, b);
}


