fetch('https://covidtracking.com/api/states')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach(item => {
        let rowsTbody = document.querySelector('#rowData')
        let rowTd = `<tr>
                        <td class="state">${item.state}</td>
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
  }).then(data => {
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
                        <th>TOTAL</th>
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

function myFunction() {
    //Declare variables
    let input, filter, table, tr, td, i, txtValue
    input = document.querySelector("#searchInput")
    filter = input.value.toUpperCase()
    table = document.querySelector("#datatable")
    tr = table.querySelectorAll("tr")
  // Loop through all table rows, and hide those who don't match the search query
    for (let i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0]
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