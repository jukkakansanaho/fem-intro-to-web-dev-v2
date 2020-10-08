let currentTotal = 0;
let userInputBuffer = '0';
let previousOperator = null;
const resultScreen = document.querySelector('.result');

document.querySelector('.buttons').addEventListener('click', function (event) {
  buttonClick(event.target.innerText);
});

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  render();
}

function handleNumber(value) {
  if (userInputBuffer === '0') {
    userInputBuffer = value;
  } else {
    userInputBuffer += value;
  }
}

function handleSymbol(value) {
  switch (value) {
    case 'C':
      userInputBuffer = '0';
      currentTotal = 0;
      // previousOperator = null;
      break;
    case '=':
      if (previousOperator === null) {
        return;
      } else {
        storeInputBuffer(parseInt(userInputBuffer));
        previousOperator = null;
        userInputBuffer = +currentTotal;
        currentTotal = 0;
        break;
      }
    case '←':
      if (userInputBuffer.length === 1) {
        userInputBuffer = '0';
      } else {
        userInputBuffer = userInputBuffer.substring(
          0,
          userInputBuffer.length - 1
        );
      }
      break;
    default:
      handleMath(value);
      break;
  }
}

function handleMath(value) {
  if (userInputBuffer === '0') {
    return;
  }

  const intUserInputBuffer = parseInt(userInputBuffer);
  if (currentTotal === 0) {
    currentTotal = intUserInputBuffer;
  } else {
    storeInputBuffer(intUserInputBuffer);
  }
  previousOperator = value;
  userInputBuffer = '0';
}

function storeInputBuffer(intBuffer) {
  if (previousOperator === '+') {
    currentTotal += intBuffer;
  } else if (previousOperator === '-') {
    currentTotal -= intBuffer;
  } else if (previousOperator === '×') {
    currentTotal *= intBuffer;
  } else if (previousOperator === '÷') {
    currentTotal /= intBuffer;
  }
}

function render() {
  resultScreen.innerText = userInputBuffer;
}
