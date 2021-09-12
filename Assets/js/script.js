//Variables jQuery to reference html 
const currency1 = $("#currency1");
const currency2 = $("#currency2");
const amount1 = $("#amount1");
const amount2 = $("#amount2")
//Variable to Coingecko API
const exchangeURL ="https://api.coingecko.com/api/v3/exchange_rates"; 
let html = '';

//Async function for the currency converter 
async function currency(){
    //fetch the API 
    const response = await fetch(exchangeURL);
    const data = await response.json(); 

    //Currency names to select 
    const arrKeys = Object.keys(data.rates);

    //Map currency names to be able to select in a dropdown 
    arrKeys.map(item =>{
        return html += `<option value=${item}>${item}</option>`;
    });
 
    $("#currency1, #currency2").html(html)

    //on keyup currency to log the rate 
    amount1.keyup(()=>{
        //console.log("keyup")
        const value1 = currency1.val();
        //console.log(value1)
        const value2 = currency2.val(); 

        //parse into the the data if NaN to input log 0 
        let currency1Amount = parseInt(amount1.val());
        if (isNaN(currency1Amount)){
            currency1Amount=0;
        }
        
        //to set the value for currency one and two chosen by the user 
        const currency1Value = data.rates[value1].value; 
        const currency2Value = data.rates[value2].value;
        //calcuate late the conversion rate 
        const currency2Amount = currency1Amount*(currency2Value/currency1Value);
        amount2.val(currency2Amount);
        
    });
        //on keyup change the currency rate to reflect the option chosen for currency one and two
        currency1.change(()=>{
            amount1.keyup()
        });
        
        currency2.change(()=>{
            amount1.keyup()
        });
        
}

currency(); 

