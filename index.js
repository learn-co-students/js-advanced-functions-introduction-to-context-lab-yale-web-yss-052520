// Your code here

function createEmployeeRecord(row) {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(data) {
    return data.map(row => createEmployeeRecord(row))
}

function createTimeInEvent(record, dateStamp) {
    let [date, hour] = dateStamp.split(" ")

    record.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date,
    })

    return record
}

function createTimeOutEvent(record, dateStamp) {
    let [date, hour] = dateStamp.split(" ")

    record.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date,
    })

    return record
}

function hoursWorkedOnDate(record, date) {
    let inTime = record.timeInEvents.find( e => e.date == date).hour
    let outTime = record.timeOutEvents.find( e => e.date == date).hour

    return (outTime - inTime)/100
}

function wagesEarnedOnDate(record, date) {
    let hours = hoursWorkedOnDate(record, date)

    return (hours * record.payPerHour)
}

function allWagesFor(record) {
    let wagesArray = record.timeInEvents.map( event => wagesEarnedOnDate(record, event.date))

    return wagesArray.reduce((memo, el) => memo + el)
}

function calculatePayroll(employees) {
    return employees.reduce( (memo, employee) => memo + allWagesFor(employee), 0)
}

function findEmployeeByFirstName(array, name) {
    return array.find( record => record.firstName == name)
}