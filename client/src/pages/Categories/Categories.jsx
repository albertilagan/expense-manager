import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchCategories } from './../../actions/categoryAction';
import Layout from './../../components/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Categories extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newCategory) {
      // add to list
    }
  }

  editCategory(cat) {
    console.log(cat);
  }

  render() {
    const categories = this.props.categories.map(category => (
      <tr key={category._id}>
        <td>{category.title}</td>
        <td>{category.description}</td>
        <td className="action"><span onClick={() => this.editCategory(category)}><FontAwesomeIcon icon="edit" /></span></td>
        <td className="action"><span><FontAwesomeIcon icon="trash" color="red" /></span></td>
      </tr>
    ));
    return (
      <Layout>
        <div id="categories" className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="text-light mt-2">Categories</h1>
              <hr />
              <div className="table-responsive">
                <table className="table table-dark">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Description</th>
                      <th scope="col" colSpan="2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories}
                  </tbody>
                </table>
              </div>
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