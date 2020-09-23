// Your code here


function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    
}

function createEmployeeRecords(array) {
    return array.map(thisArg => createEmployeeRecord(thisArg))
}

function createTimeInEvent(record, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    record.timeInEvents.push({"type": "TimeIn", "hour": hour, "date": date })
    return record 
}

function createTimeOutEvent(record, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    record.timeOutEvents.push({"type": "TimeOut", "hour": hour, "date": date })
    return record 
}

function hoursWorkedOnDate(record, date) {
    let timeIn = record.timeInEvents.find(event => event.date == date).hour
    let timeOut = record.timeOutEvents.find(event => event.date == date).hour
    let hoursWorked = (timeOut - timeIn) / 100
    return hoursWorked
}

function wagesEarnedOnDate(record, date) {
    let payOwed = hoursWorkedOnDate(record, date) * record.payPerHour
    return payOwed 
}

// First, I need to accumulate all of the dates.
// Then, I want to run each of these dates through 
// the wages earned on date function, which return the 
// wage earned on a specific date

function allWagesFor(record) {
    // let dateArray = []
    let dateArray = record.timeInEvents.map(object => object["date"])
    return dateArray.reduce((memo, date) => { return memo + wagesEarnedOnDate(record, date)}, 0)
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(arg => arg["firstName"] == firstName)
}

// I want to iterate through each employee record, collect a sum, and add it to the total
// reduce would seem to be the most efficient method I know to use
function calculatePayroll(array) {
    array.reduce((memo, employeeRecord) => {return memo + allWagesFor(employeeRecord)}, 0)
}