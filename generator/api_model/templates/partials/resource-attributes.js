<%_ schema.attributes.forEach((attr) => { _%>
<%_ if (attr.datatype === Datatype.BOOLEAN) { _%>
<%= attr.identifier %>: {
  type: Boolean
},
<%_ } else if ([Datatype.INTEGER, Datatype.FLOAT].includes(attr.datatype)) { _%>
<%= attr.identifier %>: {
  type: Number,
  required: <%= attr.required %>,
  unique: <%= attr.unique %>
},
<%_ } else if ([Datatype.DATE, Datatype.TIME, Datatype.DATETIME].includes(attr.datatype)) { _%>
<%= attr.identifier %>: {
  type: Date,
  required: <%= attr.required %>,
  unique: <%= attr.unique %>
},
<%_ } else if (attr.datatype === Datatype.JSON) { _%>
<%= attr.identifier %>: {
  type: mongoose.Schema.Types.Mixed,
  required: <%= attr.required %>,
  default: {}
},
<%_ } else if (attr.datatype === Datatype.STRING_ARRAY){ _%>
<%= attr.identifier %>: {
  type: [String],
  required: <%= attr.required %>,
  unique: <%= attr.unique %>,
  default: []
},
<%_ } else { _%>
<%= attr.identifier %>: {
  type: String,
  required: <%= attr.required %>,
  unique: <%= attr.unique %>
},
<%_ } _%>
<%_ }) _%>
<%_ schema.relations.forEach((rel) => { _%>
<%_ if ([RelationType.BELONGS_TO, RelationType.HAS_ONE].includes(rel.type)) { _%>
<%= rel.alias.identifier + '_id' %>: {
  type: mongoose.Schema.Types.ObjectId,
  ref: '<%= rel.schema.identifiers.singular.pascal %>'
},
<%_ } else if (rel.type === RelationType.HAS_MANY) { _%>
<%= rel.alias.identifier + '_ids' %>: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: '<%= rel.schema.identifiers.singular.pascal %>'
}],
<%_ } _%>
<%_ }) _%>