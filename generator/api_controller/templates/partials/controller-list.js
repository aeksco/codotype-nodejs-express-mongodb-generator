<%_ if (generate_api_doc) { _%>
/**
* @api {get} /api/<%= schema.identifiers.plural.snake %> Index
* @APIname Index
* @APIgroup <%= schema.identifiers.singular.pascal %> Controller
* @apidescription Gets list of current <%= schema.identifiers.plural.label %>
* @apiSuccess {json} Collection of <%= schema.identifiers.plural.label %>
* @apiError (Error) 500 Internal server error
*/
<%_ } else { _%>
// GET /api/<%= schema.identifiers.plural.snake %>/:id Index
<%_ } _%>
module.exports.list = async (req, res, next) => {
  // Gets pagination variables for query
  const { page, per_page, offset } = getPaginationParams(req);

  // NOTE - the `countDocuments` operation is another call to MongoDB
  // This can be potentially expensive, you may want to remove it
  // It's currently included so pagination functions correctly on the front-end
  const count = await <%= schema.identifiers.singular.pascal %>.countDocuments({})

  <%= schema.identifiers.singular.pascal %>.find({})
  <%_ schema.relations.forEach((rel) => { _%>
  <%_ if ([RelationType.BELONGS_TO, RelationType.HAS_ONE].includes(rel.type)) { _%>
  .populate({ path: '<%= rel.alias.identifier %>', select: '<%= rel.related_lead_attribute %>' })
  <%_ } _%>
  <%_ }) _%>
  .limit(per_page)
  .skip(offset)
  .lean()
  .exec()
  .then((<%= schema.identifiers.plural.snake %>) => {
    return res
    .status(200)
    .json({
      page: page,
      per_page: per_page,
      items: <%= schema.identifiers.plural.snake %>,
      count: count
    });
  })
  // .catch((err) => { return next(boom.badImplementation(err)); })

};