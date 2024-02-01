import React from "react";

function DisplaySection({triggerPreview}) {

  const scroll = () => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
  }
  return (
    <div className="display-section wrapper">
      <h2 className="title"> New </h2>
      <p className="text">Brillient</p>
      <span className="deccription">
        A display that's up to 2x brighter in the sun
      </span>
      <button className="button" onClick={triggerPreview}>Try me!</button>
      <button className="back-button" onClick={scroll}>Top</button>
    </div>
  );
}

export default DisplaySection;
