const select = document.querySelectorAll('select'); 
const input = document.querySelectorAll('input');
const exchangeURL ="https://api.coingecko.com/api/v3/exchange_rates"; 
let html = '';

async function currency(){
    const res = await fetch(exchangeURL);
    //console.log(res);
    const data = await res.json(); 
    console.log(data.rates)
    const arrKeys = Object.keys(data.rates);
    console.log(arrKeys)
    
};

currency(); 