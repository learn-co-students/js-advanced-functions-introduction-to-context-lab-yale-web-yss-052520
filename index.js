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

function createEmployeeRecords(arr){
    return arr.map(arr => createEmployeeRecord(arr))
}

function createTimeInEvent(obj, dateStamp){
    let [date, hour] = dateStamp.split(' ')
    let time = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    }
    obj.timeInEvents.push(time)
    return obj
}

function createTimeOutEvent(obj, dateStamp){
    let [date, hour] = dateStamp.split(' ')
    let time = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    }
    obj.timeOutEvents.push(time)
    return obj
}

function hoursWorkedOnDate(obj, dateStamp){
    let timeIn = obj.timeInEvents.find(time => time.date == dateStamp)
    let timeOut = obj.timeOutEvents.find(time => time.date == dateStamp)
    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(obj, dateStamp){
    let hours = hoursWorkedOnDate(obj, dateStamp)
    return hours * obj.payPerHour
}

function allWagesFor(obj){
    return obj.timeInEvents.reduce((acc, time) => {
        return wagesEarnedOnDate(obj, time.date) + acc

    }, 0)
}

function findEmployeeByFirstName(src, first){
    return src.find(obj => {return obj.firstName == first})
}

function calculatePayroll(arr){
    return arr.reduce((acc, obj) => {
        return acc + allWagesFor(obj)
    }, 0)
}