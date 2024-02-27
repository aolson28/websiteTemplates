const sharePointListItemContainer = document.getElementById("sharepoint-list-container");

const typeChoiceElement = document.getElementById("choice-input-Type");

const workOrderElement = document.getElementById("text-input-workOrder");

const workOrderInfoWrapper = document.getElementById("work-order-info-wrapper");

const checkBtnElement = document.getElementById("check-btn");

const resultElement = document.getElementById("result");

const warningElement = document.getElementById("barcode-warning");

const lotId = document.getElementById("lotId");

const splitId = document.getElementById("splitId");

const subId = document.getElementById("subId");

const opNumber = document.getElementById("opNumber");

const pieceNumber = document.getElementById("pieceNumber");

const finishedPart = document.getElementById("text-input-finishedPart");

const reqMaterial = document.getElementById("text-input-reqMaterial");

const opQty = document.getElementById("opQty");

const issuedQty = document.getElementById("issuedQty");

const requestQty = document.getElementById("requestQty");

const barcodeRegex = /^%\d\dW\d{6}(\$\d+){2,5}%$/i;

const materialRequiredBarcodeRegex = /^%\d\dW\d{6}(\$\d+){5}%$/i;

const headerBarcodeRegex = /^%\d\dW\d{6}(\$\d+){3}%$/i;

const operationBarcodeRegex = /^%\d\dW\d{6}(\$\d+){4}%$/i;

const workOrderRegex = /^\dW\d{6}$/i;

const listItemsArray = [
	{
		sharePointId: 12,
		title: "test-title-1",
    itemStatus: "New",
    handlingEquipment: "Standard",
		partId: "2SCHAL-TEST-123456-123",
		qty: 123,
		dropOffLoc: "A7",
		requestTime: "12:34 AM 2/26/2024",
		comments: "This is a test comment 1"
	},
	{
		sharePointId: 24,
		title: "test-title-2",
    itemStatus: "New",
    handlingEquipment: "Standard",
		partId: "2SCHAL-TEST-123456-456",
		qty: 321,
		dropOffLoc: "B10",
		requestTime: "12:34 AM 2/26/2024",
		comments: "This is a test comment 2"
	},
	{
		sharePointId: 36,
		title: "test-title-3",
    itemStatus: "New",
    handlingEquipment: "Standard",
		partId: "2SCHAL-TEST-123456-789",
		qty: 456,
		dropOffLoc: "CUTSTAGE IN",
		requestTime: "12:34 AM 2/26/2024",
		comments: "This is a test comment 3"
	}
];

const renderSharePointList = () => {
  sharePointListItemContainer.innerHTML = listItemsArray.map(item => {
    const {sharePointId, title, itemStatus, handlingEquipment, partId, qty, dropOffLoc, requestTime, comments} = item;
    return `<div id="request-${sharePointId}" class="request-item">
          <div class="listItemRow">
            <p class="bold no-margin">${partId}</p>          
            <p class="bold no-margin">${itemStatus}</p>
            <p class="bold no-margin">${handlingEquipment}</p>
          </div>
          <div class="listItemRow">
            <div class="block no-margin">
              <p>Qty:</p><span class="bold">${qty}</span>
            </div>
            <div class="block no-margin">
              <p>Drop-off Location:</p><span class="bold">${dropOffLoc}</span>
            </div>
            <div class="block no-margin">
              <p>Request Time:</p><span class="bold">${requestTime}</span>
            </div>
          </div>
          <div class="listItemRow">
            <div class="block no-margin">
              <p class="bold">Comments:</p>
              <p>${comments}</p>
            </div>
          </div>
          <div class="listItemRow">
            <button class="complete-btn">Complete</button>
            <button class="cancel-btn">Cancel</button>
            <button class="equipment-btn">Equipment</button>
          </div>
          <div class="listItemRow">
            <button class="claim-btn">Claim</button>
            <button class="incorrect-btn">Incorrect</button>
            <button class="investigate-btn">Investigate</button>
          </div>
        </div>`;
  }).join("")
};

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
				requestQty.focus();
				break;
		}
	}
};

const precision = (v) => v % 1 ? v.toString().split(".")[1].length : 0;

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

typeChoiceElement.addEventListener("input", (event) => {
	if (typeChoiceElement.value === "drop-off") {
		workOrderInfoWrapper.className = "";
	} else {
		workOrderInfoWrapper.className = "hide";
	}
});

checkBtnElement.addEventListener("click", (event) => {
	event.preventDefault();
	submitRequest();
});

workOrderElement.addEventListener('keydown', (event) => {
	if (event.keyCode == 9 && isValidBarcode(workOrderElement.value)) {
		event.preventDefault();
		handleBarcode(workOrderElement.value);
	}
});

const precision = (v) => v % 1 ? v.toString().split(".")[1].length : 0;

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
