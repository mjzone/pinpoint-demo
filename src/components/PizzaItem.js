import React from 'react';
import "./PizzaItem.css";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Checkbox } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      width: 300,
      margin: "20px 20px"
    },
  });
const PizzaItem = ({ pizza, selectItem }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt={pizza.name}
                    height="140"
                    image={pizza.imageURL}
                    title={pizza.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">{pizza.name}</Typography>
                    <Typography gutterBottom variant="h5" component="h2">${pizza.price}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Checkbox value={pizza.name} onChange={selectItem}/>
            </CardActions>
        </Card>
    )
}

export default PizzaItem
