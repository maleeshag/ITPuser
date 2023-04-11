const express = require('express')
const router = express.Router()
const organizationController = require('../controllers/organizationsController')

router.route('/')
    .get(organizationController.getAllOrganization)
    .post(organizationController.createNewOrganization)
    .patch(organizationController.updateOrganization)
    .delete(organizationController.deleteOrganization)

module.exports = router