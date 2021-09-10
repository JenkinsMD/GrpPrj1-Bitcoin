;
var graphBody = document.querySelector('.graphBody');
var graphInput = document.querySelector('.graphinput');
var selectCity = "";

var userFrom = moment("9/5/2021","MM/DD/YYYY")
var userTo =  moment("9/7/2021","MM/DD/YYYY")
var fromDate = moment(userFrom).unix()
var toDate = moment(userTo).unix()



//Excample API Call

//Static API CALL - Working
// var graphURL = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=1630468800&to=1630900800"

//Testing Dynamic API CALL
var graphURL = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=" +fromDate +"&to="+ toDate

// var city= JSON.parse(localStorage.getItem('cityList')) || [];

searchApi();

// Time conversions --------------------------------------------------
// var date = moment("9/4/2021","MM/DD/YYYY")
// var date2 = moment(date).unix()
// console.log(date2)
// var date3= moment.unix(date2).format("MM/DD/YYYY")
// console.log(date3)

//-----------------------------------------------------------------------


//Saves value from form search
function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = searchInput.value;

 

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }
  
  updateCityList(searchInputVal);
   searchApi(searchInputVal);
   
  
}


form.addEventListener('submit', handleSearchFormSubmit);

//--------------------------------------------------------------
async function searchApi() {
 
    var xAxis;
    var yAxis;
  

//Current day url
  // locQueryUrl = locQueryUrl + query+'&appid=' + APIKey;
 

  //fetch current weather data
  const response = await fetch(graphURL);
  const data = await response.json();

  console.log(data)
  xAxis = getXAxis(data)
  yAxis = getYAxis(data)

//   console.log(xAxis);
//   console.log(yAxis)

  makeChart(xAxis,yAxis)  


}
  
function getXAxis (data) {
  var tempX = [];
  
  // var date3= moment.unix(date2).format("MM/DD/YYYY")

  for (i=0; i<data.prices.length;i++) {
    // tempX.push(data.prices[i][0])
    tempX.push(moment(data.prices[i][0]).format("MM/DD/YYYY"))
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



function makeChart(xArray,yArray) {
    const xLabels = xArray;
    const ylabels = yArray;

    console.log(xLabels);
    console.log(ylabels);

    var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        labels: xLabels,
        datasets: [{
            label: '# of Votes',
            // data: [12, 19, 3, 5, 2, 3],
            data: ylabels,
          
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                // beginAtZero: true
            }
        }
    }
});

}