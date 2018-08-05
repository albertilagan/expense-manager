import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchExpenses } from './../../actions/expenseAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from './../../components/Layout';
import Modal from './../../components/Modal/Modal';

class Expenses extends Component {
  constructor() {
    super();
    this.state = {
      showEditModal: false,
      showDeleteModal: false
    }
  }

  componentDidMount() {
    this.props.fetchExpenses();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newExpense) {
      // add to list
    }
  }

  editExpense(cat) {
    this.toggleModal('showEditModal', true);
  }

  deleteExpense(cat) {
    this.toggleModal('showDeleteModal', true);
  }

  toggleModal(key, val) {
    this.setState({
      [key]: val
    });
  }

  render() {
    const expenses = this.props.expenses.map(expense => (
      <tr key={expense._id}>
        <td>{expense.title}</td>
        <td>{expense.value}</td>
        <td>{expense.category ? expense.category.title : ''}</td>
        <td>{new Date(expense.date).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
        <td className="action"><span onClick={() => this.editExpense(expense)}><FontAwesomeIcon icon="edit" /></span></td>
        <td className="action"><span onClick={() => this.deleteExpense(expense)}><FontAwesomeIcon icon="trash" color="red" /></span></td>
      </tr>
    ));
    return (
      <Layout>
        <div id="expenses" className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="text-light mt-2">Expenses</h1>
              <hr />
              <div className="table-responsive">
                <table className="table table-dark">
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
              <button type="button" className="btn btn-danger">DELETE</button>
            </div>
          </Modal>
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  expenses: state.expenses.items,
  newExpense: state.expenses.item
});

export default connect(mapStateToProps, { fetchExpenses })(Expenses);