<%_ if (generate_api_doc) { _%>
/**
* @api {PUT} /api/<%= schema.identifiers.plural.snake %>/:id Update
* @APIname Update
* @APIgroup <%= schema.identifiers.singular.pascal %> Controller
* @apidescription Update a single <%= schema.identifiers.singular.label %>
* @apiSuccess {json} The updated <%= schema.identifiers.singular.label %>
* @apiError (Error) 500 Internal server error
*/
<%_ } else { _%>
// PUT /api/<%= schema.identifiers.plural.snake %>/:id Update
<%_ } _%>
module.exports.update = (req, res, next) => {

  // Pulls values from req.body
  const { <%= objectKeys.join(', ') %> } = req.body

  return <%= schema.identifiers.singular.pascal %>.findByIdAndUpdate(req.params.id, { $set: {
    <%= objectKeys.join(',\n      ') %>
  }}, { new: true })
  .then((response) => {
    return res
    .status(200)
    .send(response)
    .end();
  })
  // .catch( err => next(boom.badImplementation(err)));
};