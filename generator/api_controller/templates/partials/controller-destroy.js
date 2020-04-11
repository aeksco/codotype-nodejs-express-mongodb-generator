<%_ if (generate_api_doc) { _%>
/**
* @api {DELETE} /api/<%= schema.identifiers.plural.snake %>/:id Destroy
* @APIname Destroy
* @APIgroup <%= schema.identifiers.singular.pascal %> Controller
* @apidescription Destroy a single <%= schema.identifiers.singular.label %>
* @apiSuccess {json} The destroyed <%= schema.identifiers.singular.label %>
* @apiError (Error) 500 Internal server error
*/
<%_ } else { _%>
// DELETE /api/<%= schema.identifiers.plural.snake %>/:id Destroy
<%_ } _%>
module.exports.delete = (req, res, next) => {
  return <%= schema.identifiers.singular.pascal %>.remove({ _id: req.params.id })
  .then((response) => {
    return res
    .status(200)
    .send(response)
    .end();
  })
  // .catch( err => next(boom.badImplementation(err)));
};
