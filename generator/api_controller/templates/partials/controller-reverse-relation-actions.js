<%_ schema.references.forEach((rel) => { _%>
<%_ if (rel.type === RelationType.BELONGS_TO) { _%>
<%_ if (generate_api_doc) { _%>
/**
* @api {GET} /api/<%= schema.identifiers.plural.snake %>/:id/<%= rel.alias.identifier_plural %> show<%= rel.alias.class_name_plural %>
* @APIname show<%= rel.alias.class_name_plural %>
* @APIgroup <%= schema.identifiers.singular.pascal %> Controller
* @apidescription Gets related <%= rel.alias.class_name_plural %>
* @apiSuccess {json} The related <%= rel.schema.class_name_plural %> models
* @apiError (Error) 500 Internal server error
*/
<%_ } else { _%>
// GET /api/<%= schema.identifiers.plural.snake %>/:id/<%= rel.alias.identifier_plural %> show<%= rel.alias.class_name_plural %>
<%_ } _%>
module.exports.show<%= rel.alias.class_name_plural %> = (req, res, next) => {
    return <%= rel.schema.identifiers.singular.pascal %>
    .find({ <%= rel.reverse_alias.identifier %>_id: req.params.id })
    <%_ let relatedSchema = blueprint.schemas.find(s => s.id === rel.related_schema_id) _%>
    <%_ relatedSchema.relations.forEach((rel) => { _%>
    <%_ if ([RelationType.BELONGS_TO, RelationType.HAS_ONE].includes(rel.type)) { _%>
    .populate({ path: '<%= rel.alias.identifier %>', select: '<%= rel.related_lead_attribute %>' })
    <%_ } _%>
    <%_ }) _%>
    .then((<%= rel.schema.identifiers.plural.snake %>) => {
        return res
        .status(200)
        .send(<%= rel.schema.identifiers.plural.snake %>)
        .end();
    })
    // .catch( err => next(boom.badImplementation(err)));
};

<%_ } _%>
<%_ }) _%>