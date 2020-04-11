const mongoose = require('mongoose')

// // // //

const <%= schema.identifier %>_attributes = {
  <%- helpers.indent(include('./partials/resource-attributes.js'), 2) %>
}

<%- include('./partials/resource-collection-options.js') %>

const <%= schema.identifiers.singular.pascal %>Model = new mongoose.Schema(<%= schema.identifier %>_attributes, collection_options);

// // // //

<%- include('./partials/resource-relation-methods.js') %>

// // // //

module.exports = mongoose.model('<%= schema.identifiers.singular.pascal %>', <%= schema.identifiers.singular.pascal %>Model)
