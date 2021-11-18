import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomList = async () => {
      try {
        const res = await axios.get(
          `/list/getlist${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`
        );
        setLists(res.data);
        console.log(lists);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomList();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} />(
      {lists.map((list) => (
        <List list={list}/>
      ))}
      )
    </div>
  );
};

export default Home;
