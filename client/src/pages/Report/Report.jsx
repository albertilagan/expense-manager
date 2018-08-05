import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from './../../components/Layout';
import { Pie } from 'react-chartjs-2';
import { fetchExpenses } from './../../actions/expenseAction';
import './Report.scss';

class Report extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: []
        }]
      }
    }
  }
  componentDidMount() {
    this.props.fetchExpenses();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.expenses) {
      // Get the last 30 days
      const last_30days = nextProps.expenses.filter(itm => {
        const diff = Math.abs(new Date(itm.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
        return diff <= 30;
      });
      this.getChartData(last_30days);
    }
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getChartData(expenses) {
    // Map to just title and value
    let groups = expenses.map(exp => {
      return {
        title: exp.category.title,
        value: exp.value
      }
    });
    // Labels
    let labels = groups.map(exp => {
      return exp.title
    });
    labels = labels.filter((exp, pos) => labels.indexOf(exp) == pos);
    const result = [];
    // Get totals
    groups.reduce((res, val) => {
      if (!res[val.title]) {
        res[val.title] = {
          title: val.title,
          value: 0
        };
        result.push(res[val.title])
      }
      res[val.title].value += val.value;
      return res;
    }, {});

    const values = [];
    const backgrounds = [];
    labels.forEach(val => {
      const tmp = result.find(itm => itm.title === val);
      if (!tmp) {
        values.push(0);
      } else {
        values.push(tmp.value);
      }
      backgrounds.push(this.getRandomColor());
    });

    const data = {
      labels,
      datasets: [{
        data: values,
        backgroundColor: backgrounds
      }]
    }

    this.setState({ data });
  }

  render() {
    return (
      <Layout>
        <div id="report" className="container">
          <Pie id="chart" data={this.state.data} />
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  expenses: state.expenses.items,
});

export default connect(mapStateToProps, { fetchExpenses })(Report);