import { Route, Routes } from "react-router-dom";
import CommentList from "./commentList";
import Response from "./response";

const Comments = () => {
  return (
    <Routes>
      <Route path="/" element={<CommentList />} />
      <Route path="/response/:commentId" element={<Response />} />
    </Routes>
  );
};

export default Comments;
