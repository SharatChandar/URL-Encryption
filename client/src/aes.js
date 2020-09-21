import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CryptoJS from "crypto-js";
import $ from "jquery";
import "./app.css";
import moment from "moment";
import { Container, Button, Form, Input, FormGroup } from "reactstrap";
const SECRET = "I am batman";
class App extends Component {
  constructor(props) {
    super();
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.callAPI(this.state.value);
    event.preventDefault();
  }

  callAPI(data) {
    var info = $("#info1");
    info.val(
      info.val() +
        "\n" +
        moment().format(" HH:mm:ss:SSS") +
        " : " +
        "Data Entered"
      // data
    );
    var b64 = CryptoJS.AES.encrypt(data, SECRET).toString();
    info.val(
      info.val() +
        "\n" +
        moment().format(" HH:mm:ss:SSS") +
        " : " +
        "AES Encrypting Data "
      // b64
    );
    var e64 = CryptoJS.enc.Base64.parse(b64);
    info.val(
      info.val() +
        "\n" +
        moment().format(" HH:mm:ss:SSS") +
        " : " +
        "Converting to Base64 "
      // e64
    );
    var eHex = e64.toString(CryptoJS.enc.Hex);
    info.val(
      info.val() +
        "\n" +
        moment().format(" HH:mm:ss:SSS") +
        " : " +
        "Converting to Hex"
      // eHex
    );
    var URL = "http://localhost:8080/aes/" + eHex;
    info.val(
      info.val() +
        "\n" +
        moment().format(" HH:mm:ss:SSS") +
        " : " +
        "Sending Request to server via Params"
      // URL
    );

    fetch(URL)
      .then((res) => res.text())
      .then((res) =>
        info.val(
          info.val() +
            "\n" +
            moment().format(" HH:mm:ss:SSS") +
            " : " +
            "Reply from server"
          // res
        )
      );
  }

  render() {
    return (
      <Container>
        <h2>AES:</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Input
              placeholder="Enter Data"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Input type="textarea" name="text" id="info1" disabled />
          </FormGroup>

          <Button color="primary">Submit</Button>
        </Form>
      </Container>
    );
  }
}

export default App;
