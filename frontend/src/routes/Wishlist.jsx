import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLoader } from '../hooks/useLoader';

function Wishlist({ wishlist }) {
  const { useFakeLoader } = useLoader();

  useEffect(() => useFakeLoader(), []);
  return (
    <div className="wishlistPage">
      {wishlist.length === 0 ? (
        <p></p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Remove</th>
              <th>Images</th>
              <th>Product</th>
              <th>Unit Price</th>
              <th>Stock Status</th>
              <th>Add To Cart</th>
            </tr>
          </thead>
          <tbody>
            {wishlist.map((product) => (
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
                  <p>In Stock</p>
                </td>
                <td>
                  <button className="addToCartButton">ADD TO CART</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Wishlist;
