const checkBtn = document.getElementById("check-btn");
const userInput = document.getElementById("user-input");
const result = document.getElementById("results-div");
const clearBtn = document.getElementById("clear-btn");

const phoneNumberRegex = /^1?\s?(\d{3}|\(\d{3}\))(\s|-)?\d{3}(\s|-)?\d{4}$/i;

clearBtn.addEventListener("click", (e) => {
  result.textContent = "";
  result.className = "hide";
});

checkBtn.addEventListener("click", (e) => {
  if (userInput.value === "") {
    alert("Please provide a phone number")
  } else {
    const originalInput = userInput.value;
    result.textContent = `${phoneNumberRegex.test(originalInput) ? "Valid": "Invalid"} US number: ${originalInput}`;
  }
});
