const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')

let interval = 1000 * 3
let date = new Date()
let timestamp = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear()

setInterval(() => {

  fetch('https://covidtracking.com/api/states')
  .then(response => response.json())
  .then(data => {
    fs.open(path.join(__dirname, 'savedResponses', timestamp+'.json'), 'w', (err, file) => {
        if (err) throw err
        console.log('Created file')
      })
    return data
  })
  .then(data => {
    fs.writeFile(path.join(__dirname, 'savedResponses', timestamp+'.json'), JSON.stringify(data), err => {
        if (err) throw err
        console.log('Saved to the file')
      })
  })
  .catch(err => console.log(err))

}, interval)