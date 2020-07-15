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

function createEmployeeRecords(arr_of_arrays){
    return arr_of_arrays.map(arr => createEmployeeRecord(arr));
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

let find_hour = (events, date) => {
   return events.find(event => event.date == date).hour / 100 ;
}
function hoursWorkedOnDate(employee, date){
    const start = find_hour(employee.timeInEvents, date);
    const end = find_hour(employee.timeOutEvents, date);
    return end - start
}



function wagesEarnedOnDate(employee, date){
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor(employee){
    let dates = employee.timeInEvents.map(event => event.date);
    return dates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(employee => employee.firstName == firstName)
}

function calculatePayroll(records){
    return records.reduce((total, record) => total + allWagesFor(record), 0);
}