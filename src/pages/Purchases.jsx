import React, { useEffect } from 'react'
import { ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';


const Purchases = ({getProductImg}) => {

  const dispatch = useDispatch();
  const purchases = useSelector(state => state.purchases);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPurchasesThunk())
  }, [])

  return (
    <div>
      <h1>Purchases</h1>
      <ListGroup>
        {
          purchases.map(purchase => (
            <ListGroup.Item key={purchase.id}>
              <h3>Purchase ID: {purchase.id}</h3>
              <h4>Products List</h4>
              <ul className='purchase-products-list'>
              {purchase.cart.products.map(product => (
                <li key={product.id} onClick={() => navigate(`/products/${product.id}`)}>
                  <img src={getProductImg(product.id)} style={{ maxWidth: "200px", maxHeight: "100px"}} alt="" />
                  <br />
                  <b>{product.title}</b>
                </li>
                ))}
              </ul>
            </ListGroup.Item>
          ))
        }
      </ListGroup>
    </div>
  )
}

export default Purchases