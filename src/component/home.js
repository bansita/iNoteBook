import React from "react";
import Notes from "./Notes";

const home = (props) => {
  const {showAlert}=props
  return (
    <div>
     <Notes showAlert={showAlert}/>
    </div>
  );
};

export default home;
