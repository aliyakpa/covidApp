"use strict";
var snowflake = require('snowflake-sdk');
var connectionId = null;


var connection = snowflake.createConnection({
  account: process.env.DB_ACCOUNT,
  username: process.env.DB_USER_ID,
  password: process.env.DB_PASSWORD,
  warehouse: "NEW_YORK_CITY_ANALYZE_WH"
  //database: "WLN_CASE_COMP",
  //schema: "GROUP1"
}
);



function connect() {
  console.log("Initiating the connection. account: " + process.env.DB_ACCOUNT + ", username: " + process.env.DB_USER_ID)
  connection.connect(
    function (err, conn) {
      if (err) {
        console.error('Unable to connect: ' + err.message);
        process.exit(1)
      }
      else {
        console.log('Successfully connected to Snowflake.');
        // Optional: store the connection ID.
        connectionId = conn.getId();
      }
    }
  );
}

function getEmployee(employeeId) {
  console.log("Quering for employee id: " + employeeId);
  return new Promise((resolve, reject) => {
    connection.execute({
      //sqlText: 'select * from WLN_CASE_COMP.GROUP1.VW_EMPLOYEE_RETURN_RESULTS;',
      sqlText: 'select * from WLN_CASE_COMP.GROUP1.VW_EMPLOYEE_RETURN_RESULTS where EMPLOYEE_ID = ?;',
      binds: [employeeId],
      complete: function (err, stmt, rows) {
        if (err) {
          let errorMsg = 'Failed to execute statement due to the following error: ' + err.message;
          console.error(errorMsg);
          reject(errorMsg);
        } else {
          console.log('Successfully executed statement: ' + stmt.getSqlText());
          console.log("Number or rows retrieved: " + rows.length)
          if (rows.length > 0) {
            console.log('Data Retrieved' + JSON.stringify(rows[0], null, 4));
            resolve(rows[0]);
          }
          else {
            resolve(null);
          }
        }
      }
    });
  });
}


function addQuestionnairre(questionnairre) {
  console.log("adding questionnairre: " + JSON.stringify(questionnairre, null, 4));
  return new Promise((resolve, reject) => {
    connection.execute({
      //sqlText: 'select * from WLN_CASE_COMP.GROUP1.VW_EMPLOYEE_RETURN_RESULTS;',
      sqlText: 'insert into WLN_CASE_COMP.GROUP1.STG_EMPLOYEE_QUESTIONNAIRE (EMPLOYEE_ID, RESULT_DATE, QUES_RESULTS, VACCINATED, COVID_CONTACT, TRAVEL_INTERNATIONAL, FEVER, COUGH, SORE_THROAT, CHILLS, MUSCLE_ACHES, HEADACHE, TASTE_SMELL_LOSS, ABDOMINAL_PAIN) VALUES (?, CURRENT_DATE(),?,?,?,?,?,?,?,?,?,?,?,?)',
      binds: [questionnairre.EMPLOYEE_ID, questionnairre.QUES_RESULTS, questionnairre.VACCINATED, questionnairre.COVID_CONTACT, questionnairre.TRAVEL_INTERNATIONAL, 
        questionnairre.FEVER, questionnairre.COUGH, questionnairre.SORE_THROAT, questionnairre.CHILLS, questionnairre.MUSCLE_ACHES, questionnairre.HEADACHE, 
        questionnairre.TASTE_SMELL_LOSS, questionnairre.ABDOMINAL_PAIN],
      complete: function (err, stmt, rows) {
        if (err) {
          let errorMsg = 'Failed to execute statement due to the following error: ' + err.message;
          console.error(errorMsg);
          reject(errorMsg);
        } else {
          console.log('Successfully executed statement: ' + stmt.getSqlText());
          resolve(null);
        }
      }
    });
  });
}

function initialize() {
  connect();
}


//initialize();

module.exports = {
  initialize, getEmployee, addQuestionnairre

}