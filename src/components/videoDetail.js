import React from "react";

const VideoDetail = ({ title, description, avis }) => {
  
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{avis} % des utilisateurs ont aimé ce film</p>
    </div>
  );
};

export default VideoDetail;
