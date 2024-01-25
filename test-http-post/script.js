const workOrderElement = document.getElementById("text-input-workOrder");

const checkBtnElement = document.getElementById("check-btn");

const resultElement = document.getElementById("result");

const warningElement = document.getElementById("barcode-warning");

const lotId = document.getElementById("lotId");

const splitId = document.getElementById("splitId");

const subId = document.getElementById("subId");

const opNumber = document.getElementById("opNumber");

const pieceNumber = document.getElementById("pieceNumber");

const barcodeRegex = /^%\d\dW\d{6}(\$\d+){2,5}%$/i;

const materialRequiredBarcodeRegex = /^%\d\dW\d{6}(\$\d+){5}%$/i;

const headerBarcodeRegex = /^%\d\dW\d{6}(\$\d+){3}%$/i;

const operationBarcodeRegex = /^%\d\dW\d{6}(\$\d+){4}%$/i;

const workOrderRegex = /^\dW\d{6}$/i;

const powerAutomateBody = {};

const isValidBarcode = (string) => {
	return barcodeRegex.test(string);
};

const isValidWorkOrder = (string) => {
	return workOrderRegex.test(string);
};

const handleBarcode = (string) => {
	if (isValidBarcode(string)) {
		const barcodeData = string.replaceAll("%", "").substring(1, ).split("$");
		powerAutomateBody.workOrder = barcodeData[0];
		powerAutomateBody.lot = barcodeData[1];
		powerAutomateBody.split = barcodeData[2];
		powerAutomateBody.sub = barcodeData[3];
		powerAutomateBody.operation = barcodeData[4];
		powerAutomateBody.pieceNumber = barcodeData[5];
		switch (barcodeData.length) {
			case 3:
				workOrderElement.value = powerAutomateBody.workOrder;
				lotId.value = powerAutomateBody.lot;
				splitId.value = powerAutomateBody.split;
				subId.focus();
				break;
			case 4:
				workOrderElement.value = powerAutomateBody.workOrder;
				lotId.value = powerAutomateBody.lot;
				splitId.value = powerAutomateBody.split;
				subId.value = powerAutomateBody.sub;
				opNumber.focus();
				break;
			case 5:
				workOrderElement.value = powerAutomateBody.workOrder;
				lotId.value = powerAutomateBody.lot;
				splitId.value = powerAutomateBody.split;
				subId.value = powerAutomateBody.sub;
				opNumber.value = powerAutomateBody.operation;
				pieceNumber.focus();
				break;
			case 6:
				workOrderElement.value = powerAutomateBody.workOrder;
				lotId.value = powerAutomateBody.lot;
				splitId.value = powerAutomateBody.split;
				subId.value = powerAutomateBody.sub;
				opNumber.value = powerAutomateBody.operation;
				pieceNumber.value = powerAutomateBody.pieceNumber;
				break;
		}
	}
};

const queryPowerAutomate = () => {
	fetch("https://prod-07.westus.logic.azure.com:443/workflows/1bf63e39486b473db81f974e10b253a6/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=gjdglCV4l06W2fQAOTtXbSb1lSPOlfyU91FpXF-bGfY", {
			method: "POST",
			body: JSON.stringify(powerAutomateBody),
			headers: {
				"Content-type": "application/json"
			}
		})
		.then((response) => response.json())
		.then((json) => {
			console.log(json);
			renderResult(`
	  <p><strong>Required Part:</strong> ${json.RequiredPart}</p>
	  `)
		});
};

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

/*
workOrderElement.addEventListener("input", (event) => {
  if (!workOrderElement.validity.valid && workOrderElement.value != "") {
	renderWarning("Material Requirement Barcode format: %21W123456$1$0$0$10$10%");
  } else {
		warningElement.className = "warning hide";
	}
});
*/

checkBtnElement.addEventListener("click", (e) => {
	e.preventDefault();
	handleBarcode(workOrderElement.value);
});

workOrderElement.addEventListener('keydown', (event) => {
	if (event.keyCode == 9 && isValidBarcode(workOrderElement.value)) {
		event.preventDefault();
		handleBarcode(workOrderElement.value);
		queryPowerAutomate();
	}
});

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
