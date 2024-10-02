# Quiz App

- Created a responsive quiz app website using React JS.
  
- Created a mock REST API using json-server.

# Steps to run the app

- Clone the repo.
  
- Run `npm i json-server` to install the json server.
  
- Run `json-server --watch data/db.json --port 3001` to start the server.
  
- In a new terminal, run `npm start` to start the app.
  
## Screens

The app contains the following screens:

### Home:

● The user clicks on the “Start” button to begin with the quiz.

### Question:

● This screen shows the questions to the user one after the other.

● The question may include an optional image to be shown below the text.

● A question has only one correct choice.

● The user must select at least one option before they can proceed to the next question.

● There is a timer associated with each question.

● After the user submits the response for the last question, he/she gets the score report.

### Report:

● Shows the total score percentage, total time taken, and number of correct and incorrect answers.

● The “Start Again” button allows the user to take the quiz again from the beginning.

- Technologies used: ReactJS, HTML, CSS
