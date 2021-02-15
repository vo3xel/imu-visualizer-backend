const csv = require('csv-parser');
const fs = require('fs');


const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

http.listen(5555, () => {
    console.log('listening on *:5555');
  });
  io.on('connection', (socket) => {
    console.log('a user connected');
  });

let gyroXValues = []
let gyroYValues = []
let gyroZValues = []
let accXValues = []
let accYValues = []
let accZValues = []
let latValues = []
let longValues = []

fs.createReadStream('test.csv')
  .pipe(csv())
  .on('data', (row) => {
    let dataPoint = row['signal_value']
    switch(row['sensor_setup_id']){
        case 1:
            gyroXValues.push(dataPoint)
            break
        case 2:
            gyroYValues.push(dataPoint)
            break
        case 3:
            gyroZValues.push(dataPoint)
            break
        case 4:
            accXValues.push(dataPoint)
            break    
        case 5:
            accYValues.push(dataPoint)
            break
        case 6:
            accZValues.push(dataPoint)
            break                    
        case 7:
            latValues.push(dataPoint)
            break
        case 8:
            longValues.push(dataPoint)
            break   
        default:
        break
    }
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });