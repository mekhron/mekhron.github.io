const fetch = require('node-fetch')
const fs = require('fs')


let date = new Date()
let timestamp = ''
fetch('https://covidtracking.com/api/states')
  .then(response => response.json())
  .then(data => {
    timestamp = date.getTime()
    fs.open(`./savedResponses/${timestamp}.txt`, 'w', function (err, file) {
        if (err) throw err
        console.log('Created file')
      })
    return data
  })
  .then(data => {
    fs.writeFile(`./savedResponses/${timestamp}.txt`, JSON.stringify(data), function (err) {
        if (err) throw err
        console.log('Saved to the file')
      })
  })
  .catch(err => console.log(err))