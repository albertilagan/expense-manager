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
      <tr key={category._id}>
        <td>{category.title}</td>
        <td>{category.description}</td>
      </tr>
    ));
    return (
      <Layout>
        <div id="categories" className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="text-light mt-2">Categories</h1>
              <hr />
              <table className="table table-dark">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {categories}
                </tbody>
              </table>
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