// Your code here
function createEmployeeRecord(array){ // [firstName, familyName, title, payPerHour]
  let employeeObject = {}
  employeeObject.firstName = array[0]
  employeeObject.familyName = array[1]
  employeeObject.title = array[2]
  employeeObject.payPerHour = array[3]
  employeeObject.timeInEvents = []
  employeeObject.timeOutEvents = []
  return employeeObject
}

function createEmployeeRecords(arrayOfEmployees){
return arrayOfEmployees.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employeeObject, timestamp){
  let date = timestamp.split(' ')[0]
  let hour = parseInt(timestamp.split(' ')[1])
  let timeInEvent = {
    type: "TimeIn",
    hour: hour,
    date: date
  }
  employeeObject.timeInEvents.push(timeInEvent)
  return employeeObject
}

function createTimeOutEvent(employeeObject, timestamp){
  let date = timestamp.split(' ')[0]
  let hour = parseInt(timestamp.split(' ')[1])
  let timeOutEvent = {
    type: "TimeOut",
    hour: hour,
    date: date
  }
  employeeObject.timeOutEvents.push(timeOutEvent)
  return employeeObject
}

function hoursWorkedOnDate(employeeObject, date) {
  let timeIn = employeeObject.timeInEvents.find(event => event.date === date).hour
  let timeOut = employeeObject.timeOutEvents.find(event => event.date === date).hour
  return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(employeeObject, date) {
  let hours = hoursWorkedOnDate(employeeObject, date)
  return hours * employeeObject.payPerHour
}

function allWagesFor(employeeObject) {
  let dates = employeeObject.timeInEvents.map(event => event.date)
  let wages = dates.map(date => wagesEarnedOnDate(employeeObject, date))
  return wages.reduce(function(a,b){return a + b})
}

function calculatePayroll(employeesArray) {
  let wages = employeesArray.map(employee => allWagesFor(employee))
  return wages.reduce(function(a,b){return a + b})
}

function findEmployeeByFirstName(employeesArray, firstName) {
  return employeesArray.find(employee => employee.firstName == firstName)
}