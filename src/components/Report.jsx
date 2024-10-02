import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GaugeChart from "react-gauge-chart";

function Report() {
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [timer, setTimer] = useState(0);
  const [questions, setQuestions] = useState([]);

  // Fetching questions from the API
  useEffect(() => {
    fetch(`http://localhost:3001/questions`)
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        calculateScore(data);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, []);

  // Function to calculate the score, total time taken, correct, and incorrect answers
  const calculateScore = (questions) => {
    let totalScore = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let totalTime = 0;

    questions.forEach((question) => {
      //calculating the total time taken
      totalTime += question.timer;

      if (question.selectedOptions.length === 1) {
        // If there is only one selected option
        const selectedOption = question.selectedOptions[0];
        const correctOption = question.options.find(
          (option) => option.isCorrect
        );

        if (selectedOption === correctOption.id) {
          // User selected the correct option
          totalScore += 1;
          correctCount += 1;
        } else {
          // User selected an incorrect option
          incorrectCount += 1;
        }
      } else {
        // User didn't select any option or selected multiple options
        incorrectCount += 1;
      }
    });

    setScore(totalScore);
    setCorrectAnswers(correctCount);
    setIncorrectAnswers(incorrectCount);
    setTimer(totalTime);
  };

  //calculating the percentage
  const percentage = ((score / questions.length) * 100).toFixed(0);

  return (
    <div className="question-page" style={{ position: "relative" }}>
      <div className="question-container" style={{ paddingTop: "0%" }}>
        <div className="report-title">Your result</div>
        <div
          style={{
            padding: "2%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "static",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70vw"
              height="70vw"
              viewBox="0 0 320 320"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M160 320C248.366 320 320 248.366 320 160C320 71.6344 248.366 0 160 0C71.6344 0 0 71.6344 0 160C0 248.366 71.6344 320 160 320Z"
                fill="#EBEDF5"
              />
            </svg>
          </div>
          <GaugeChart
            className="gauge-chart"
            nrOfLevels={20}
            arcPadding={-1}
            cornerRadius={0}
            arcWidth={0.2}
            percent={percentage / 100}
            animate={false}
            textColor={"#000"}
            hideText={true}
          />
          <div className="gauge-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25vw"
              height="25vw"
              viewBox="0 0 320 320"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M160 320C248.366 320 320 248.366 320 160C320 71.6344 248.366 0 160 0C71.6344 0 0 71.6344 0 160C0 248.366 71.6344 320 160 320Z"
                fill="#FFF"
              />
            </svg>
            <div className="percentage">{percentage}%</div>
          </div>
        </div>

        <div className="report">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
              fill="#44B77B"
            />
          </svg>
          &nbsp;&nbsp;<strong>{correctAnswers}</strong>&nbsp; correct
        </div>
        <div
          className="report"
          style={{ background: "rgba(255, 59, 63, 0.1167)" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
              fill="#FF3B3F"
            />
          </svg>
          &nbsp;&nbsp;<strong>{incorrectAnswers}</strong>&nbsp; incorrect
        </div>
        <div className="report" style={{ background: "#f3f4fa" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
              fill="#525253"
            />
          </svg>
          &nbsp;&nbsp;<strong>{timer}s</strong>&nbsp; time taken
        </div>
      </div>
      <div className="button-container">
        <Link to="/">
          <button className="start-button">Start Again</button>
        </Link>
      </div>
    </div>
  );
}

export default Report;
