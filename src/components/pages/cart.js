import React from "react";
import {connect} from "react-redux";
import {Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label} from "react-bootstrap";
import {bindActionCreators} from "redux";

import {deleteCartItem, updateCart} from "../../actions/cartActions";


class Cart extends React.Component {

    constructor() {
        super();
        this.state = {
            showModal: false
        }
    }

    openModal() {
        this.setState({showModal: true});
    }

    closeModal() {
        this.setState({showModal: false});
    }


    onDelete(_id) {
        const currentBookToDelete = this.props.cart;

        const indexToDelete = currentBookToDelete.findIndex((cart) => {
             return cart._id === _id;
        });

       let cartAfterDelete = [...currentBookToDelete.slice(0 ,indexToDelete), ...currentBookToDelete.slice(indexToDelete + 1)];

       this.props.deleteCartItem(cartAfterDelete); 
    }

    onIncrement(_id) {
        this.props.updateCart(_id, 1);
    }

    onDecrement(_id, quantity) {
        if(quantity > 1)
            this.props.updateCart(_id, -1);

    }
    renderEmpty() {
        return <div></div>;
    }

    renderCart() {
        const cartItemsList = this.props.cart.map((item) => {
            return(
                <Panel key={item._id}>
                    <Row>
                        <Col xs={12} sm={4}>
                            <h6>{item.title}</h6><span>    </span>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>{item.price} €</h6>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6><Label bsStyle="success">{item.quantity}</Label> ud.</h6>
                        </Col>
                        <Col xs={6} sm={4}>
                            <ButtonGroup style={{minWidth: "300px"}}>
                                <Button onClick={this.onDecrement.bind(this, item._id, item.quantity)} bsStyle="default" bsSize="small">-</Button>
                                <Button onClick={this.onIncrement.bind(this, item._id)} bsStyle="default" bsSize="small">+</Button>
                                <Button onClick={this.onDelete.bind(this, item._id)} bsStyle="danger" bsSize="small">DELETE</Button>
                            </ButtonGroup>
                        </Col>                                                                        
                    </Row>
                </Panel>
            )
        }, this);
        return ( 
            <Panel header="Cart" bsStyle="primary">
                {cartItemsList}
                <Row>
                    <Col xs={12}>
                        <h6>Total amount: {this.props.totalAmount}</h6>
                        <Button onClick={this.openModal.bind(this)} bsStyle="success" bsSize="small">Checkout</Button>
                    </Col>
                </Row>
                <Modal show={this.state.showModal} onHide={this.closeModal.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thank you!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>Your order has been saved</h6>
                        <p>You will receive an email confirmation</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Col xs={6}>
                            Total $: {this.props.totalAmount}
                        </Col>
                        <Button onClick={this.closeModal.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Panel>
        )
    }

    render() {
        if(this.props.cart[0]) 
            return this.renderCart();
        else
            return this.renderEmpty();
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart.cart,
        totalAmount: state.cart.totalAmount
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteCartItem,
        updateCart
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);