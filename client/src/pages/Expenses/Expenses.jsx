import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchExpenses } from './../../actions/expenseAction';
import Layout from './../../components/Layout';

class Expenses extends Component {
  componentDidMount() {
    this.props.fetchExpenses();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newExpense) {
      // add to list
    }
  }

  render() {
    const expenses = this.props.expenses.map(expense => (
      <div key={expense._id}>
        <h3>Title: <span>{expense.title}</span></h3>
        <p>Value: <span>{expense.value}</span></p>
        <p>Category: <span>{expense.category.title}</span></p>
        <p>Date: <span>{new Date(expense.date).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })}</span></p>
        <hr />
      </div>
    ));
    return (
      <Layout>
        <div id="expenses" className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="mt-2">Expenses</h1>
              <hr />
              {expenses}
            </div>
          </div>
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