import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    const { storageList } = this.props;
    return (
      <header className="cart-text">
        <h1>Luca&apos;s Store</h1>
        <div className="login-cart">
          <Link className="linkHome" to="/">
            <p>home</p>
          </Link>
          <p>login</p>
          <div>
            <Link to="/cart">
              <span className="material-symbols-outlined">
                shopping_cart
              </span>
              <div className="count-cart">
                {storageList && (
                  <h2
                    data-testid="shopping-cart-size"
                  >
                    {storageList.length}

                  </h2>
                )}
              </div>
            </Link>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  storageList: PropTypes.arrayOf(
    PropTypes.shape({
      available_quantity: PropTypes.number,
      pictures: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string,
        }),
      ),
    }),
  ),
};

Header.defaultProps = {
  storageList: '',
};

export default Header;
