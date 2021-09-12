// variables
var baseURL = "https://api.coingecko.com/api/v3/";
var tableBody = $('tbody');
// usd currency formatter
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});



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