const router = require('express').Router();
const rolesController = require('../controllers/RoleController');
router.get('/role', rolesController.getAllRoles);
router.post('/role', rolesController.addRole);
router.put('/role/:id', rolesController.updateRole);
router.delete('/role/:id', rolesController.deleteRole);

module.exports = router;

