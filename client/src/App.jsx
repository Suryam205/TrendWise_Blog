import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import IndividualPost from "./pages/IndividualPost";

function App() {
  return (
    <BrowserRouter>
      <Routes> 
         <Route path="/" element={<Home />} />
         <Route path="/create" element={<CreatePost />} />
         <Route path="/posts/:slug" element={<IndividualPost />} />
         <Route path="/login" element={<Login/>} />
         <Route path="/signup" element={<Signup/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
