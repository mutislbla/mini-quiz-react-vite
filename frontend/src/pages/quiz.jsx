import { useState, useEffect } from "react";
import { getQuestion } from "../utils/fetch";
import Summary from "../components/summary";
export default function Quiz() {
  const [question, setQuestion] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const question = await getQuestion();
        console.log("question", question);
        setQuestion(question.question);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchQuestion();
  }, []);
  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
      setCorrectAnswer(correctAnswer + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < question.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };
  return (
    // <div className="bg-gray-300 text-gray-800 min-w-screen rounded-lg m-24 flex items-center">
    //   {showScore ? (
    //     <Summary
    //       question={question.length}
    //       score={score}
    //       correctAnswer={correctAnswer}
    //     />
    //   ) : (
    //     <div className="flex flex-col justify-center p-4 mx-auto md:p-8">
    //       <h2 className="m-8 text-2xl text-center font-bold sm:text-5xl">
    //         {question[currentQuestion]?.question}
    //       </h2>
    //       <div className="grid gap-10 md:gap-8 sm:p-3 md:grid-cols-2 lg:px-12 xl:px-32">
    //         {question[currentQuestion]?.choice.map((choice, index) => (
    //           <button
    //             className="option px-7 py-4 text-green-600 duration-150 bg-gray-100 rounded-lg hover:bg-green-100 font-semibold"
    //             key={index}
    //             onClick={() => handleAnswerOptionClick(choice.isTrue)}
    //           >
    //             {choice.choice}
    //           </button>
    //         ))}
    //       </div>
    //     </div>
    //   )}
    // </div>
    <>
      {showScore ? (
        <Summary
          question={question.length}
          score={score}
          correctAnswer={correctAnswer}
        />
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
          <div className="bg-gray-200 text-gray-800 min-w-screen rounded-lg mx-24 ">
            <div className="flex flex-col justify-center p-4 mx-auto md:p-8">
              <p className="float-left">
                {currentQuestion + 1} of {question.length}{" "}
              </p>
              <h2 className="m-8 text-2xl text-center font-bold sm:text-5xl">
                {question[currentQuestion]?.question}
              </h2>
              <div className="grid gap-10 md:gap-8 sm:p-3 md:grid-cols-2 lg:px-12 xl:px-32">
                {question[currentQuestion]?.choice.map((choice, index) => (
                  <button
                    className="option px-7 py-4 text-red-600 duration-150 bg-gray-100 rounded-lg hover:bg-red-100 font-semibold"
                    key={index}
                    onClick={() => handleAnswerOptionClick(choice.isTrue)}
                  >
                    {choice.choice}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
