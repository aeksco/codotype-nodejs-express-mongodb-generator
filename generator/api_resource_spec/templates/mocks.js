
<%_ blueprint.schemas.forEach((schema) => { _%>
const build<%= schema.class_name %> = () => {
  return Object.assign({}, {
    <%_ if (schema.identifier === 'user') { _%>
    password: 'RANDOM-PASSWORD-' + Math.random().toString(),
    role: 'RANDOM-ROLE',
    admin: false,
    email: 'johndoe-' + Math.random().toString() + '@doe.com',
    <%_ } _%>
    <%_ schema.attributes.forEach((attr, index) => { _%>
    <%_ if (schema.identifier === 'user' && attr.identifier === 'email') { _%>
    <%_ return _%>
    <%_ } else if (attr.datatype === Datatype.STRING) { _%>
    <%= attr.identifier %>: 'STRING-' + Math.random().toString(),
    <%_ } else if (attr.datatype === Datatype.TEXT) { _%>
    <%= attr.identifier %>: 'TEXT-' + Math.random().toString(),
    <%_ } else if (attr.datatype === Datatype.STRING_ARRAY) { _%>
    <%= attr.identifier %>: [],
    <%_ } else if (attr.datatype === Datatype.STRING_SELECT) { _%>
    <%= attr.identifier %>: [],
    <%_ } else if (attr.datatype === Datatype.INTEGER) { _%>
    <%= attr.identifier %>: 0,
    <%_ } else if (attr.datatype === Datatype.FLOAT) { _%>
    <%= attr.identifier %>: 0.0,
    <%_ } else if (attr.datatype === Datatype.BOOLEAN) { _%>
    <%= attr.identifier %>: false,
    <%_ } else if (attr.datatype === Datatype.JSON) { _%>
    <%= attr.identifier %>: {},
    <%_ } else if (attr.datatype === Datatype.DATE) { _%>
    <%= attr.identifier %>: '2019-03-11',
    <%_ } else if (attr.datatype === Datatype.TIME) { _%>
    <%= attr.identifier %>: '17:04:14 GMT-0400',
    <%_ } else if (attr.datatype === Datatype.DATETIME) { _%>
    <%= attr.identifier %>: '3/18/2019, 5:04:51 PM',
    <%_ } _%>
    <%_ }) _%>
    <%_ schema.relations.forEach((rel, index) => { _%>
    <%_ if (rel.type === RelationType.BELONGS_TO) { _%>
    <%= rel.alias.identifier %>_id: null,
    <%_ } else if (rel.type === RelationType.HAS_ONE) { _%>
    <%= rel.alias.identifier %>_id: null,
    <%_ } else if (rel.type === RelationType.HAS_MANY) { _%>
    <%= rel.alias.identifier %>_ids: [],
    <%_ } _%>
    <%_ }) _%>
  })
}

<%_ }) _%>

// // // //

module.exports = {
  <%_ blueprint.schemas.forEach((schema) => { _%>
  build<%= schema.class_name %>,
  <%_ }) _%>
}
