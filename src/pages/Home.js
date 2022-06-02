import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  state = {
    queryInput: '',
    categories: '',
    products: [],
    searched: false,
    storageList: [],
  }

  componentDidMount() {
    this.getListCategories();
    this.getLocalStorageList();
  }

  getLocalStorageList = () => {
    const productList = JSON.parse(localStorage.getItem('productId'));
    this.setState({
      storageList: productList,
    });
  }

  getListCategories = async () => {
    const categoriesList = await getCategories();
    this.setState({ categories: categoriesList });
  };

  handleBtnSearch = async ({ target }) => {
    const { name } = target;
    const responseApi = await getProductsFromCategoryAndQuery(null, name);
    const results = await responseApi.results;
    this.setState({
      products: results,
      searched: true,
    });
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  handleBtnAddCart = ({ target }) => {
    const { products, storageList } = this.state;
    const { name } = target;
    const product = products.find((item) => item.id === name);
    if (storageList) {
      const arr = [...storageList];
      arr.push(product);
      return this.setState({ storageList: arr }, () => {
        localStorage.setItem('productId', JSON.stringify(arr));
      });
    }
    const arr = [];
    arr.push(product);
    this.setState({ storageList: arr }, () => {
      localStorage.setItem('productId', JSON.stringify(arr));
    });
  }

  handleCategorySearch = async ({ target }) => {
    const responseApi = await getProductsFromCategoryAndQuery(target.id, null);
    const { results } = await responseApi;
    this.setState({
      products: results,
      searched: true,
    });
  }

  render() {
    const { categories, queryInput, products, searched, storageList } = this.state;
    return (
      <section className="main-content">
        <Header storageList={ storageList } />
        <div className="content-category-itens">
          <div className="categories-content">
            {categories && categories.map((category) => (
              <label htmlFor={ category.id } key={ category.id }>
                {category.name}
                <input
                  name="category"
                  data-testid="category"
                  input="category"
                  type="radio"
                  id={ category.id }
                  onClick={ this.handleCategorySearch }
                />
              </label>

            ))}
          </div>
          <section className="products-content">
            <div className="cart-text-search">
              <h3 data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </h3>
            </div>
            <section className="search-bar">
              <input
                type="text"
                id="query-input"
                name="queryInput"
                className="inputSearchItem"
                data-testid="query-input"
                value={ queryInput }
                onChange={ this.handleChange }
              />
              <button
                data-testid="query-button"
                type="button"
                className="btnSearchItem"
                onClick={ this.handleBtnSearch }
                name={ queryInput }
              >
                Pesquisar
              </button>
            </section>
            <section className="cards-content">
              {products[0] && (
                products.map((product) => (
                  <section key={ product.id } className="product-card">
                    <Link
                      to={ `/details/${product.id}` }
                      key={ product.id }
                      data-testid="product-detail-link"
                      style={ { textDecoration: 'none', color: 'black' } }
                    >
                      <div data-testid="product" className="product">
                        <img src={ product.thumbnail } alt={ product.title } />
                        <h4>
                          Preço:
                          { product.price }
                        </h4>
                        <p>{ product.title }</p>
                      </div>
                    </Link>
                    { product.shipping.free_shipping
                       && <p data-testid="free-shipping">Frete Grátis</p>}
                    <button
                      type="button"
                      data-testid="product-add-to-cart"
                      name={ product.id }
                      onClick={ this.handleBtnAddCart }
                    >
                      Adicionar ao Carrinho
                    </button>
                  </section>
                )))}
            </section>
            {!products[0] && searched && <p>Nenhum produto foi encontrado</p>}
          </section>
        </div>
        <Footer />
      </section>
    );
  }
}

export default Home;
