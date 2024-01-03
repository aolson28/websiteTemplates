//get elements and save to variables
const convertBtn = document.getElementById("convert-btn");
const numberElm = document.getElementById("number");
const outputElm = document.getElementById("output");

//validate the input as number
const isValidNumber = () => {

};

//convert number input to Roman Numerals
const convertToRomanNumerals = () => {

};

//When number valid, render the result to the document
const renderResult = () => {

};

//When number invalid, render the alert
const renderAlert = () => {

};

/* Clear the input of the form and after delay
and then clear the result or alert */
const clearForm = () => {

};


//Event Listener 
convertBtn.addEventListener("click", () => {
  if (isValidNumber()) {
    convertToRomanNumerals();
    renderResult();
    clearForm();
  } else {
    renderAlert();
    clearForm();
  }
});
