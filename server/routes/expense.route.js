const Expense = require('./../models/expense.model');
const Category = require('./../models/category.model');

const init = (router) => {

  // Get All Expenses
  router.get('/expenses', (req, res, next) => {
    Expense
      .find()
      .populate('category')
      .exec((err, payload) => {
        if (err) {
          return next(err);
        }
        res.json(payload)
      });
  });

  // Post new Expense
  router.post('/expenses', (req, res, next) => {
    const body = req.body;
    const data = {
      title: body.title,
      value: body.value,
      date: body.date,
      category: body.category
    }
    const newExpense = new Expense(data);
    Category.findById(data.category, (err, cat) => {
      if (err || !cat) return next('Category not exist!');
      newExpense.save((err, payload) => {
        if (err) return next(err.message);
        Expense
          .findById(payload._id)
          .populate('category')
          .exec((err, data) => {
            if (err) return next(err.message);
            return res.json(data);
          });
      });
    });
  });

  // Update new Expense
  router.put('/expenses/:id', (req, res, next) => {
    const exp_id = req.params.id;
    const body = req.body;
    const data = {
      title: body.title,
      value: body.value,
      date: body.date,
      category: body.category
    }
    Category.findById(data.category, (err, cat) => {
      if (err || !cat) return next('Category not exist!');
      Expense.findByIdAndUpdate(
        exp_id,
        data,
        { new: true })
        .populate('category')
        .exec((err, payload) => {
          if (err) return next(err.message);
          return res.json(payload);
        });
    });
  });

  // Delete Expense
  router.delete('/expenses/:id', (req, res, next) => {
    const cat_id = req.params.id;
    Expense
      .findByIdAndRemove(cat_id, (err, payload) => {
        if (err) return next(err.message);
        return res.json(payload);
      });
  });

  return router;
}

module.exports = init;