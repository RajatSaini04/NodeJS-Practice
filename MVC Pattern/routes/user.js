const express = require('express');
const router = express.Router()
const { handleGetAllUser,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser, } = require('../controllers/user');

// we use route instead for app.use or app.get() here
// router.get('/', handleGetAllUser) and // router.post('/', handleCreateNewUser) 
// Combined
router.route('/')
    .get(handleGetAllUser)
    .post(handleCreateNewUser)

// GET- PUT - DELETE -- all 3 uses the same route COmbined
router.route('/:id')
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById)

module.exports = router;