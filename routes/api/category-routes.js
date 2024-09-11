const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [Product]
    });
    res.status(200).json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve categories' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id, 10);
    const category = await Category.findByPK(categoryId, {
      include: [Product]
    });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve category' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { category_name } = req.body;

    if (!category_name) {
      return res.status(400).json({ message: 'Category name is required' });
    }
    const newCategory = await Category.create({
      category_name
    });
    res.status(201).json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create category' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const categoryId = parseInt(req.paramsms.id, 10);
    const { category_name } = req.body;

    if (!category_name) {
      return res.status(400).json({ message: 'Category name is required' });
    }
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    await category.update({
      category_name
    });
    res.status(200).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update category' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id, 10);
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found '});
    }
    await category.destroy();

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete category' });
  }
});

module.exports = router;
