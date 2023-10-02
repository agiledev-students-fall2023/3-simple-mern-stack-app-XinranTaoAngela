import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AboutUs() {
  const [aboutUsData, setAboutUsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the "About Us" data from the backend
    axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/aboutus`)
      .then(response => {
        console.log(response.data)
        setAboutUsData(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="about-us">
      <h2>About Me</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : aboutUsData ? (
        <div>
          {console.log(aboutUsData.aboutUs)}
          {/* <img src="https://drive.google.com/uc?export=view&id=1PADtJEL5Y-7ZlwojMVmYn78LIRA5oP3x" alt="random" width="300" height="360" /> */}
          <img src={aboutUsData.aboutUs.image} alt="random" width="300" height="360" />
          {/* <img src={aboutUsData.image} alt={aboutUsData.name} /> */}
          <h3>{aboutUsData.aboutUs.name}</h3>
          <ul>
            {aboutUsData.aboutUs.paragraphs.map((paragraph, index) => (
              <li key={index}>{paragraph}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Failed to retrieve "About Us" data from the server.</p>
      )}
    </div>
  );
}

export default AboutUs;