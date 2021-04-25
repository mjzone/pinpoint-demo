import React from 'react';
import { useHistory } from 'react-router-dom';
import "./Checkout.css"
import Button from '@material-ui/core/Button';

const Checkout = () => {
    let history = useHistory();
    return (
        <div className="checkout">
            <div className="checkout__body">
                <span>Thanks for shopping with us!</span>
                <Button variant="contained" color="primary" onClick={() => history.push('/store')}>Back to store</Button>
            </div>
        </div>
    )
}

export default Checkout
