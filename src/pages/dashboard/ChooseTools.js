import React from "react";
import weather from "../../assets/images/weather.png";
import notes from "../../assets/images/notes.png";
import recipe from "../../assets/images/recipe.webp";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

const ChooseTools = () => {
  return (
    <Container className="w-100">
      <div className="my-5">
        <h2 className="my-5 text-center">
          Choose What you want?
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          
          <Link to="/news" className="tools-link">
            <div
              className="py-4 px-4 mx-4 text-center"
              style={{
                cursor: "pointer",
              }}
            >
              <img src={notes} width={80} height={60} />
              <h5 className="py-2">News Feed</h5>
            </div>
          </Link>
          <Link to="/weather" className="tools-link">
            <div
              className="py-4 px-4 mx-4 text-center"
              style={{
                cursor: "pointer",
              }}
            >
              <img src={weather} width={80} height={60} />
              <h5 className="py-2">
                Weather
              </h5>
            </div>
          </Link>
          <Link to="/recipes" className="tools-link">
            <div
              className="py-4 px-4 mx-4 text-center"
              style={{
                cursor: "pointer",
              }}
            >
              <img src={recipe} width={80} height={60} />
              <h5 className="py-2">Recipes</h5>
            </div>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default ChooseTools;
