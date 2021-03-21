var express = require('express');
var database = require('../database.js');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  let employeeId = req.query.employeeId;
  let employee = null;

  try {
    database.getEmployee(employeeId)
      .then(emp => {
        if (emp == null) {
          res.render('message', { "message": "NO Employee found for Id: " + employeeId + ". Please try the search again." });
          return;
        }
        employee = emp;
        let returnStatus = employee.EMPLOYEE_RETURN_STATUS_CD;
        if (returnStatus && (returnStatus == "RQ" || returnStatus == "RAQ")) {
          res.render('questionnairre', { "employee": employee });
          return;
        } else {
          if (employee.EMPLOYEE_RETURN_STATUS_CD === "OE") {
            res.render('message', { "message": "Yay! You are currently ABLE to come to the office! Please bring a mask and we will see you soon. ", "hasError": false });
            return;
          } else if (employee.EMPLOYEE_RETURN_STATUS_CD === "CP") {
            res.render('message', { "message": "You are currently UNABLE to come to the office. Please follow all CDC guidelines and take care of yourself. We hope to see you soon!", "hasError": false });
            return;
          } else if (employee.EMPLOYEE_RETURN_STATUS_CD === "NTR") {
            res.render('message', { "message": "Please take and submit a COVID-19 test, so we can determine your return eligibility.", "hasError": false });
            return;
          }

        }
      })
      .catch(error => {
        res.render('message', { "message": "System error processing your request, please try again later.", "hasError": true });
        return;
      })
  } catch (error) {
    console.log(error);
  }

});



module.exports = router;


/*"EMPLOYEE_ID": 1,
    "FIRST_NAME": "Molly",
    "LAST_NAME": "Gutierrez",
    "EMPLOYEE_GENDER": "F",
    "EMPLOYEE_AGE": 33,
    "MANAGER_ID": 275,
    "MANAGER_NAME": "Gaddy Tracy",
    "KEY_POSITION_FLAG": "No",
    "JOB_TITLE": "Research Associate",
    "DEPARTMENT": "Biologics",
    "DIVISION": "R&D",
    "OFFICE_BUILDING": "NY_2",
    "FLOOR": 20,
    "DESK": "Y67",
    "OFFICE_CITY": "Manhattan",
    "OFFICE_COUNTY": "New York",
    "OFFICE_STATE": "NY",
    "HOME_CITY": "Lime Lake",
    "HOME_COUNTY": "Cattaraugus",
    "HOME_STATE": "NY",
    "COVID_SERVERITY": "5410",
    "TEST_RESULT": null,
    "POSITIVE_FLAG": null,
    "TEST_DATE": null,
    "QUES_RESULTS": null,
    "EMPLOYEE_RETURN_STATUS": "No Test Received",
    "EMPLOYEE_RETURN_STATUS_CD": "NTR"*/