let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

const currencyAmounts = [
  ["ONE HUNDRED", 100],
  ["TWENTY", 20],
  ["TEN", 10],
  ["FIVE", 5],
  ["ONE", 1],
  ["QUARTER", 0.25],
  ["DIME", 0.1],
  ["NICKEL", 0.05],
  ["PENNY", 0.01]
];

let cash;

const submitButton = document.getElementById("purchase-btn");

const cashInput = document.getElementById("cash");

const priceText = document.getElementById("price-due");

const changeDueText = document.getElementById("change-due");

const changeDueDiv = document.getElementById("changedue");

const precision = (v) => v % 1 ? v.toString().split(".")[1].length : 0;

const currencyPrecision = (num) => {
  if (num.toString().includes(".")) {
    return num.toString().split(".")[1].length == 1 ? parseFloat(num).toFixed(1): parseFloat(num).toFixed(2);
  } else {
    return Number(num);
  }
};

let sum = 0;

const sumCID = () => {
  for (let i in cid) {
    sum += parseFloat(cid[i][1]);
  };
  return currencyPrecision(sum);
};

var totalCash;

var cashRemaining;


var changeAccumulate = 0;

var changeDueRemaining;

var changeStringArray = [];

var transactionStatus = ""

const calculateChange = () => {  
  sum = 0;
  totalCash = sumCID();
  cashRemaining = totalCash;
  changeStringArray = [];
  transactionStatus = "";
  changeDueRemaining = cashInput.value - price;
  const originalChangeDue = changeDueRemaining;  
let modCID = [...cid].reverse();
  for (let e in modCID) {
      var currentRemaining = modCID[e][1];
      var amountApplied = 0;
    while((currencyPrecision(currentRemaining) > 0) && (currencyAmounts[e][1] <= changeDueRemaining)) {
      changeDueRemaining = parseFloat((changeDueRemaining -= currencyAmounts[e][1]).toFixed(2));
      amountApplied = parseFloat((amountApplied += currencyAmounts[e][1]).toFixed(2));
      currentRemaining = parseFloat((currentRemaining -= currencyAmounts[e][1]).toFixed(2));      
      cashRemaining = parseFloat((cashRemaining -= currencyAmounts[e][1]).toFixed(2));
    }
    if (amountApplied) {
      changeStringArray.push(`${modCID[e][0]}: \$${currencyPrecision(amountApplied)}`);
    }
  }
      console.log(changeDueRemaining, changeStringArray, cashRemaining);
      if (currencyPrecision(changeDueRemaining) > 0) {
    transactionStatus = "INSUFFICIENT_FUNDS";
    changeStringArray = [];
    console.log(changeDueRemaining, transactionStatus);    
    changeDueText.innerHTML = `Status: ${transactionStatus}${changeStringArray.length > 0 ? changeStringArray.join(" "): ""}`;
    changeDueDiv.className = "";
    return;
  } else if (currencyPrecision(cashRemaining) > 0) {
    transactionStatus = "OPEN "
    console.log(changeDueRemaining, transactionStatus);    
    changeDueText.innerHTML = `Status: ${transactionStatus}${changeStringArray.length > 0 ? changeStringArray.join(" "): ""}`;
    changeDueDiv.className = "";
    return;
  }  else {
    transactionStatus = "CLOSED ";
    console.log(changeDueRemaining, transactionStatus);    
    changeDueText.innerHTML = `Status: ${transactionStatus}${changeStringArray.length > 0 ? changeStringArray.join(" "): ""}`;
    changeDueDiv.className = "";
    return;
  }   
      console.log(changeDueRemaining, transactionStatus);
};

submitButton.addEventListener("click", () => {
  cash = cashInput.value;
  console.log(`cash: ${cash}, price: ${price}`);
  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (cash == price) {
    changeDueText.innerHTML = `No change due - customer paid with exact cash`;
    changeDueDiv.className = "";
  } else {
    calculateChange();
  }
});

addEventListener("DOMContentLoaded", (event) => {
  priceText.innerHTML = `\$${currencyPrecision(price)}`;
});