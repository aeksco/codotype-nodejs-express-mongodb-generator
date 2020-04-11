const router = require('express').Router()

// // // //

// Bootstrap API module routers
router.use('/auth', require('./api/auth'))
<%_ project.schemas.forEach((schema) => { _%>
router.use('/<%= schema.identifiers.plural.pascal %>', require('./api/<%= schema.identifiers.singular.snake %>'))
<%_ }) _%>

// // // //

module.exports = router
