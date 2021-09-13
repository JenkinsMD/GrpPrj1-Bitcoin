//Document selectors for graph and color theme
var graphBody = document.querySelector('.graphBody');
var graphInput = document.querySelector('.graphinput');
var dropdown = document.querySelector('#dropdownList');
var themeList = document.querySelector('#themeList');
var bodyColor = document.querySelector('.bodyColor');
var headColor = document.querySelector('.headColor');

//Graph Variables
var xAxis;
var yAxis;
var hourxAxis;
var houryAxis;

//Color variables
var colorAray = JSON.parse(localStorage.getItem('colorTheme')) || [{primay:"",secondary:""}];

//-------------------------------------------------------------------------
//Variables jQuery for currency converter 
const currency1 = $("#currency1");
const currency2 = $("#currency2");
const amount1 = $("#amount1");
const amount2 = $("#amount2")
let html = '';

//Variable to Coingecko API
const exchangeURL ="https://api.coingecko.com/api/v3/exchange_rates"; 

//-------------------------------------------------------------------------
//Variable for table 
var baseURL = "https://api.coingecko.com/api/v3/";
var tableBody = $('tbody');
// usd currency formatter
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

//-------------------------------------------------------------------------

//24 hour API call
var hourURL = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1&interval=hourly"

//30 day APi call
var graphURL = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily"

//Fetch API data
searchApi();

//Set Color Theme
setColor();

//Search API for graph data
async function searchApi() {
 
  //fetch 30day data
  const response = await fetch(graphURL);
  const data = await response.json();

  // console.log(data)

  xAxis = getXAxis(data)
  yAxis = getYAxis(data)

  //fetch 24 hour data
  const responseTwo = await fetch(hourURL);
  const dataTwo = await responseTwo.json();

  hourxAxis = getXAxis(dataTwo)
  houryAxis = getYAxis(dataTwo)

  craftChart()  

}
  
//Function to get x axis for graph
function getXAxis (data) {
  var tempX = [];

  for (i=0; i<data.prices.length;i++) {
    tempX.push(data.prices[i][0])
  }
  return tempX;
}

//Function for y axis of graph
function getYAxis (data) {
  var tempY = [];

  for (i=0; i<data.prices.length;i++) {
    tempY.push(data.prices[i][1])
  }
  return tempY;
}

//Function to identify which graph to make
function craftChart () {
  var tempXArray = []
  var tempYArray = []

  //Create chart for past 24 hours
  if(dropdown.value==="24h"){
    for (i=0;i<hourxAxis.length;i++){
      tempXArray.push(moment(hourxAxis[i]).format("dddd ha"))
    }
    makeChart(tempXArray,houryAxis)

  } else if(dropdown.value==="5d"){
    //create chart for past 5 days
    for (i=xAxis.length-5;i<xAxis.length;i++){
      tempXArray.push(moment(xAxis[i]).format("MM/DD/YYYY"));
      tempYArray.push(yAxis[i]);

      makeChart(tempXArray,tempYArray); 
    }
  }else{
    //Create chart for past 30 days
    for (i=0;i<xAxis.length;i++){
      tempXArray.push(moment(xAxis[i]).format("MM/DD/YYYY"));
    }
    makeChart(tempXArray, yAxis)  
  }

}

//Makes a new graph when a new dropdown choice is selected
dropdown.addEventListener("change", craftChart)



//Creates graph
function makeChart(xArray,yArray) {
    const xLabels = xArray;
    const ylabels = yArray;


    //Clears existing graph
    let chartStatus = Chart.getChart("myChart");
    if (chartStatus != undefined){
      chartStatus.destroy();

    }
    

    var ctx = document.getElementById('myChart').getContext('2d');
    
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: xLabels,
          datasets: [{
              label: 'USD Price per Bitcoin',
              data: ylabels,
            
              borderWidth: 1
          }]
      },

});

}

//Sets Theme Color using local storage
function setColor () {
//Clears current color theme
  bodyColor.className = "";
  headColor.className = "";

  //Default theme if local storage is blank
  if (themeList.value=== "none"){
    if (colorAray[0].primary===""){
      colorAray[0].primary = "has-background-primary-light"
      colorAray[0].secondary = "has-background-primary-dark"
    }
    
  }else if(themeList.value === "green"){
    colorAray[0].primary = "has-background-primary-light"
    colorAray[0].secondary = "has-background-primary-dark"
  }else if (themeList.value === "blue") {
    colorAray[0].primary = "has-background-info-light"
    colorAray[0].secondary = "has-background-info-dark"
  } else {
    colorAray[0].primary = "has-background-grey-darker"
    colorAray[0].secondary = "has-background-grey-light"

  }
//Adding classes to the html
  bodyColor.classList.add(colorAray[0].primary)
  headColor.classList.add(colorAray[0].secondary)

 
//Saving new color theme to local storage
  localStorage.setItem('colorTheme', JSON.stringify(colorAray));
}

//Makes a new graph when a new dropdown choice is selected
themeList.addEventListener("change", setColor)

//-------------------------------------------------------------------------


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

//-------------------------------------------------------------------------


getPublicTreasury(baseURL);

// async function to call public treasury API to fetch details of companies holding bitcoin
async function getPublicTreasury(url) {

    var url = baseURL + "companies/public_treasury/bitcoin"
    var response = await fetch(url);
    var data = await response.json();
    // console.log(data);
    var companies = data.companies;
    // console.log(companies);

    var tableString = "<tr>"
        // for each loop to iterate companies array
    companies.forEach(element => {
        // for loop to iterate object values inside companies array
        for (var prop in element) {
            console.log("props: " + prop);
            tableString += `<td>${element[prop]}</td>`
        }
        tableString += "</tr>"
    });
    // console.log(tableString);
    // append the data rows dynamically to tbody element in html
    tableBody.append(tableString);

}
