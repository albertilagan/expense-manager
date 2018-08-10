import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
  fetchExpenses,
  createExpense,
  updateExpense,
  deleteExpense
} from './../../actions/expenseAction';
import { fetchCategories } from './../../actions/categoryAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from './../../components/Layout';
import Modal from './../../components/Modal/Modal';
import { format_date } from './../../helpers';

class Expenses extends Component {
  constructor() {
    super();
    this.state = {
      showFormModal: false,
      showDeleteModal: false,
      expense: {
        title: '',
        value: 0,
        date: new Date(),
        category: ''
      },
      isLoading: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.newExpense = this.newExpense.bind(this);
    this.saveExpense = this.saveExpense.bind(this);
  }

  componentDidMount() {
    this.props.fetchExpenses();
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
    const new_exp = Object.assign({}, this.state.expense, {
      [name]: value
    });
    this.setState({
      expense: new_exp
    });
  }

  showFormModal(exp) {
    exp.category = exp.category ? exp.category._id : '';
    this.setState({
      expense: exp
    });
    this.toggleModal('showFormModal', true);
  }

  showDeleteModal(exp) {
    this.setState({
      expense: exp
    });
    this.toggleModal('showDeleteModal', true);
  }

  toggleModal(key, val) {
    this.setState({
      [key]: val
    });
  }

  newExpense() {
    this.setState({
      expense: {
        title: '',
        value: 0,
        date: new Date(),
        category: ''
      }
    });
    this.toggleModal('showFormModal', true);
  }

  saveExpense() {
    if (!this.state.expense.title || !this.state.expense.value || this.state.expense.value <= 0
      || !this.state.expense.date || !this.state.expense.category) {
      return alert('Incomplete fields');
    }
    if (this.state.expense._id) {
      this.props.updateExpense(this.state.expense);
    } else {
      this.props.createExpense(this.state.expense);
    }
  }

  deleteExpense() {
    this.setState({
      isLoading: false
    });
    this.props.deleteExpense(this.state.expense)
  }

  render() {
    const expenses = this.props.expenses.map(expense => (
      <tr key={expense._id}>
        <td>{expense.title}</td>
        <td>{expense.value}</td>
        <td>{expense.category ? expense.category.title : ''}</td>
        <td>{new Date(expense.date).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
        <td className="action"><span onClick={() => this.showFormModal(expense)}><FontAwesomeIcon icon="edit" /></span></td>
        <td className="action"><span onClick={() => this.showDeleteModal(expense)}><FontAwesomeIcon icon="trash" color="red" /></span></td>
      </tr>
    ));
    const categories = this.props.categories.map(category => (
      <option key={category._id} value={category._id}>{category.title}</option>
    ));
    return (
      <Layout>
        <div id="expenses" className="container">
          <div className="row">
            <div className="col-12">
              <div className="header d-md-flex align-items-center">
                <h1 className="mt-2">Expenses</h1>
                <button type="button" className="btn btn-primary mt-2 mt-md-0 ml-lg-auto" onClick={this.newExpense}>CREATE NEW</button>
              </div>
              <hr />
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Value</th>
                      <th scope="col">Category</th>
                      <th scope="col">Date</th>
                      <th scope="col" colSpan="2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses}
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
                    value={this.state.expense.title}
                    onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Value</label>
                  <input
                    name="value"
                    type="number"
                    className="form-control"
                    value={this.state.expense.value}
                    onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input
                    name="date"
                    type="date"
                    className="form-control"
                    value={format_date(this.state.expense.date)}
                    onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    className="form-control"
                    value={this.state.expense.category}
                    onChange={this.handleInputChange}>
                    <option value="">Select category</option>
                    {categories}
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => this.toggleModal('showFormModal', false)}>Close</button>
              <button type="button" className="btn btn-primary" onClick={this.saveExpense}>SAVE</button>
            </div>
          </Modal>
          {/* Delete Modal */}
          <Modal show={this.state.showDeleteModal}>
            <div className="modal-header">
              <h5 className="modal-title">Delete Expense</h5>
              <button type="button" className="close" aria-label="Close" onClick={() => this.toggleModal('showDeleteModal', false)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this expense?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" onClick={() => this.toggleModal('showDeleteModal', false)}>Cancel</button>
              <button type="button" className="btn btn-danger" onClick={() => this.deleteExpense()}>DELETE</button>
            </div>
          </Modal>
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories.items,
  expenses: state.expenses.items,
  newExpense: state.expenses.item
});

export default connect(mapStateToProps, {
  fetchCategories,
  fetchExpenses,
  createExpense,
  updateExpense,
  deleteExpense
})(Expenses);