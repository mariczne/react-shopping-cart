import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProductDeck from "./ProductDeck.jsx";

const API_URL = // bypassing CORS via proxy for now
  "https://cors-anywhere.herokuapp.com/https://www.reasonapps.pl/data.json";

const DATA_STATES = { loading: "loading", loaded: "loaded" };

export default class App extends Component {
  state = {
    dataState: DATA_STATES.loading,
    products: [],
    cart: []
  };

  async componentDidMount() {
    const response = await fetch(API_URL);
    const products = await response.json();
    this.setState({ products, dataState: DATA_STATES.loaded });
  }

  render() {
    const { dataState, products } = this.state;

    return (
      <Container>
        <Row>
          <Col>
            <ProductDeck dataState={dataState} products={products} />
          </Col>
        </Row>
      </Container>
    );
  }
}
