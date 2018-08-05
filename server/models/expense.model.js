const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required.']
  },
  value: {
    type: Number,
    required: [true, 'Value is required.']
  },
  date: {
    type: Date,
    required: [true, 'Date is required.']
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category',
    required: [true, 'Category is required']
  }
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

module.exports = Expense = mongoose.model('expense', ExpenseSchema);