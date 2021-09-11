// const select = document.querySelectorAll('select'); 
// const input = document.querySelectorAll('input');
const currency1 = $("#currency1");
const currency2 = $("#currency2");
const amount1 = $("#amount1");
const amount2 = $("#amount2")
const exchangeURL ="https://api.coingecko.com/api/v3/exchange_rates"; 
let html = '';

async function currency(){
    const response = await fetch(exchangeURL);
    //console.log(res);
    const data = await response.json(); 
    console.log(data.rates)
    console.log(data.rates["usd"].value)
    //console.log("rates value: " + Response.rates.value);
    const arrKeys = Object.keys(data.rates);
    // const rates =(data.rates);
    
    // console.log(arrKeys)
    //console.log(rates)
    
    arrKeys.map(item =>{
        return html += `<option value=${item}>${item}</option>`;
    });
    console.log(html)
    $("#currency1, #currency2").html(html)
    
    amount1.keyup(()=>{
        console.log("keyup")
        const value1 = currency1.val();
        //console.log(value1)
        const value2 = currency2.val(); 
        let currency1Amount = parseInt(amount1.val());
        if (isNaN(currency1Amount)){
            currency1Amount=0;
        }
        
        const currency1Value = data.rates[value1].value; 
        const currency2Value = data.rates[value2].value;
        const currency2Amount = currency1Amount*(currency2Value/currency1Value);
        amount2.val(currency2Amount);
        
    });
        currency1.change(()=>{
            amount1.keyup()
        });
        
        currency2.change(()=>{
            amount1.keyup()
        });
        
        




       // input[1].value =amount *rates[select[1].value] / rates[select[0].value]; 
   // });
   // console.log(rates[select[1].value])
  //  input[1].addEventListener('keyup', ()=>{
        //input[0].value =input[1].value *rates[select[0].value] / rates[select[1].value]; 
   
    
}

currency(); 

