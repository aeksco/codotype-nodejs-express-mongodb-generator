module.exports = {
  id: "codotype-nodejs-express-mongodb-generator",
  label: "Express.js & MongoDB REST API Generator",
  icon:
    "https://jaystack.com/wp-content/uploads/2015/12/nodejs-logo-e1497443346889.png",
  description:
    "Instantly generate Web APIs with Node.js, Express, MongoDB, and Docker",
  tech_tags: [
    "Node.js",
    "Express.js",
    "MongoDB",
    "Docker",
    "JavaScript",
    "ES6"
  ],
  type_tags: ["REST API"],
  self_configuring: false,
  project_path: "express_api",
  github_url: "codotype/codotype-nodejs-express-mongodb-generator",
  version: "0.1.0",
  official: true,
  experience: "Intermediate",
  defaultSchemas: [],
  defaultConfiguration: {},
  supportedDatatypes: [
    "STRING",
    "TEXT",
    "INTEGER",
    "BOOLEAN",
    "TIME",
    "DATE",
    "DATETIME"
  ],
  supportedRelations: ["BELONGS_TO", "HAS_ONE", "HAS_MANY"],
  configuration_groups: [
    {
      id: "DEPLOYMENT_OPTION_GROUP",
      label: "Deployment",
      identifier: "deployment",
      description: "Configure the deployment options for your app",
      type: "CONFIGURATION_GROUP_TYPE_OPTION",
      scope: "CONFIGURATION_GROUP_SCOPE_GLOBAL",
      more_info_url: null,
      attributes: [
        {
          label: "Generate Docker Compose files",
          identifier: "generate_docker_compose",
          type: "BOOLEAN",
          icon: {
            type: "ICON_TYPE_URL",
            value:
              "http://res.cloudinary.com/codotype/image/upload/f_png/v1552166225/tech-logos/docker.svg"
          },
          help:
            "Generate a <code>Dockerfile</code> in both the <code>frontend</code> and <code>backend</code> directories - deploy the whole stack with a single <code>docker-compose up</code> command.",
          default_value: true,
          more_info_url: "https://docs.docker.com/compose/"
        }
      ]
    },
    {
      id: "DOCUMENTATION_OPTION_GROUP",
      label: "Documentation",
      identifier: "documentation",
      description: "Configure the documentation options for your code",
      type: "CONFIGURATION_GROUP_TYPE_OPTION",
      scope: "CONFIGURATION_GROUP_SCOPE_GLOBAL",
      more_info_url: null,
      attributes: [
        {
          label: "Generate APIDoc Documentation Headers",
          identifier: "generate_api_doc",
          type: "BOOLEAN",
          icon: {
            type: "ICON_TYPE_FONT_AWESOME",
            value: "far fa-comment"
          },
          help:
            "Whether or not generate APIDoc-compatible comment headers in your Express.js controllers",
          default_value: false,
          more_info_url: "http://apidocjs.com"
        }
      ]
    },
    {
      id: "API_ACTION_OPTION_GROUP",
      label: "API Action",
      label_plural: "API Actions",
      identifier: "api_action",
      identifier_plural: "api_actions",
      class_name: "ApiAction",
      class_name_plural: "ApiActions",
      description: "Add individual RESTful API actions to your models",
      type: "CONFIGURATION_GROUP_TYPE_ADDON",
      scope: "CONFIGURATION_GROUP_SCOPE_SCHEMA",
      previewTemplate:
        "<small><pre class='bg-dark text-light mb-0' v-if='model.scope === \"COLLECTION\"'>{{model.verb}} /{{ schema.identifier_plural }}/{{model.uri}} - {{ model.function_name }}()</pre><pre class='bg-dark text-light mb-0' v-else>{{model.verb}} /{{ schema.identifier_plural }}/:{{ schema.identifier }}_id/{{model.uri}} - {{ model.function_name }}()</pre></small>",
      more_info_url: null,
      attributes: [
        {
          label: "Verb",
          identifier: "verb",
          help: "The RESTful verb associated with this API Action",
          default_value: "POST",
          type: "STRING_SELECT",
          options: [
            { id: 1, value: "GET", label: "GET" },
            { id: 2, value: "POST", label: "POST" },
            { id: 3, value: "PUT", label: "PUT" },
            { id: 4, value: "DELETE", label: "DELETE" }
          ],
          required: true,
          unique: false
        },
        {
          label: "URI",
          identifier: "uri",
          type: "STRING",
          help: "The URL of this action (don't prefix with /)",
          default_value: "verify",
          required: true,
          unique: false
        },
        {
          label: "Label",
          identifier: "label",
          type: "STRING",
          help: "The label of this API Action",
          default_value: "Verify",
          required: true,
          unique: false
        },
        {
          label: "Function Name",
          identifier: "function_name",
          type: "STRING",
          help: "The name of the function",
          default_value: "verify",
          required: true,
          unique: false
        },
        {
          label: "Scope",
          identifier: "scope",
          help: "The scope of the API Action",
          default_value: "MODEL",
          type: "STRING_SELECT",
          options: [
            { id: 1, value: "MODEL", label: "Model" },
            { id: 2, value: "COLLECTION", label: "Collection" }
          ],
          required: true,
          unique: false
        }
      ]
    }
  ]
};
