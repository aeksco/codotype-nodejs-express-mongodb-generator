<%_ /* MONGOOSE VIRTUALS */ _%>
<%_ schema.relations.forEach((rel) => { _%>
<%_ if ([RelationType.BELONGS_TO, RelationType.HAS_ONE].includes(rel.type)) { _%>
// Specifying a virtual with a `ref` property is how you enable virtual population
<%= schema.identifiers.singular.pascal %>Model.virtual('<%= rel.alias.identifier %>', {
  ref: '<%= rel.schema.identifiers.singular.pascal %>',
  localField: '<%= rel.alias.identifier + "_id" %>',
  foreignField: '_id',
  justOne: true // Only return one <%= rel.schema.identifiers.singular.pascal %>
});

<%_ } else if (rel.type === 'REF_BELONGS_TO') { _%>

// Specifying a virtual with a `ref` property is how you enable virtual population
<%= schema.identifiers.singular.pascal %>Model.virtual('<%= rel.alias.identifier_plural %>', {
  ref: '<%= rel.schema.identifiers.singular.pascal %>',
  localField: '_id',
  foreignField: '<%= schema.identifier + "_id" %>' // TODO - this won't work with alias, needs reverse relation
  // justOne: true // Only return one <%= rel.schema.identifiers.singular.pascal %>
});
<%_ } _%>
<%_ }) _%>

<%_ /* MONGOOSE METHODS */ _%>
<%_ schema.relations.forEach((rel) => { _%>
<%_ if ([RelationType.BELONGS_TO, RelationType.HAS_ONE].includes(rel.type)) { _%>
// Same as above just as a method
<%= schema.identifiers.singular.pascal %>Model.methods.get<%= rel.alias.class_name %> = function () {
  return mongoose.model('<%= rel.schema.identifiers.singular.pascal %>').findById(this.<%= rel.alias.identifier + '_id' %>);
}

<%_ /* TODO - HAS_MANY doesn't work like this */ _%>
<%_ } else if (rel.type === RelationType.HAS_MANY) { _%>
<%= schema.identifiers.singular.pascal %>Model.methods.get<%= rel.alias.class_name_plural %> = function () {
  return mongoose.model('<%= rel.schema.identifiers.singular.pascal %>').find({ _id: this.<%= rel.alias.identifier + '_ids' %> });
}
<%_ } _%>
<%_ }) _%>

<%_ /* MONGOOSE TOJSON SETS */ _%>
<%_ if (schema.relations.map(r => r.type).includes(RelationType.BELONGS_TO)) { _%>
<%= schema.identifiers.singular.pascal %>Model.set('toJSON', { getters: true, virtuals: true });
<%_ } _%>