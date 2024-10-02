import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Question() {
  const { questionId } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [timer, setTimer] = useState(0);
  const currentQuestionNumber = questionId;
  const totalQuestions = 3;

  const progress = (currentQuestionNumber / totalQuestions) * 100;

  // Start the timer when the component mounts
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    // Clean up the timer when the component unmounts or question changes
    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  // Fetch question based on questionId from the API
  useEffect(() => {
    // Reset the timer when a new question is fetched
    setTimer(0);

    fetch(`http://localhost:3001/questions/${questionId}`)
      .then((response) => response.json())
      .then((data) => {
        setQuestion(data);
        setSelectedOptions([]);
      })
      .catch((error) => {
        console.error("Error fetching question:", error);
      });
  }, [questionId]);

  const handleOptionSelect = (optionId) => {
    if (selectedOptions.includes(optionId)) {
      // If the option is already selected, remove it
      setSelectedOptions((prevSelectedOptions) =>
        prevSelectedOptions.filter((id) => id !== optionId)
      );
    } else {
      // If the option is not selected, add it
      setSelectedOptions([optionId]);
    }
  };

  const handleSubmit = () => {
    // Check if at least one option is selected
    if (selectedOptions.length === 0) {
      alert("Please select at least one option before proceeding.");
      return;
    }

    // Implement API call to submit user's selected options and timer
    // Redirect to the next question or the report screen
    fetch(`http://localhost:3001/questions/${questionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...question, selectedOptions, timer }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Check if there is a next question
        if (data.nextQuestionId !== null) {
          // Redirect to the next question
          navigate(`/questions/${data.nextQuestionId}`);
        } else {
          // No more questions, redirect to the report screen
          navigate("/report");
        }
      })
      .catch((error) => {
        console.error("Error submitting answer:", error);
      });
  };

  return (
    <div className="question-page" style={{ position: "relative" }}>
      <div className="timer">Timer: {timer} seconds</div>

      <div className="question-container">
        <div className="progress-container">
          <CircularProgressbar
            value={progress}
            background={true}
            backgroundPadding={5}
            text={`${currentQuestionNumber}/${totalQuestions}`}
            styles={{
              root: {},
              path: {
                stroke: `#44B77B`,
                strokeLinecap: "round",
                // Customize transition animation
                transition: "stroke-dashoffset 0.5s ease 0s",
              },
              trail: {
                stroke: "#F3F4FA",
              },
              text: {
                fill: "#000",
                fontSize: "25px",
                fontFamily: "Nunito",
                fontWeight: 1000,
                fontStyle: "italic",
              },
              background: {
                fill: "#fff",
              },
            }}
          />
        </div>

        <div className="question">{question.text}</div>

        {question.image && (
          <img
            style={{
              width: "50vw",
              display: "flex",
              alignSelf: "center",
              paddingBottom: "5%",
            }}
            src={question.image}
            alt="Question"
          />
        )}

        {question.options &&
          question.options.map((option) => (
            <div
              key={option.id}
              className={`option ${
                selectedOptions.includes(option.id) ? "selected" : ""
              }`}
              onClick={() => handleOptionSelect(option.id)}
            >
              <input
                type="radio"
                id={option.id}
                value={option.text}
                name="options"
                checked={selectedOptions.includes(option.id)}
                onChange={() => handleOptionSelect(option.id)}
                className="custom-radio"
              />
              <label className="option-text" htmlFor={option.id}>
                {option.text}
              </label>
            </div>
          ))}
      </div>

      <div className="button-container">
        <button className="start-button" onClick={handleSubmit}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Question;
