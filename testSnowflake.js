
var database = require('./database.js');
database.initialize();
database.getEmployee(1);

var questionnairre = {};
questionnairre.EMPLOYEE_ID = 72
questionnairre.QUES_RESULTS = "Fail" 
questionnairre.VACCINATED = "TRUE";
questionnairre.COVID_CONTACT = "FALSE";
questionnairre.TRAVEL_INTERNATIONAL ="TRUE"; 
questionnairre.FEVER = "TRUE"; 
questionnairre.COUGH = "TRUE"; 
questionnairre.SORE_THROAT = "TRUE"; 
questionnairre.CHILLS = "TRUE"; 
questionnairre.MUSCLE_ACHES = "TRUE";  
questionnairre.HEADACHE ="TRUE";  
questionnairre.TASTE_SMELL_LOSS  ="TRUE"; 
questionnairre.ABDOMINAL_PAIN ="TRUE"; 

database.addQuestionnairre(questionnairre)
