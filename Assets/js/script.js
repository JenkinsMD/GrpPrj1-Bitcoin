var baseURL = "https://api.coingecko.com/api/v3/";
var table = $('.table');
var tableBody = $('tbody');
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});



getPublicTreasury(baseURL);

async function getPublicTreasury(url) {

    var url = baseURL + "companies/public_treasury/bitcoin"
    var response = await fetch(url);
    var data = await response.json();
    console.log(data);
    var companies = data.companies;
    console.log(companies);

    var tableString = "<tr>"

    companies.forEach(element => {
        for (var prop in element) {
            console.log("props: " + prop);
            tableString += `<td>${element[prop]}</td>`
        }
        tableString += "</tr>"
    });

    console.log(tableString);
    tableBody.append(tableString);

}