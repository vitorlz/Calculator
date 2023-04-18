const operators = document.querySelectorAll('.symbols');
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

operators.forEach(function(op){
    op.addEventListener('click', function(e){
        if(chain){
            n2 = +display.textContent;
            display.textContent = operate(n1, n2, operation[operator]);
            n1 = +display.textContent;
            
            
            preventOverflow()
           
            if(operator === "divide" && n2 === 0){
                display.textContent = "ERROR";
            }
            
            operator = e.target.className;
            
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
    preventOverflow();
    if(operator === "divide" && n2 === 0){
                display.textContent = "ERROR";
    }
    n1 = null;
    n2 = null;
    operator = null;
   
})

clear.addEventListener('click', function(e){
    display.textContent = null;
    n1 = null
    n2 = null
    operator = null
    operating = false;
    equalClick = false;
    operatorClick = false;
    chain = false;

})

del.addEventListener('click', function(e){
    let numArray = display.textContent.split("");
    numArray.pop();
    display.textContent = numArray.join('');
})

dot.addEventListener('click', function(e){
    if(display.textContent.toString().includes('.')){
        return;
    }
    else if(display.textContent.toString().length === 0) {
        display.textContent = "0" + dot.textContent;
    }
    else{
        display.textContent = display.textContent + dot.textContent;
    } 
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



/*if(displayLength > 14 && includes){
    displayArray = display.textContent.split("");
    displayArray.splice(displayLength - 1, 0, ".");
    decimalN = +displayArray.join("");
    console.log(Math.round(decimalN));
} */

