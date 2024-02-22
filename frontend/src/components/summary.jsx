// import { useState, useEffect } from "react";
// import { getResult, resetResult, getQuestion } from "../utils/fetch";
// import { useNavigate } from "react-router-dom";
// export default function Summary() {
//   const navigate = useNavigate();
//   const [score, setScore] = useState(0);
//   const [correctAnswer, setCorrectAnswer] = useState(0);
//   const [countQuestion, setCountQuestion] = useState(0);

//   const handleReset = async () => {
//     alert("Resetting");
//     navigate("/play");
//   };
//   useEffect(() => {
//     const fetchResult = async () => {
//       try {
//         const result = await getResult();
//         setScore(result.score);
//         setCorrectAnswer(result.correct_answer);
//         setIncorrectAnswer(result.incorrect_answer);
//       } catch (error) {
//         console.error("Error fetching result:", error);
//       }
//     };
//     fetchResult();
//   }, []);
//   useEffect(() => {
//     const fetchQuestion = async () => {
//       try {
//         const question = await getQuestion();
//         setCountQuestion(question.question.length);
//       } catch (error) {
//         console.error("Error fetching question:", error);
//       }
//     };
//     fetchQuestion();
//   }, []);

//   return (
//     <div className="bg-gray-100 min-h-screen min-w-screen flex items-center justify-center">
//       <div className="w-1/2 rounded-md bg-gray-300 p-10 mx-24">
//         <p className="text-4xl text-center mb-7"> Congratulation!</p>
//         <p className="text-5xl text-center my-7">Your Score is {score}</p>
//         <p className="text-2xl text-center my-7">
//           {score < 100 ? "You can do better next time" : " You did well!"}
//         </p>
//         <div>
//           <div className="flow-root">
//             <p className="float-left">Total number of question </p>
//             <p className="float-right">{countQuestion}</p>
//           </div>
//           <div className="flow-root">
//             <p className="float-left">Number of correct answer</p>
//             <p className="float-right">{correctAnswer}</p>
//           </div>
//           <div className="flow-root">
//             <p className="float-left">Number of wrong answer</p>
//             <p className="float-right">{countQuestion - correctAnswer}</p>
//           </div>
//           <div className="flex justify-center my-7">
//             <a className="group relative inline-block focus:outline-none focus:ring mx-3">
//               <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-green-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>
//               <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
//                 play again
//               </span>
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { getUser } from "../utils/fetch";
import { useState, useEffect } from "react";
export default function Summary({ question, correctAnswer, score }) {
  const totalScore = (correctAnswer / question) * 100;
  const incorrectAnswer = question - correctAnswer;
  const [fullname, setFullname] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        setFullname(user.user.full_name);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchUser();
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="rounded-md bg-gray-300 p-10  w-1/3">
        <p className="text-4xl text-center mb-7"> Congratulation {fullname}!</p>
        <p className="text-5xl text-center my-7">Your Score is {totalScore}</p>
        <p className="text-2xl text-center my-7">
          {score < 5 ? "You can do better next time" : " You did well!"}
        </p>
        <div>
          <div className="flow-root">
            <p className="float-left">Total number of question </p>
            <p className="float-right">{question}</p>
          </div>
          <div className="flow-root">
            <p className="float-left">Number of correct answer</p>
            <p className="float-right">{correctAnswer}</p>
          </div>
          <div className="flow-root">
            <p className="float-left">Number of wrong answer</p>
            <p className="float-right">{incorrectAnswer}</p>
          </div>
          <div className="flex justify-center my-7">
            <a
              class="group relative inline-block focus:outline-none focus:ring mx-3"
              href="/play"
            >
              <span class="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-red-500 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>
              <span class="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                play again
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
