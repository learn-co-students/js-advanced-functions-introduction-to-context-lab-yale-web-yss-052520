// Your code here

function createEmployeeRecord(ary){
    return {
        firstName: ary[0],
        familyName: ary[1],
        title: ary[2],
        payPerHour: ary[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(records){
    const result = []
    records.forEach(record => result.push(createEmployeeRecord(record)))
    return result
}


function createTimeInEvent(record,str){
    const TimeIn = {type: "TimeIn", date : str.substring(0,10), hour : parseInt(str.substring(10),10)}
    record.timeInEvents.push(TimeIn)
    return record
}

function createTimeOutEvent(record,str){
    const TimeOut = {type: "TimeOut", date : str.substring(0,10), hour : parseInt(str.substring(10),10)}
    record.timeOutEvents.push(TimeOut)
    return record
}


function hoursWorkedOnDate(record,date){
    const start =  record.timeInEvents.find(timeIn => timeIn.date == date).hour
    const end =  record.timeOutEvents.find(timeOut => timeOut.date == date).hour
    return (end - start) / 100
}

function wagesEarnedOnDate(record,date){
    return hoursWorkedOnDate(record,date) * record.payPerHour
}

function allWagesFor(record){
    return record.timeInEvents.reduce(function(total,timeIn){ return total + wagesEarnedOnDate(record,timeIn.date)},0)
}

function calculatePayroll(employees){
    return employees.reduce((m, e) => m + allWagesFor(e), 0)
}

function findEmployeeByFirstName(employees, name){
    return  employees.find(emp => emp.firstName === name)
}