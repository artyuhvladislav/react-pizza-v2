import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { pizzaItemSelector } from '../redux/pizza/selectors';
import { fetchPizzaItem } from '../redux/pizza/asyncActions';
import { useAppDispatch } from '../redux/store';

function FullPizza() {
  const { id } = useParams();
  const { item } = useSelector(pizzaItemSelector);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchPizzaItem(id || ''));
  }, []);

  return (
    <div className="container">
      <div className="pizza-block-wrapper">
        <div className="pizza-block">
          <img className="pizza-block__image" src={item.imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{item.title}</h4>
          <div className="pizza-block__price">from {item.price} $</div>
        </div>
      </div>
      <Link to="/" className="button button--black">
        <span>Go back</span>
      </Link>
    </div>
  );
}

export default FullPizza;
