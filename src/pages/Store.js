import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Analytics, Auth } from 'aws-amplify';
import "./Store.css"
import Button from '@material-ui/core/Button';
import PizzaItem from '../components/PizzaItem';

const Store = () => {
    const history = useHistory();
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        Auth
            .currentAuthenticatedUser({ bypassCache: false })
            .then(user => setUser(user))
            .catch(err => console.log(err));
    }, []);

    const pizzaCatalogue = [
        {
            name: 'Cheese Pizza',
            price: 18,
            imageURL: "/images/cheese-pizza.jpg"
        },
        {
            name: 'Garlic Pizza',
            price: 14,
            imageURL: "/images/garlic-pizza.jpg"
        },
        {
            name: 'Sausage Pizza',
            price: 20,
            imageURL: "/images/sausage-pizza.jpg"
        }
    ];

    const handleCheckout = async (e) => {
        e.preventDefault();
        // Update the endpoint
        await Analytics.updateEndpoint({
            address: user.attributes.email,
            attributes: {
                cart: cart,
                purchased: ['Yes']
            },
            channelType: 'EMAIL',
            optOut: 'NONE',
            userAttributes: {
                username: [user.username]
            },
            userId: user.attributes.email,
        })
        // Send checkout event
        await Analytics.record({ name: 'Checkout' });
        history.push('/checkout');
    }

    const addToCart = async (e) => {
        e.preventDefault();
        // Create or update the endpoint
        await Analytics.updateEndpoint({
            address: user.attributes.email,
            attributes: {
                cart: cart,
                purchased: ['No']
            },
            channelType: 'EMAIL',
            optOut: 'NONE',
            userAttributes: {
                username: [user.username]
            },
            userId: user.attributes.email,
        })
        // Send add to cart event
        await Analytics.record({ name: 'AddToCart' });
    }

    const selectItem = (e) => {
        const pizzaName = e.target.value;
        if (e.target.checked) {
            setCart([...cart, pizzaName]);
        } else {
            const filteredItems = cart.filter(item => item !== pizzaName);
            setCart(filteredItems);
        }
    }

    return (
        <div className="store">
            <div className="store__body">
                {pizzaCatalogue.map((pizza, index) => (
                    <PizzaItem key={index} pizza={pizza} addToCart={addToCart} selectItem={selectItem} />
                ))}
            </div>
            <div className="store__footer">
                <Button variant="contained" color="default" onClick={(e) => addToCart(e)}>Add To Cart</Button>
                <Button variant="contained" color="primary" onClick={(e) => handleCheckout(e)}>Checkout</Button>
            </div>
        </div>

    )
}

export default Store;
