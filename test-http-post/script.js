const textInputBarcodeElement = document.getElementById("text-input-barcode");

const checkBtnElement = document.getElementById("check-btn");

const resultElement = document.getElementById("result");

const warningElement = document.getElementById("barcode-warning");

const workOrderRegex = /^%\d\dW\d{6}(\$\d+){5}%$/;
const powerAutomateBody = {
};

const isValidBarcode = (string) => {	
	return workOrderRegex.test(string);
}

const handleBarcode = (string) => {
	if (isValidBarcode(string)) {
		const workOrderRegex = /^%\d\dW\d{6}(\$\d+){5}%$/;
		const barcodeData = string.replaceAll("%","").substring(1,).split("$");
		powerAutomateBody.workOrder = barcodeData[0];
		powerAutomateBody.lot = barcodeData[1];
		powerAutomateBody.split = barcodeData[2];
		powerAutomateBody.sub = barcodeData[3];
		powerAutomateBody.operation = barcodeData[4];
		powerAutomateBody.pieceNumber = barcodeData[5];
		renderResult("Success");
	} else {
		renderWarning("Enter a valid barcode.");
	}
}

/*

textInputBarcodeElement.addEventListener("input", (event) => {
  if (!isValidBarcode(textInputBarcodeElement.value)) {
	renderWarning("Please Enter a valid Material Requirement Barcode");
  }
});

/^(%\d\dW\d{6}(\$\d+){2,5}%|\dW\d{6}(\/\d+){1,5})$/
*/

const renderResult = (text) => {
  resultElement.innerHTML = text;
  resultElement.classList.toggle("hide");
  setTimeout(clearResult, 10000);
};

const renderWarning = (text) => {
  warningElement.innerHTML = text;
  warningElement.className = "warning";
};

const clearResult = () => {
  resultElement.innerHTML = "";
  resultElement.classList.toggle("hide");
}

textInputBarcodeElement.addEventListener("input", (event) => {
  if (!textInputBarcodeElement.validity.valid && textInputBarcodeElement.value != "") {
	renderWarning("Material Requirement Barcode format: %21W123456$1$0$0$10$10%");
  } else {
		warningElement.className = "warning hide";
	}
});

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
