const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const  categoryData = await Tag.findAll({
      include: [{ model: Product }]
    })
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const categoryData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!categoryData) {
      res.status(400).json({ message: 'No Category found with this id'});
      return
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  });

router.post('/', async (req, res) => {
    // create a new tag
    try {
      const categoryData = await Tag.create(req.body);
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.put('/:id', async  (req, res) => {
  // update a tag's name by its `id` value
  await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((category) => {
    res.status(200).json(category);
  }) .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;

