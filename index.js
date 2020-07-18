// Your code here
function createEmployeeRecord(arr){
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(aoa){
    return aoa.map(arr => createEmployeeRecord(arr))
}

function createTimeInEvent(record, str){
    record.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(str.split(' ')[1]),
        date: str.split(' ')[0]
    })
    return record
}


function createTimeOutEvent(record, str){
    record.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(str.split(' ')[1]),
        date: str.split(' ')[0]
    })
    return record
}

function hoursWorkedOnDate(record, date){
    return (record.timeOutEvents.find(obj => obj.date == date).hour - record.timeInEvents.find(obj => obj.date == date).hour)/100
}

function wagesEarnedOnDate(record, date){
    return hoursWorkedOnDate(record, date) * record.payPerHour
}

function allWagesFor(record){
    let dates = record.timeInEvents.map(shift => shift.date)
    // let hours = dates.map(date => hoursWorkedOnDate(record, date))
    // return hours.reduce((total, hour) => total + hour) * record.payPerHour
    let wages = dates.map(date => wagesEarnedOnDate(record, date))
    return wages.reduce((total, wage) => total + wage)
}

function calculatePayroll(employees){
    return employees.map(employee => allWagesFor(employee)).reduce((total, wage) => total + wage)
}

function findEmployeeByFirstName(aoa, name){
    return aoa.find(arr => arr.firstName == name)
}