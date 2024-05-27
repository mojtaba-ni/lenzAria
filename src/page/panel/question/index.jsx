
import { Route, Routes } from "react-router-dom";
import AddQuestion from "./addQuestion";
import QuestionList from "./questionList";

const Question = () => {
  return (
    <Routes>
      <Route path="/" element={<QuestionList />} />
      <Route path="/add" element={<AddQuestion />} />
    </Routes>
  );
};

export default Question;
