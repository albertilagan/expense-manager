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
      <tr key={expense._id}>
        <td>{expense.title}</td>
        <td>{expense.value}</td>
        <td>{expense.category ? expense.category.title : ''}</td>
        <td>{new Date(expense.date).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
        <td><span className="action" dangerouslySetInnerHTML={{ __html: octicons.x.toSVG() }}></span></td>
      </tr>
    ));
    return (
      <Layout>
        <div id="expenses" className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="text-light mt-2">Expenses</h1>
              <hr />
              <table className="table table-dark">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses}
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
  expenses: state.expenses.items,
  newExpense: state.expenses.item
});

export default connect(mapStateToProps, { fetchExpenses })(Expenses);