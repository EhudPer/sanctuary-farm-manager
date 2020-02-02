const router = require('express').Router()

// Item Model
const Animal = require('../../models/Animal')

// @route  GET api/animals
// @desc   Get all animals
// @access Public
router.get('/', (req, res) => {
  Animal.find()
    .sort({ date: -1 })
    .then(animals => res.json(animals))
})

// @route  GET api/animals/:id
// @desc   Get one animal
// @access Public
router.get('/:id', (req, res) => {
  let id = req.params.id

  Animal.findById(id).then(animal => res.json(animal))
})

// @route  POST api/animals
// @desc   Creat an animal
// @access Public
router.post('/', (req, res) => {
  const newAnimal = new Animal({
    name: req.body.name
  })

  newAnimal.save().then(animal => res.json(animal))
})

// @route  PUT api/animals/:id
// @desc   Update an animal
// @access Public
router.put('/:id', (req, res) => {
  Animal.findById(req.params.id).then(animal => {
    animal
      .updateOne({ name: req.body.name })
      .then(() => res.json({ success: true }))
      // return 404 if not found
      .catch(err => res.status(404).json({ success: false }))
  })
})

// @route  DELETE api/animals/:id
// @desc   Delete an animal
// @access Public
router.delete('/:id', (req, res) => {
  Animal.findById(req.params.id).then(animal => {
    animal
      .remove()
      .then(() => res.json({ success: true }))
      // return 404 if not found
      .catch(err => res.status(404).json({ success: false }))
  })
})

module.exports = router
