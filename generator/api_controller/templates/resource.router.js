const router = require('express').Router();
const controller = require('./<%= schema.identifier %>.controller');
const { requireAuthenticated, requireRole, requireAdmin } = require('../middleware/authorization')

// // // //

// All routes require authentication
router.use(requireAuthenticated)

// GET /<%= schema.identifiers.plural.snake %>
router.get('/', controller.list);

// GET /<%= schema.identifiers.plural.snake %>/search
// router.get('/search', controller.search);

// POST /<%= schema.identifiers.plural.snake %>
router.post('/', controller.create);

<%_ if (schema.identifier === 'user') { _%>
// GET /<%= schema.identifiers.plural.snake %>/profile
router.get('/profile', controller.profile)

<%_ } _%>
<%_ schemaApiActions.forEach((action) => { _%>
<%_ if (action.scope === 'ROOT' && action.verb === 'GET') { _%>
// GET /<%= schema.identifiers.plural.snake %>/<%= action.uri %>
router.get('/<%= action.uri %>', requireRole('USER'), requireAdmin, controller.<%= action.function_name %>);

<%_ } else if (action.scope === 'ROOT' && action.verb === 'POST') { _%>
// POST /<%= schema.identifiers.plural.snake %>/<%= action.uri %>
router.post('/<%= action.uri %>', requireRole('USER'), requireAdmin, controller.<%= action.function_name %>);

<%_ } else if (action.scope === 'ROOT' && action.verb === 'PUT') { _%>
// PUT /<%= schema.identifiers.plural.snake %>/<%= action.uri %>
router.put('/<%= action.uri %>', requireRole('USER'), requireAdmin, controller.<%= action.function_name %>);

<%_ } else if (action.scope === 'MODEL' && action.verb === 'GET') { _%>
// GET /<%= schema.identifiers.plural.snake %>/:id/<%= action.uri %>
router.get('/:id/<%= action.uri %>', requireRole('USER'), requireAdmin, controller.<%= action.function_name %>);

<%_ } else if (action.scope === 'MODEL' && action.verb === 'POST') { _%>
// POST /<%= schema.identifiers.plural.snake %>/:id/<%= action.uri %>
router.post('/:id/<%= action.uri %>', requireRole('USER'), requireAdmin, controller.<%= action.function_name %>);

<%_ } else if (action.scope === 'MODEL' && action.verb === 'PUT') { _%>
// PUT /<%= schema.identifiers.plural.snake %>/:id/<%= action.uri %>
router.put('/:id/<%= action.uri %>', requireRole('USER'), requireAdmin, controller.<%= action.function_name %>);

<%_ } _%>
<%_ }) _%>
// GET /<%= schema.identifiers.plural.snake %>/:id
router.get('/:id', controller.show);

// PUT /<%= schema.identifiers.plural.snake %>/:id
router.put('/:id', requireAdmin, controller.update);

// DELETE /<%= schema.identifiers.plural.snake %>/:id
router.delete('/:id', requireAdmin, controller.delete);

<%_ /* Iterate over each relation */ _%>
<%_ schema.relations.forEach((each) => { _%>
<%_ if ([RelationType.BELONGS_TO, RelationType.HAS_ONE].includes(each.type)) { _%>
// GET /<%= schema.identifiers.plural.snake %>/:id/<%= each.alias.identifier %>
router.get('/:id/<%= each.alias.identifier %>', controller.show<%= each.alias.class_name %>);

<%_ } else if (each.type === RelationType.HAS_MANY) { _%>
// GET /<%= schema.identifiers.plural.snake %>/:id/<%= each.alias.identifier_plural %>
router.get('/:id/<%= each.alias.identifier_plural %>', controller.show<%= each.alias.class_name_plural %>);

<%_ } else if (each.type === 'REF_BELONGS_TO') { _%>
// GET /<%= schema.identifiers.plural.snake %>/:id/<%= each.alias.identifier_plural %>
router.get('/:id/<%= each.alias.identifier_plural %>', controller.show<%= each.alias.class_name_plural %>);

<%_ } _%>
<%_ }) _%>
// // // //
// // // //
// // // //

<%_ /* Iterate over each relation */ _%>
<%_ schema.references.forEach((each) => { _%>
<%_ if ([RelationType.BELONGS_TO].includes(each.type)) { _%>
// GET /<%= schema.identifiers.plural.snake %>/:id/<%= each.alias.identifier_plural %>
router.get('/:id/<%= each.alias.identifier_plural %>', controller.show<%= each.alias.class_name_plural %>);
<%_ } _%>
<%_ }) _%>

// // // //
// // // //
// // // //
module.exports = router;
