<%_ if (generate_api_doc) { _%>
/**
* @api {GET} /api/<%= schema.identifiers.plural.snake %>/:id Show
* @APIname Show
* @APIgroup <%= schema.identifiers.singular.pascal %> Controller
* @apidescription Fetch a single <%= schema.identifiers.singular.label %>
* @apiSuccess {json} The requested <%= schema.identifiers.singular.label %>
* @apiError (Error) 500 Internal server error
*/
<%_ } else { _%>
// GET /api/<%= schema.identifiers.plural.snake %>/:id Show
<%_ } _%>
module.exports.show = (req, res, next) => {
  <%= schema.identifiers.singular.pascal %>.findById(req.params.id)
  <%_ schema.relations.forEach((rel) => { _%>
  <%_ if ([RelationType.BELONGS_TO, RelationType.HAS_ONE].includes(rel.type)) { _%>
  .populate({ path: '<%= rel.alias.identifier %>', select: '<%= rel.related_lead_attribute %>' })
  <%_ } _%>
  <%_ }) _%>
  .then((model) => {
    return res
    .status(200)
    .send(model)
    .end();
  })
  // .catch( err => next(boom.badImplementation(err)));

};