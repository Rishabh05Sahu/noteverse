import React from 'react';
import "../Card/Card.css";
import image from "../../assets/img.png";

const Card = (props) => {

  // Function to open the URL in a new window
 
  return (
    <div className='card'>
        <div className="card-img">
          <img src={image} alt="" />
        </div>
        <div className="card-detail">
          <p><a href={props.url } target='_blank'>{props.title}-  Unit: {props.unit}</a></p>
    
        </div>
     
        
    </div>
  );
}

export default Card;
