const router = require('express').Router()
const jwtDecode = require('jwt-decode')

// Item Model
const Animal = require('../../models/Animal')

// @route  GET api/animals
// @desc   Get all animals
// @access Public
router.get('/', (req, res) => {
  const loggedInUserId = jwtDecode(req.headers.authorization).id
  Animal.find({ user_id: loggedInUserId })
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
  const loggedInUserId = jwtDecode(req.headers.authorization).id

  const newAnimal = new Animal({
    name: req.body.name,
    type: req.body.type,
    image_public_url: req.body.imgPublicUrl,
    user_id: loggedInUserId
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
