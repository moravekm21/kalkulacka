"use strict";
 
var input = document.getElementById('input'),
  number = document.querySelectorAll('.numbers div'),
  operator = document.querySelectorAll('.operators div'),
  result = document.getElementById('result'),
  clear = document.getElementById('clear'),
  resultDisplayed = false;
 
var numberStatistics = {
  '0': 0,
  '1': 0,
  '2': 0,
  '3': 0,
  '4': 0,
  '5': 0,
  '6': 0,
  '7': 0,
  '8': 0,
  '9': 0,
  '.': 0
};
 
for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function(e) {
    var clickedNumber = e.target.innerHTML;
    numberStatistics[clickedNumber]++;
    updateStatisticsOnClient();
   
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];
 
    if (resultDisplayed === false) {
      input.innerHTML += clickedNumber;
    } else if (resultDisplayed === true && (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷")) {
      resultDisplayed = false;
      input.innerHTML += clickedNumber;
    } else {
      resultDisplayed = false;
      input.innerHTML = "";
      input.innerHTML += clickedNumber;
    }
  });
}
// Clientside statistics
function updateStatisticsOnClient() {
  var statisticsDisplay = document.getElementById('statistics');
  statisticsDisplay.innerHTML = '';
  Object.keys(numberStatistics).forEach(key => {
    // Skip "C" and "." buttons
    if (key !== 'C' && key !== '.') {
      var span = document.createElement('span');
      span.innerHTML = `${key}: ${numberStatistics[key]}`;
      statisticsDisplay.appendChild(span);
    }
  });
}
 
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function(e) {
 
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];
 
    if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
      input.innerHTML = newString;
    }
    else if (currentString.length == 0) {
      console.log("enter a number first");
    }
    else {
      input.innerHTML += e.target.innerHTML;
    }
 
  });
}
 
result.addEventListener("click", function() {
 
  var inputString = input.innerHTML;
 
  var numbers = inputString.split(/[\+\-\×\÷\^]/g);
 
  var operators = inputString.replace(/[0-9]|\./g, "").split("");
 
  console.log(inputString);
  console.log(operators);
  console.log(numbers);
  console.log("----------------------------");
 
  var divide = operators.indexOf("÷");
  while (divide != -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }
 
  var multiply = operators.indexOf("×");
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }
 
  var subtract = operators.indexOf("-");
  while (subtract != -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }
 
  var add = operators.indexOf("+");
  while (add != -1) {
    numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }
 
  var power = operators.indexOf("^");
  while (power != -1) {
    numbers.splice(power, 2, numbers[power] ** numbers[power + 1]);
    operators.splice(power, 1);
    power = operators.indexOf("^");
  }
 
  var sqrt = operators.indexOf("√");
  while (sqrt != -1) {
    numbers.splice(sqrt, 2, Math.sqrt(parseFloat(numbers[sqrt])));
    operators.splice(sqrt, 1);
    sqrt = operators.indexOf("√");
  }
 
  var reciprocal = operators.indexOf("!");
  while (reciprocal != -1) {
    numbers.splice(reciprocal, 2, 1 / parseFloat(numbers[reciprocal]));
    operators.splice(reciprocal, 1);
    reciprocal = operators.indexOf("!");
  }
 
  input.innerHTML = numbers[0];
  resultDisplayed = true;
});
 
clear.addEventListener("click", function() {
  input.innerHTML = "";
})