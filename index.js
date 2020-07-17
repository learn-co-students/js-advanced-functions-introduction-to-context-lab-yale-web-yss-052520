const createEmployeeRecord = function(arr) {
    const [firstName, familyName, title, payPerHour] = arr
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = function(arr) {
    return arr.map(createEmployeeRecord)
}

const createTimeEvent = function(record, date, isIn) {
    const timeEvent = {
        type: ("Time" + (isIn ? "In" : "Out")),
        hour: parseInt(date.slice(11, 13) + "00"),
        date: date.slice(0, 10)
    }

    isIn ? record.timeInEvents.push(timeEvent) : record.timeOutEvents.push(timeEvent)

    return record
}

const createTimeInEvent = function(record, date) {
    return createTimeEvent(record, date, true)
}

const createTimeOutEvent = function(record, date) {
    return createTimeEvent(record, date, false)
}

const hoursWorkedOnDate = function(record, date) {
    const timeInHour = record.timeInEvents.find(r => r.date == date).hour
    const timeOutHour = record.timeOutEvents.find(r => r.date == date).hour
    return (timeOutHour - timeInHour) / 100
}

const wagesEarnedOnDate = function(record, date) {
    return hoursWorkedOnDate(record, date)*record.payPerHour
}

const allWagesFor = function(record) {
    const datesWorked = record.timeInEvents.map(event => event.date)
    return datesWorked.reduce((acc, date) => acc + wagesEarnedOnDate(record, date), 0)
}

const findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(record => record.firstName == firstName)
}

const calculatePayroll = function(srcArray) {
    return srcArray.reduce((acc, record) => acc + allWagesFor(record), 0)
}