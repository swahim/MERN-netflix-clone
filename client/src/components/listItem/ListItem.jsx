import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom'; 

export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try{
        const res = await axios.get("/movie/",+ item);
        setMovie(res.data[0]);
      }catch(err){
        console.log(err);
      }
    }
    getMovie();
  },[item])

  return (
    <Link to={{pathname : "/watch", movie : movie}}>
    <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={movie.image} alt="" />
      {isHovered && (
        <>
          <video src={movie.Trailer} autoPlay={true} loop />
          <div className="itemInfo">
            <div className="icons">
              <PlayArrow className="icon" />
              <Add className="icon" />
              <ThumbUpAltOutlined className="icon" />
              <ThumbDownOutlined className="icon" />
            </div>
            <div className="itemInfoTop">
              <span>{movie.Time}</span>
              <span className="limit">{movie.AgeLimit}</span>
              <span>1999</span>
            </div>
            <div className="desc">
              {movie.description}
            </div>
            <div className="genre">{movie.Genre}</div>
          </div>
        </>
      )}
    </div>
    </Link>
  );
}
