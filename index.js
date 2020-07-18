// array = [string, string, string, num]
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

// array = AoA
function createEmployeeRecords(array){
    return array.map(array => createEmployeeRecord(array))
}

// dateStamp = "YYYY-MM-DD HHMM"
function createTimeInEvent(employeeObj, dateStamp){
    employeeObj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    })
    return employeeObj
}

function createTimeOutEvent(employeeObj, dateStamp){
    employeeObj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    })
    return employeeObj
}

// date = "YYYY-MM-DD"
function hoursWorkedOnDate(employeeObj,date){
    let timeIn = employeeObj.timeInEvents.find(obj => obj.date == date).hour 
    let timeOut = employeeObj.timeOutEvents.find(obj => obj.date == date).hour
    let hoursWorked = (timeOut - timeIn)/100
    return hoursWorked
}

function wagesEarnedOnDate(employeeObj, date){
    let payRate = employeeObj.payPerHour
    let hrWorked = hoursWorkedOnDate(employeeObj, date)
    let payOwed =  hrWorked * payRate 
    return payOwed 
}

function allWagesFor(employeeObj){
    let dates = employeeObj.timeInEvents.map(shift => shift.date)
    let wages = dates.map(date => wagesEarnedOnDate(employeeObj,date))
    let payForAllDates = wages.reduce((total, wage) => total + wage)
    return payForAllDates
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(employee => employee.firstName == firstName)
}

function calculatePayroll(array){
    return array.map(employee => allWagesFor(employee)).reduce((total, wage) => total + wage)
}