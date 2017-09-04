import React from "react";
import {Row, Col, Well, Button} from "react-bootstrap";

const BookItem = (props) => {
    const {id, title, description, price} = props;
    return(
        <Well>
            <Row>
                <Col xs={12}>
                    <h6>{title}</h6>
                    <p>{description}</p>
                    <h6>{price} €</h6>
                    <Button bsStyle="primary">Buy now</Button>
                </Col>
            </Row>
        </Well>
    )
}

export default BookItem;