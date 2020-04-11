<%_ if (generate_api_doc) { _%>
/**
* @api {get} /api/<%= schema.identifiers.plural.snake %>/profile Profile
* @APIname Profile
* @APIgroup <%= schema.identifiers.singular.pascal %> Controller
* @apidescription Gets profile of the current <%= schema.identifiers.singular.label %>
* @apiSuccess {json} User's profile
* @apiError (Error) 500 Internal server error
*/
<%_ } else { _%>
// GET /api/<%= schema.identifiers.plural.snake %>/profile Profile
<%_ } _%>
exports.profile = async (req, res) => {
  const user = await <%= schema.identifiers.singular.pascal %>.findOne({ email: req.user.email }, '-__v').exec()
  if (user) { return res.json(user) }
  return res.status(401).json({ message: 'No user found' })
}