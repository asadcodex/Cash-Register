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
  ["ONE HUNDRED", 100],
];

// Currency unit values in dollars
const currencyUnit = {
  PENNY: 0.01,
  NICKEL: 0.05,
  DIME: 0.1,
  QUARTER: 0.25,
  ONE: 1,
  FIVE: 5,
  TEN: 10,
  TWENTY: 20,
  "ONE HUNDRED": 100,
};

function calculateChange(price, cash, cid) {
  let changeDue = cash - price;
  const originalChangeDue = changeDue;
  let totalCid = 0;
  const change = [];

  cid.forEach((denomination) => {
    totalCid += denomination[1];
  });
  totalCid = Math.round(totalCid * 100) / 100;

  if (changeDue === 0) {
    return "No change due - customer paid with exact cash";
  }

  if (totalCid < changeDue) {
    return "Status: INSUFFICIENT_FUNDS";
  }

  for (let i = cid.length - 1; i >= 0; i--) {
    const denomination = cid[i][0];
    const availableAmount = cid[i][1];
    const unitValue = currencyUnit[denomination];
    let currencyCount = 0;

    while (changeDue >= unitValue && availableAmount > currencyCount) {
      changeDue -= unitValue;
      changeDue = Math.round(changeDue * 100) / 100;
      currencyCount += unitValue;
    }

    if (currencyCount > 0) {
      change.push([denomination, currencyCount]);
    }
  }

  if (changeDue > 0) {
    return "Status: INSUFFICIENT_FUNDS";
  }

  const status = totalCid === originalChangeDue ? "CLOSED" : "OPEN";
  let result = `Status: ${status}`;
  change.forEach((item) => {
    result += ` ${item[0]}: $${item[1]}`;
  });

  return result;
}

document.getElementById("purchase-btn").addEventListener("click", function () {
  const cashInput = parseFloat(document.getElementById("cash").value);
  const changeDueElement = document.getElementById("change-due");

  if (isNaN(cashInput)) {
    alert("Please enter a valid amount");
    return;
  }

  if (cashInput < price) {
    alert("Customer does not have enough money to purchase the item");
    changeDueElement.textContent = "";
    return;
  }

  const result = calculateChange(price, cashInput, cid);
  changeDueElement.textContent = result;
});