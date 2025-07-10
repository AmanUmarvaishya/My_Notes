const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const Note = require('../model/Note');
// GET notes
router.get('/', async (req, res) => {
  const notes = await Note.find({ user: req.user });
  res.json(notes);
});

// POST note
router.post('/', [
  body('title').notEmpty()
], validate, async (req, res) => {
  const note = await new Note({ ...req.body, user: req.user }).save();
  res.json(note);
});

// DELETE note
router.delete('/:id', async (req, res) => {
  await Note.deleteOne({ _id: req.params.id, user: req.user });
  res.json({ msg: 'Deleted' });
});

module.exports = router;
