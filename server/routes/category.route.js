const Category = require('./../models/category.model');

const init = (router) => {

  // Get All Categories
  router.get('/categories', (req, res, next) => {
    Category
      .find()
      .then(payload => res.json(payload))
      .catch(err => next(err.message));
  });

  // Post new category
  router.post('/categories', (req, res, next) => {
    const body = req.body;
    const data = {
      title: body.title,
      description: body.description
    }
    const newCat = new Category(data);
    newCat.save((err, payload) => {
      if (err) return next(err.message);
      return res.json(payload);
    })
  });

  // Update new category
  router.put('/categories/:id', (req, res, next) => {
    const cat_id = req.params.id;
    const body = req.body;
    const data = {
      title: body.title,
      description: body.description
    }
    Category
      .findByIdAndUpdate(
        cat_id,
        data,
        { new: true },
        (err, payload) => {
          if (err) return next(err.message);
          return res.json(payload);
        });
  });

  // Delete category
  router.delete('/categories/:id', (req, res, next) => {
    const cat_id = req.params.id;
    Category
      .findByIdAndRemove(cat_id, (err, payload) => {
        if (err) return next(err.message);
        return res.json(payload);
      });
  });

  return router;
}

module.exports = init;