import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = ({type}) => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const getRandomList = async () => {
      try{
        const res = await axios.get
      }catch(err){
        console.log(err);
      }
    }
  })

  return (
    <div className="home">
      <Navbar />
      <Featured type={type}/>
      <List/>
      <List/>
      <List/>
      <List/>
    </div>
  );
};

export default Home;
