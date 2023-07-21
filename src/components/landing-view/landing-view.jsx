import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./landing-view.scss";

export const LandingView = () => {
  return (
    <Row className="text-light">
      <Col md={12}>
        <div classaName=" ">
          <h1 className="d-flex header my-5">ChaseFlix</h1>
        </div>
      </Col>
      <Col md={6}>
        <h2>Welcome!</h2>
        <div>
          <h4>
            On ChaseFlix you can browse a collection of movies, read information
            about them, and add them to a list of your favorites to show
            everyone your exquisite taste!
          </h4>
        </div>
      </Col>
      <Col md={6}>
        <div className="d-flex justify-content-center">
          <h2>Ready to check it out? Join today</h2>
        </div>

        <div className="d-flex my-3 justify-content-center">
          <h3 className=" fixed-width">Signup:</h3>
          <Link to="/signup">
            <Button className="mx-3">Here</Button>
          </Link>
        </div>
        <div className="justify-content-center d-flex my-3">
          <h3 className=" fixed-width">Login: </h3>
          <Link to="/login">
            <Button className="mx-3">Here</Button>
          </Link>
        </div>
      </Col>
    </Row>
  );
};
