import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchCategories } from './../../actions/categoryAction';
import Layout from './../../components/Layout';

class Categories extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newCategory) {
      // add to list
    }
  }

  render() {
    const categories = this.props.categories.map(category => (
      <div key={category._id}>
        <h3>Title: <span>{category.title}</span></h3>
        <p>Description: <span>{category.description}</span></p>
        <hr />
      </div>
    ));
    return (
      <Layout>
        <div id="categories" className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="mt-2">Categories</h1>
              <hr />
              {categories}
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories.items,
  newCategory: state.categories.item
});

export default connect(mapStateToProps, { fetchCategories })(Categories);