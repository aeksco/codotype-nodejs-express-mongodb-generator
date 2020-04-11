<%_ if (generate_api_doc) { _%>
/**
* @api {get} /api/<%= schema.identifiers.plural.snake %>/search Search
* @apiName search
* @apiGroup <%= schema.identifiers.singular.pascal %> Controller
* @apiDescription Gets a list of <%= schema.identifiers.plural.pascal %> that match a search query
* @apiPermission authenticated
* @apiSuccess {Collection} root Collection of <%= schema.identifiers.singular.label %> records
* @apiError (500) UnknownException Could not retrieve <%= schema.identifiers.singular.label %> collection
*/
<%_ } else { _%>
// GET /api/<%= schema.identifiers.plural.snake %>/search Search
<%_ } _%>
module.exports.search = async (req, res) => {

  // Assigns query for search
  // let query = req.query.search || ''

  // Ensures correct type casting for query
  // if (query.year) {
  //   query.year['$in'] = _.map(query.year['$in'], (yr) => { return Number(yr) })
  // }

  // TODO - this feels sloppy....
  <%_ if (schema.attributes.filter(attr => [Datatype.STRING, Datatype.TEXT].includes(attr.datatype)).length) { _%>

  let textSearch = req.query.search || ''

  const matchQuery = [
    <%_ schema.attributes.forEach((attr) => { _%>
    <%_ if (attr.datatype !== 'TEXT') { return } _%>
    { <%= attr.identifier _%>: new RegExp(textSearch, 'i') },
    <%_ }) _%>
  ]

  // Assigns matchQuery to queryObject
  // query = {}
  // query['$and'] = [
  //     { '$or': matchQuery }
  // ]

  const query = { '$or': matchQuery }
  <%_ } else { _%>
  const query = {}
  <%_ } _%>

  // Gets pagination variables for query
  const { page, per_page, offset } = getPaginationParams(req);

  // NOTE - the `countDocuments` operation is another call to MongoDB
  // This can be potentially expensive, you may want to remove it
  // It's currently included so pagination functions correctly on the front-end
  const count = await <%= schema.identifiers.singular.pascal %>.countDocuments(query)

  const <%= schema.identifiers.plural.snake %> = <%= schema.identifiers.singular.pascal %>.find(query)
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