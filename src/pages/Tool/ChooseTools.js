import React from "react";
import weather from "../../assets/images/weather.png";
import notes from "../../assets/images/notes.png";
import { Link } from "react-router-dom";
import { Card, Container } from "react-bootstrap";

const ChooseTools = () => {
  return (
    <Container fluid="lg" className="w-100">
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
          <Link to="/checklist" className="tools-link">
            <div
              className="py-4 px-4 mx-4 text-center"
              style={{
                cursor: "pointer",
              }}
            >
              <img src={notes} width={80} height={80} />
              <h5 className="py-2">
                CheckList
              </h5>
            </div>
          </Link>
          <Link to="/notes" className="tools-link">
            <div
              className="py-4 px-4 mx-4 text-center"
              style={{
                cursor: "pointer",
              }}
            >
              <img src={notes} width={80} height={80} />
              <h5 className="py-2">Notes</h5>
            </div>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default ChooseTools;
