const textInputBarcodeElement = document.getElementById("text-input-barcode");

const checkBtnElement = document.getElementById("check-btn");

const resultElement = document.getElementById("result");

const warningElement = document.getElementById("warning");

const powerAutomateBody = {
	"id":""
};

const isValidBarcode = (string) => {
	const workOrderRegex = /^(%\d\dW\d{6}(\$\d+){2,5}%|\dW\d{6}(\/\d+){1,5})$/;
	return workOrderRegex.test(string);
}

const handleBarcode = (string) => {
	if (isValidBarcode(string)) {
		renderResult(isValidBarcode(string));
	} else {
		renderResult(isValidBarcode(string));
	}
}

const renderResult = (text) => {
  resultElement.innerHTML = text;
  resultElement.classList.toggle("hide");
  setTimeout(clearResult, 5000);
};

const renderWarning = (text) => {
  warningElement.innerHTML = text;
  warningElement.classList.toggle("hide");
};

const clearResult = () => {
  resultElement.innerHTML = "";
  resultElement.classList.toggle("hide");
}

checkBtnElement.addEventListener("click",(e) => {
  e.preventDefault();
  handleBarcode(textInputBarcodeElement.value);
}
);

/*
const machineMetricsAPIPost = () => {
  fetch("https://api.machinemetrics.com/reports/production", {
  method: "POST",
  body: JSON.stringify({
  "start": "2023-08-01T05:00:00Z",
  "end": "2023-12-21T05:00:00Z",
  "data": [
    {
      "metric": "allTime"
    },
    {
      "metric": "partsGoal"
    },
    {
      "metric": "totalParts"
    },
    {
      "metric": "oee"
    }
  ],
  "groupBy": [
    {
      "group": "jobOperation"
    },
    {
      "group": "hour"
    },
    {
      "group": "machine"
    }
  ],
  "csv": false,
  "flatten": true
}),
  headers: {
    "Content-type": "application/json",
    "Authorization": "Bearer token"
  }
})
  .then((response) => response.json())
  .then((json) => console.log(json));
}

checkBtnElement.addEventListener("click",machineMetricsAPIPost());
*/
