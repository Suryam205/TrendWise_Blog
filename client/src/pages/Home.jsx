
import { Link } from "react-router-dom"; 
import Navbar from "../components/Navbar";
import GetPost from "./GetPost";
import GenerateBlogs from "../components/GenerateBlogs";

const Home = () => {
  

  return (
   <>
   <Navbar/>
    <div className="min-h-screen bg-gray-50 px-6 py-10">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
            TrendWise Blog
        </h1>
        <GetPost/>
        <GenerateBlogs/>
    </div>
    </>
  );
};


export default Home;
