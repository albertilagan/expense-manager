import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from './../../actions/categoryAction';
import Layout from './../../components/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from './../../components/Modal/Modal';

class Categories extends Component {
  constructor() {
    super();
    this.state = {
      showFormModal: false,
      showDeleteModal: false,
      category: {
        _id: '',
        title: '',
        description: ''
      },
      isLoading: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.newCategory = this.newCategory.bind(this);
    this.saveCategory = this.saveCategory.bind(this);
  }

  componentDidMount() {
    this.props.fetchCategories();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isLoading: false
    });
    this.toggleModal('showFormModal', false);
    this.toggleModal('showDeleteModal', false);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const new_cat = Object.assign({}, this.state.category, {
      [name]: value
    });
    this.setState({
      category: new_cat
    });
  }


  showFormModal(cat) {
    this.setState({
      category: cat
    });
    this.toggleModal('showFormModal', true);
  }

  showDeleteModal(cat) {
    this.setState({
      category: cat
    });
    this.toggleModal('showDeleteModal', true);
  }

  toggleModal(key, val) {
    this.setState({
      [key]: val
    });
  }

  newCategory() {
    this.setState({
      category: {
        _id: '',
        title: '',
        description: ''
      }
    });
    this.toggleModal('showFormModal', true);
  }

  saveCategory() {
    if (this.state.category._id) {
      this.props.updateCategory(this.state.category);
    } else {
      this.props.createCategory(this.state.category);
    }
  }

  deleteCategory() {
    this.setState({
      isLoading: false
    });
    this.props.deleteCategory(this.state.category)
  }

  render() {
    const categories = this.props.categories.map(category => (
      <tr key={category._id}>
        <td>{category.title}</td>
        <td>{category.description}</td>
        <td className="action"><span onClick={() => this.showFormModal(category)}><FontAwesomeIcon icon="edit" /></span></td>
        <td className="action"><span onClick={() => this.showDeleteModal(category)}><FontAwesomeIcon icon="trash" color="red" /></span></td>
      </tr>
    ));
    return (
      <Layout>
        <div id="categories" className="container">
          <div className="row">
            <div className="col-12">
              <div className="header d-md-flex align-items-center">
                <h1 className="text-light mt-2">Categories</h1>
                <button type="button" className="btn btn-primary mt-2 mt-md-0 ml-lg-auto" onClick={this.newCategory}>CREATE NEW</button>
              </div>
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
          {/* Edit Form Modal */}
          <Modal show={this.state.showFormModal}>
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button type="button" className="close" aria-label="Close" onClick={() => this.toggleModal('showFormModal', false)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    name="title"
                    type="text"
                    className="form-control"
                    value={this.state.category.title}
                    onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input
                    name="description"
                    type="text"
                    className="form-control"
                    value={this.state.category.description}
                    onChange={this.handleInputChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => this.toggleModal('showFormModal', false)}>Close</button>
              <button type="button" className="btn btn-primary" onClick={this.saveCategory}>SAVE</button>
            </div>
          </Modal>
          {/* Delete Modal */}
          <Modal show={this.state.showDeleteModal}>
            <div className="modal-header">
              <h5 className="modal-title">Delete Category</h5>
              <button type="button" className="close" aria-label="Close" onClick={() => this.toggleModal('showDeleteModal', false)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this category?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" onClick={() => this.toggleModal('showDeleteModal', false)}>Cancel</button>
              <button type="button" className="btn btn-danger" onClick={() => this.deleteCategory()}>DELETE</button>
            </div>
          </Modal>
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories.items,
  newCategory: state.categories.item
});

export default connect(mapStateToProps, {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory
})(Categories);