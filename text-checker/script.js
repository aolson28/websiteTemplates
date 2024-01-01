const textInputElement = document.getElementById("text-input");

const checkBtnElement = document.getElementById("check-btn");

const resultElement = document.getElementById("result");

const palindromeReplace = /[^a-z0-9]/g;

const checkText = (input)=> {
  if(input === '') {
    alert("Please input a value")
  } else {
    const submittedInput = input;
    input.toLowerCase().replace(plaindromeReplace, '');
    const result;
    if (input === input.reverse()) {
      result = "";
    } else {
      result = " not";
    }
    resultElement.innerHTML = `${submittedInput} is${result} a palindrome`;
    resultElement.classList.remove("hide");
    textInputElement.innerHTML ="";
  }
}

checkBtnElement.addEventListener("click",() => {
  checkText(textInputElement.value);
});
