//function currencyConverter (
    //var exchangeURL 
//)
function getElement(id) {
  return document.getElementById(id);
}

fetch('https://api.coingecko.com/api/v3/coins/stellar?localization=false&sparkline=false')
  .then(res => res.json())
  .then((res) => {
    const market_data = res.market_data;
    getElement('usdprice').innerHTML = "$" + market_data.current_price.usd.toFixed(6);
  });

function calcusd() {
  let x = getElement("xlm").value;
  getElement("usd").value = x * getUSD();
}

function calcxlm() {
  let x = getElement("usd").value;
  getElement("xlm").value = x / getUSD();
}

function getUSD() {
  try {
    return parseFloat(getElement('usdprice').innerHTML.replace("$", ""));
  } catch {
    return 100;
  }
}