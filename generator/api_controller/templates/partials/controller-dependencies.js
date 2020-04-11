<%_ let relationImports = [] _%>
<%_ schema.relations.forEach((relation) => { _%>
<%_ if (relation.identifiers.source.canonical.pascal !== schema.identifiers.singular.pascal && !relationImports.includes(relation.identifiers.source.canonical.pascal)) { _%>
<%_ relationImports.push(relation.identifiers.source.canonical.pascal) _%>
const <%= relation.identifiers.source.canonical.pascal %> = require('../<%= relation.schema.identifier %>/<%= relation.schema.identifier %>.model')
<%_ } _%>
<%_ }) _%>
<%_ schema.references.forEach((relation) => { _%>
<%_ if (relation.identifiers.source.canonical.pascal !== schema.identifiers.singular.pascal && !relationImports.includes(relation.identifiers.source.canonical.pascal)) { _%>
<%_ relationImports.push(relation.identifiers.source.canonical.pascal) _%>
const <%= relation.identifiers.source.canonical.pascal %> = require('../<%= relation.schema.identifier %>/<%= relation.schema.identifier %>.model')
<%_ } _%>
<%_ }) _%>