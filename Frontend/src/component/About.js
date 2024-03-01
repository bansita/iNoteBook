import React from "react";
// import noteContext from '../context/notes/NoteContext'
const About = () => {
  return (
    <div>
      <h2>iNoteBook</h2> 
      <p>iNoteBook is a comprehensive note-taking web application
      developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack.
      It offers users a seamless platform to organize their notes effectively,
      with data securely stored on the server. The application boasts several
      key features to enhance the user experience: </p>
      <h4>1. Intuitive Note Management:</h4>
      <p>Users can effortlessly create, edit, and delete notes. Each note can be
      customized with a title, description, and tag, allowing for easy
      organization and retrieval of information. </p>
      <h4>2. Secure Authentication: </h4>
      <p>With a robust authentication system, iNoteBook ensures user data remains
      protected. Users can securely sign up and log in to access their
      personalized note-taking environment. </p>
      <h4>3. Dynamic Index Page:  </h4>
      <p>The index page dynamically fetches all notes stored on the server, presenting users
      with a comprehensive overview of their notes directly upon logging in.
      This streamlined interface facilitates quick access to essential
      information</p>
    </div>
  );
};

export default About;
