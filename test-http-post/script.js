const textInputElement = document.getElementById("text-input");

const checkBtnElement = document.getElementById("check-btn");

const resultElement = document.getElementById("result");

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
