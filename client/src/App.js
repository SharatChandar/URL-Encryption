import React from "react";
import AES from "./aes";
import DES from "./des";
import { Container, Row, Col } from "reactstrap";
function App() {
  return (
    <Container className="App">
      <h1>
        Comparison of AES and TripleDES for Protecting Data Passed Through a URL
      </h1>
      <Row>
        <Col>
          <AES />
        </Col>
        <Col>
          <DES />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
