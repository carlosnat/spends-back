const express = require('express')
const router = express.Router()
const groupsController = require('./group.controller')

router.post('/', groupsController.createFamily)
router.get('/', groupsController.getAllFamilies)
router.post('/member/:idFamily', groupsController.addMember)
router.post('/spendgroup/:idFamily', groupsController.addGroupSpend)
router.post('/spendcategory/:idFamily', groupsController.addGroupCategory)
router.post('/spend/:idFamily', groupsController.addSpend)

module.exports = router