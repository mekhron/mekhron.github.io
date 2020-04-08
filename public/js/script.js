fullStates = {
  "AL": "Alabama",
  "AK": "Alaska",
  "AS": "American Samoa",
  "AZ": "Arizona",
  "AR": "Arkansas",
  "CA": "California",
  "CO": "Colorado",
  "CT": "Connecticut",
  "DE": "Delaware",
  "DC": "District Of Columbia",
  "FM": "Federated States Of Micronesia",
  "FL": "Florida",
  "GA": "Georgia",
  "GU": "Guam",
  "HI": "Hawaii",
  "ID": "Idaho",
  "IL": "Illinois",
  "IN": "Indiana",
  "IA": "Iowa",
  "KS": "Kansas",
  "KY": "Kentucky",
  "LA": "Louisiana",
  "ME": "Maine",
  "MH": "Marshall Islands",
  "MD": "Maryland",
  "MA": "Massachusetts",
  "MI": "Michigan",
  "MN": "Minnesota",
  "MS": "Mississippi",
  "MO": "Missouri",
  "MT": "Montana",
  "NE": "Nebraska",
  "NV": "Nevada",
  "NH": "New Hampshire",
  "NJ": "New Jersey",
  "NM": "New Mexico",
  "NY": "New York",
  "NC": "North Carolina",
  "ND": "North Dakota",
  "MP": "Northern Mariana Islands",
  "OH": "Ohio",
  "OK": "Oklahoma",
  "OR": "Oregon",
  "PW": "Palau",
  "PA": "Pennsylvania",
  "PR": "Puerto Rico",
  "RI": "Rhode Island",
  "SC": "South Carolina",
  "SD": "South Dakota",
  "TN": "Tennessee",
  "TX": "Texas",
  "UT": "Utah",
  "VT": "Vermont",
  "VI": "Virgin Islands",
  "VA": "Virginia",
  "WA": "Washington",
  "WV": "West Virginia",
  "WI": "Wisconsin",
  "WY": "Wyoming"
}

fetch('https://covidtracking.com/api/states')
  .then((response) => {
    return response.json()
  })
  .then(data => {
    return data.sort((a,b) => b.positive-a.positive) //sort by num of positive cases
  })
  .then((data) => {
    //console.log(data)
    data.forEach(item => {
        let fullState = fullStates[item.state] + ` (${item.state})`
        let rowsTbody = document.querySelector('#rowData')
        let rowTd = `<tr>
                        <td class="state">${fullState}</td>
                        <td class="positive">${item.positive}</td>
                        <td class="negative">${item.negative}</td>
                        <td class="hospitalized">${item.hospitalized}</td>
                        <!--<td class="hospitalized">${item.onVentilatorCurrently}</td>-->
                        <td class="recovered">${item.recovered}</td>
                        <td class="totalTestResults">${item.totalTestResults}</td>
                        <td class="death">${item.death}</td>
                    </tr>`
        rowsTbody.innerHTML += rowTd
    })
    return data
  // Count total for Columns
  })
  .then(data => {
    let positiveTotal = 0,
        negativeTotal = 0,
        hospitalizedTotal = 0,
        onVentilatorCurrentlyTotal = 0,
        recoveredTotal = 0,
        totalTestResultsTotal = 0,
        deathTotal = 0

    data.forEach(row => {
        positiveTotal += row.positive
        negativeTotal += row.negative
        hospitalizedTotal += row.hospitalized
        onVentilatorCurrentlyTotal += row.onVentilatorCurrently
        recoveredTotal += row.recovered
        totalTestResultsTotal += row.totalTestResults
        deathTotal += row.death
    })
    // Create element and append to DOM
    let rowTotal = document.querySelector('#rowTotal')
    let colTotal = `<tr>
                        <th>TOTAL IN US</th>
                        <th>${positiveTotal}</th>
                        <th>${negativeTotal}</th>
                        <th>${hospitalizedTotal}</th>
                        <!--<th>${onVentilatorCurrentlyTotal}-->
                        <th>${recoveredTotal}</th>
                        <th>${totalTestResultsTotal}</th>
                        <th>${deathTotal}</th>
                    </tr>`
    rowTotal.innerHTML += colTotal
})

function inputSearch() {
    //Declare variables
    let input, filter, table, tr, td, i, txtValue
    input = document.querySelector("#searchInput")
    filter = input.value.toUpperCase()
    table = document.querySelector("#datatable")
    tr = table.querySelectorAll("tr")
    // Loop through all table rows, and hide those who don't match the search query
    for (let i = 0; i < tr.length; i++) {
        td = tr[i].querySelector("td")
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = ""
            } else {
                tr[i].style.display = "none"
            }
        } 
    }
}

document.querySelector("#searchInput").addEventListener('click', e => {
    document.querySelector('label').style.display = 'none'
})
