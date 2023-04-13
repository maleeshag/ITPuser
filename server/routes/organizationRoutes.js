const express = require('express')
const router = express.Router()
const organizationController = require('../controllers/organizationsController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(organizationController.getAllOrganization)
    .post(organizationController.createNewOrganization)
    .patch(organizationController.updateOrganization)
    .delete(organizationController.deleteOrganization)

module.exports = router