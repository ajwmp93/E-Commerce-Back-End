const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'],
        through: { attributes: [] }
      }
    ]
  })
  .then(tags => {
    res.status(200).json(tags);
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve tags' });
  });
});

router.get('/:id', (req, res) => {
  Tag.findByPk(tagId, {
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'],
        through: { attributes: [] }
      }
    ]
  })
  .then(tag => {
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.status(200).json(tag);
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve tag' })
  });
});

router.post('/', (req, res) => {
  const { tag_name } = req.body;
  
  if (!tag_name) {
    return res.status(400).json({ message: 'Tag name is required' });
  }

  Tag.create({
    tag_name
  })
  .then(newTag => {
    res.status(201).json(newTag);
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: 'Failed to create tag' });
  });
});

router.put('/:id', (req, res) => {
  const tagId = parseInt(req.params.id, 10);
  const { tag_name } = req.body;

  if (!tag_name) {
    return res.status(400).json({ message: 'Tag name is required' });
  }

  Tag.findByPk(tagId)
  .then(tag => {
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    return tag.update({ tag_name });
  })
  .then(updatedTag => {
    res.status(200).json(updatedTag);
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: 'Failed to update tag' });
  });
});

router.delete('/:id', (req, res) => {
  const tagId = parseInt(req.params.id, 10);

  Tag.findByPk(tagId)
  .then(tag => {
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    return tag.destroy();
  })
  .then(() => {
    res.status(200).json({ message: 'Tag deleted successfully' });
  })
  .catch (err => {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete tag' })
  });
});

module.exports = router;
