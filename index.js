// Your code here
const createEmployeeRecord = (arr) => {
    return {
        firstName: arr[0], 
        familyName: arr[1], 
        title: arr[2], 
        payPerHour: arr[3], 
        timeInEvents: [], 
        timeOutEvents: []
    }
}

const createEmployeeRecords = (arr) => arr.map(record => createEmployeeRecord(record))

const createTimeInEvent = (record, time) =>  {
    let [date, hour] = time.split(" ") //destructuring in ES6
    record.timeInEvents.push({
        type: "TimeIn", 
        date, //ES6 shorthand 
        hour: parseInt(hour) 
    })
    return record 
}

const createTimeOutEvent = (record, time) => {
    let [date, hour] = time.split(" ")
    record.timeOutEvents.push({
        type: "TimeOut",
        date, 
        hour: parseInt(hour)
    })
    return record 
}

const hoursWorkedOnDate = (record, target) => {
    const timeIn = record.timeInEvents.find(e => e.date === target )
    const timeOut = record.timeOutEvents.find(e => e.date === target )

    return (timeOut.hour - timeIn.hour) / 100 
}

const wagesEarnedOnDate = (record, date) => record.payPerHour * hoursWorkedOnDate(record, date)
const allWagesFor = (record) => record.timeInEvents.reduce((total, event) => total + wagesEarnedOnDate(record, event.date), 0)
const findEmployeeByFirstName = (records, name) => records.find(record => record.firstName === name)
const calculatePayroll = (records) => records.reduce((total, record) => total + allWagesFor(record), 0)



