const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewsController');

router.get('/', viewController.getOverview);
router.get('/tour/:slug', viewController.getTour);
router.get('/login', viewController.getLoginForm);

module.exports = router;
