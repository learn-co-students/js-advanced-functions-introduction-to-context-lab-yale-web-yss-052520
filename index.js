// Your code here

function createEmployeeRecords(ar) {
    return ar.map(e => createEmployeeRecord(e))
}

function createEmployeeRecord(ar) {
    return {
        firstName: ar[0], 
        familyName: ar[1], 
        title: ar[2],
        payPerHour: ar[3], 
        timeInEvents: [], 
        timeOutEvents: [],
    }
}

function createTimeInEvent(rec, date) {
    const dateSplit = date.split(" ")
    const timeObj = {type: "TimeIn", hour: parseInt(dateSplit[1]), date: dateSplit[0]}
    rec.timeInEvents.push(timeObj)
    return rec
}

function createTimeOutEvent(rec, date) {
    const dateSplit = date.split(" ")
    const timeObj = {type: "TimeOut", hour: parseInt(dateSplit[1]), date: dateSplit[0]}
    rec.timeOutEvents.push(timeObj)
    return rec
}

function hoursWorkedOnDate(rec, date) {
    const timeIn = rec.timeInEvents.find(e => e.date===date).hour
    const timeOut = rec.timeOutEvents.find(e => e.date===date).hour
    return (timeOut-timeIn)/100
}

function wagesEarnedOnDate(rec, date) {
    return hoursWorkedOnDate(rec, date)*rec.payPerHour
}

function allWagesFor(emp) {
    return emp.timeInEvents.reduce((m, e) => m + wagesEarnedOnDate(emp, e.date), 0)
}

function calculatePayroll(ar) {
    return ar.reduce((m, e) => m + allWagesFor(e), 0)
}

function findEmployeeByFirstName(ar, fname) {
    return ar.find(e => e.firstName === fname )
}