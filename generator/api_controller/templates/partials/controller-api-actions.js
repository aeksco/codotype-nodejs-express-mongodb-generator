<%_ schemaApiActions.forEach((action) => { _%>
<%_ if (action.scope === 'ROOT' && generate_api_doc) { _%>
/**
* @api {<%= action.verb %>} /api/<%= schema.identifiers.plural.snake %>/<%= action.uri %> <%= action.label %>
* @APIname <%= action.label %>
* @APIgroup <%= schema.identifiers.singular.pascal %> Controller
* @apidescription Executes the <%= action.label %> API Action
* @apiSuccess {json} The result of the <%= action.label %> API Action
* @apiError (Error) 500 Internal server error
*/
<%_ } else if (action.scope === 'MODEL' && generate_api_doc) { _%>
/**
* @api {<%= action.verb %>} /api/<%= schema.identifiers.plural.snake %>/:id/<%= action.uri %> :id/<%= action.label %>
* @APIname <%= action.label %>
* @APIgroup <%= schema.identifiers.singular.pascal %> Controller
* @apidescription Executes the <%= action.label %> API Action
* @apiSuccess {json} The result of the <%= action.label %> API Action
* @apiError (Error) 500 Internal server error
*/
<%_ } else if (action.scope === 'ROOT') { _%>
// <%= action.verb %> /api/<%= schema.identifiers.plural.snake %>/<%= action.uri %> <%= action.label %>
<%_ } else if (action.scope === 'MODEL') { _%>
// <%= action.verb %> /api/<%= schema.identifiers.plural.snake %>/:id/<%= action.uri %> <%= action.label %>
<%_ } _%>
<%_ if (action.scope === 'ROOT') { _%>
module.exports.<%= action.function_name %> = async (req, res, next) => {

  // Gets pagination variables for query
  const { page, per_page, offset } = getPaginationParams(req);

  // NOTES - remove
  // .find({ user_id: req.user.id })
  const items = await <%= schema.identifiers.singular.pascal %>
  .find({})
  <%_ schema.relations.forEach((rel) => { _%>
  <%_ if ([RelationType.BELONGS_TO, RelationType.HAS_ONE].includes(rel.type)) { _%>
  .populate({ path: '<%= rel.alias.identifier %>', select: '<%= rel.related_lead_attribute %>' })
  <%_ } _%>
  <%_ }) _%>
  .limit(per_page)
  .skip(offset)
  .lean()
  .exec()
  // .catch( err => next(boom.badImplementation(err)));

  return res
  .status(200)
  .json({ page, per_page, items });
};

<%_ } else if (action.scope === 'MODEL') { _%>
module.exports.<%= action.function_name %> = async (req, res, next) => {

  //   user_id: req.user.id,
  const payload = {  } // TODO - add attributes here that you would like to change
  const model = await  <%= schema.identifiers.singular.pascal %>.findByIdAndUpdate(req.params.id, { $set: payload }, { new: true })
  <%_ schema.relations.forEach((rel) => { _%>
  <%_ if ([RelationType.BELONGS_TO, RelationType.HAS_ONE].includes(rel.type)) { _%>
  .populate({ path: '<%= rel.alias.identifier %>', select: '<%= rel.related_lead_attribute %>' })
  <%_ } else if (rel.type === 'REF_BELONGS_TO') { _%>
  // .populate({ path: '<%= rel.alias.identifier_plural %>', select: '<%= rel.related_lead_attribute %>' })
  <%_ } _%>
  <%_ }) _%>
  // .catch( err => next(boom.badImplementation(err)));

  return res
  .status(200)
  .send(model)
  // .send(response.toJSON({ getters: true, virtuals: true }))
  .end();
};

<%_ } _%>
<%_ }) _%>