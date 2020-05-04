import React from "react";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const VideoListItem = (props) => {
  const {movie} = props;
  let avis = movie.vote_average * 10;
 console.log(avis);
 
  
  return (
    <li className="list-group-item" onClick={handleOnClick}>
      <div className="media">
        <div className="media-left">
          <img
            className="media-object img-rounded"
            height="100px"
            width="100px"
            src={`${IMAGE_URL}${movie.poster_path}`}
            alt="film"
          />
        </div>
        <div className="media-body">
          <h5 className="title_list">{movie.title}</h5>
        </div>
      </div>
    </li>
  );

  function handleOnClick(){
    props.callback(movie);
    
  }
};

export default VideoListItem;
