//get elements and save to variables
const convertBtn = document.getElementById("convert-btn");
const numberElm = document.getElementById("number");
const outputElm = document.getElementById("output");



//validate the input as number
const isValidNumber = () => {
  return numberElm.value && numberElm.value >= 1 && numberElm.value < 4000;
};

//convert number input to Roman Numerals
const convertToRomanNumerals = (num) => {
  const dict = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1]
  ];
  const result = [];
  
  for (let i = 0; i < dict.length; i++) {    
      if ((num / dict[i][1]) >= 1) {
      result.push(dict[i][0].repeat(Math.floor(num / dict[i][1])));
      num -= Math.floor(num / dict[i][1]) * dict[i][1];
      }
  }
  renderResult(result.join(''));
};

//When number valid, render the result to the document
const renderResult = (text) => {
  outputElm.innerHTML = text;
  outputElm.classList.toggle("hide");
};

//When number invalid, render the alert
const renderAlert = () => {
  if (numberElm.value === "") {
    renderResult("Please enter a valid number");
  } else if (parseInt(numberElm.value) >= 4000) {
    renderResult("Please enter a number less than or equal to 3999");
  } else if (parseInt(numberElm.value) < 1) {
    renderResult("Please enter a number greater than or equal to 1");
  }
};

/* Clear the input of the form and after delay
and then clear the result or alert */
const clearForm = () => {

};


//Event Listener 
convertBtn.addEventListener("click", () => {
  if (isValidNumber()) {
    convertToRomanNumerals(parseInt(numberElm.value));
  } else {
    renderAlert();
  }
});
