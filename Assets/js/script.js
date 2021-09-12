//Document selectors
var graphBody = document.querySelector('.graphBody');
var graphInput = document.querySelector('.graphinput');
var dropdown = document.querySelector('#dropdownList');
var themeList = document.querySelector('#themeList');
var bodyColor = document.querySelector('.bodyColor');
var headColor = document.querySelector('.headColor');

//Moment JS Variables
// var userFrom = moment("9/5/2021","MM/DD/YYYY")
// var userTo =  moment("9/7/2021","MM/DD/YYYY")
// var fromDate = moment(userFrom).unix()
// var toDate = moment(userTo).unix()

//Graph Variables
var xAxis;
var yAxis;
var hourxAxis;
var houryAxis;

//Color variables
var colorAray = JSON.parse(localStorage.getItem('colorTheme')) || [{primay:"",secondary:""}];




//24 hour API call
var hourURL = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1&interval=hourly"

//30 day APi call
var graphURL = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily"

//Fetch API data
searchApi();

//Set Color Theme
setColor();

//--------------------------------------------------------------
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
  

function getXAxis (data) {
  var tempX = [];

  for (i=0; i<data.prices.length;i++) {
    tempX.push(data.prices[i][0])
  }
  return tempX;
}

function getYAxis (data) {
  var tempY = [];

  for (i=0; i<data.prices.length;i++) {
    tempY.push(data.prices[i][1])
  }
  return tempY;
}

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
        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        labels: xLabels,
        datasets: [{
            label: 'USD Price per Bitcoin',
            // data: [12, 19, 3, 5, 2, 3],
            data: ylabels,
          
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                // beginAtZero: true
                // ticks: {
                //   // // Include a dollar sign in the ticks
                //   // callback: function(ylabels, index, values) {
                  //     return '$' + value;
            }
        }
    }
});

}


function setColor () {

  bodyColor.className = "";
  headColor.className = "";

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

  bodyColor.classList.add(colorAray[0].primary)
  headColor.classList.add(colorAray[0].secondary)

 

  localStorage.setItem('colorTheme', JSON.stringify(colorAray));
}

//Makes a new graph when a new dropdown choice is selected
themeList.addEventListener("change", setColor)