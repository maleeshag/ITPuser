const Organization = require('../models/Organization')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc Get all organizations
// @route GET /organizations
// @access Private

const getAllOrganization = asyncHandler(async (req, res) => {
    // Get all organizations from MongoDB
    const organization = await Organization.find().select('-password').lean()

    // If no users 
    if (!organization?.length) {
        return res.status(400).json({ message: 'No organization found' })
    }

    res.json(organization)
})

// @desc Create new organization
// @route POST /organizations
// @access Private

const createNewOrganization = asyncHandler(async (req, res) => {
    const { orgname, email, password} = req.body

    // Confirm data
    if (!orgname ||!email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate orgname
    const duplicate = await Organization.findOne({ orgname }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate organization name' })
    }

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10) 

    const orgObject = { orgname,email, "password": hashedPwd}

    // Create and store new organization
    const organization = await Organization.create(orgObject)

    if (organization) { //created 
        res.status(201).json({ message: `New organization ${orgname} created` })
    } else {
        res.status(400).json({ message: 'Invalid organization data received' })
    }
})

// @desc Update a organization
// @route PATCH /organizations
// @access Private

const updateOrganization = asyncHandler(async (req, res) => {
    const { id,email, orgname,active, password } = req.body

    // Confirm data 
    if (!id ||!email || !orgname || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields except password are required' })
    }

    // Does the organization exist to update?
    const organization = await Organization.findById(id).exec()

    if (!organization) {
        return res.status(400).json({ message: 'Organization not found' })
    }

    // Check for duplicate 
    const duplicate = await Organization.findOne({ orgname }).lean().exec()

    // Allow updates to the original organization 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate organization name' })
    }

    organization.orgname = orgname
    organization.active = active
    organization.email=email

    if (password) {
        // Hash password 
        organization.password = await bcrypt.hash(password, 10) // salt rounds 
    }

    const updatedOrganization = await organization.save()

    res.json({ message: `${updatedOrganization.orgname} updated` })
})

// @desc Delete a organization
// @route DELETE /organizations
// @access Private

const deleteOrganization = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Organization ID Required' })
    }

    // // Does the user still have assigned notes?
    // const note = await Note.findOne({ user: id }).lean().exec()
    // if (note) {
    //     return res.status(400).json({ message: 'User has assigned notes' })
    // }

    // Does the organization exist to delete?
    const organization = await Organization.findById(id).exec()

    if (!organization) {
        return res.status(400).json({ message: 'Organization not found' })
    }

    const result = await organization.deleteOne()

    const reply = `Orgname ${result.orgname} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllOrganization,
    createNewOrganization,
    updateOrganization,
    deleteOrganization
}