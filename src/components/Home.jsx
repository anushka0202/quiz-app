import React from "react";
import { Link } from "react-router-dom";
import upraisedLogo from "../assets/upraised_logo.svg";

function Home() {
  const questionId = 1;
  return (
    <div className="home">
      <div style={{ display: "flex", justifyContent: "center", margin: "2%" }}>
        <img src={upraisedLogo} alt="Upraised Logo" />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "2%",
          flex: 1,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            width: "350px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 432 396"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M216 396C335.294 396 432 307.352 432 198C432 88.6476 335.294 0 216 0C96.7065 0 0 88.6476 0 198C0 307.352 96.7065 396 216 396Z"
              fill="white"
            />
          </svg>
        </div>
        <div
          className="quiz-text"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
          }}
        >
          Quiz
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", margin: "2%" }}>
        <Link to={`/questions/${questionId}`}>
          <button className="start-button">Start</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
