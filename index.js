// Your code here

function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [], 
        timeOutEvents: []
    }
}

function createEmployeeRecords(nestedArray){
    return nestedArray.map(array => createEmployeeRecord(array));
}

function createTimeInEvent(employee, date){
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(date.split(" ")[1], 10),
        date: date.split(" ")[0]
    })
    return employee
}

function createTimeOutEvent(employee, date){
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(date.split(" ")[1], 10),
        date: date.split(" ")[0]
    })
    return employee
}

function hoursWorkedOnDate(employee, date){
    let timeIn = employee.timeInEvents.find(function(event){
        return event.date == date
    })

    let timeOut = employee.timeOutEvents.find(function(event){
        return event.date == date
    })

    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(employee, date){
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor(employee){
    let allDates = employee.timeInEvents.map(event => event.date);
    return allDates.reduce((acc, date) => acc + wagesEarnedOnDate(employee, date), 0);
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(employee => employee.firstName == firstName)
}

function calculatePayroll(records){
    return records.reduce((acc, record) => acc + allWagesFor(record), 0);
} 
