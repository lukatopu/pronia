import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLoader } from '../hooks/useLoader';
import Counter from '../components/Counter';

function Cart({ cart }) {
  const { useFakeLoader } = useLoader();

  useEffect(() => useFakeLoader(), []);
  return (
    <div className="wishlistPage">
      {cart.length === 0 ? (
        <p></p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Remove</th>
              <th>Images</th>
              <th>Product</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((product) => (
              <tr key={product._id}>
                <td>
                  <button>x</button>
                </td>
                <td>
                  <Link to={`/product/${product._id}`}>
                    <img
                      className="wishlistProductImage"
                      src={product.image}
                    ></img>
                  </Link>
                </td>
                <td>
                  <a>{product.name}</a>
                </td>
                <td>
                  <p>{product.price}</p>
                </td>
                <td>
                  <Counter />
                </td>
                <td>
                  <p>TOTAL</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Cart;
