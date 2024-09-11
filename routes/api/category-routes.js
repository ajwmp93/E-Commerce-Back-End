const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
      include: [Product]
    })
    .then(categories => {
      res.status(200).json(categories);
    })
    .catch (err => {
      console.error(err);
      res.status(500).json({ message: 'Failed to retrieve categories' });
    });
});

router.get('/:id', (req, res) => {
    const categoryId = parseInt(req.params.id, 10);
    
    Category.findByPK(categoryId, {
      include: [Product]
    })
    .then(category => {
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
    })
    .catch (err => {
      console.error(err);
      res.status(500).json({ message: 'Failed to retrieve category' });
    });
});

router.post('/', (req, res) => {
    const { category_name } = req.body;

    if (!category_name) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    Category.create({
      category_name
    })
    .then(newCategory => {
      res.status(201).json(newCategory);
    })
    .catch (err => {
      console.error(err);
      res.status(500).json({ message: 'Failed to create category' });
    })
});

router.put('/:id', (req, res) => {
    const categoryId = parseInt(req.paramsms.id, 10);
    const { category_name } = req.body;

    if (!category_name) {
      return res.status(400).json({ message: 'Category name is required' });
    }
    
    Category.findByPk(categoryId)
    .then(category => {
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      return category.update({ category_name })
    })
    .then(updatedCategory => {
      res.status(200).json(updatedCategory);
    })
    .catch (err => {
      console.error(err);
      res.status(500).json({ message: 'Failed to update category' });
    });
});

router.delete('/:id', (req, res) => {
    const categoryId = parseInt(req.params.id, 10);
    
    Category.findByPk(categoryId)
    .then(category => {
      if (!category) {
        return res.status(404).json({ message: 'Category not found '});
      }
      return category.destroy();
    })
    .then(() => {
      res.status(200).json({ message: 'Category deleted successfully' });
    })
    .catch (err => {
      console.error(err);
      res.status(500).json({ message: 'Failed to delete category' });
    });
});

module.exports = router;
