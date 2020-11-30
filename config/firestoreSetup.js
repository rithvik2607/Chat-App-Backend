require('dotenv').config();

var type = process.env.TYPE
var project_id = process.env.PROJECT_ID
var private_key_id = process.env.PRIVATE_KEY_ID
var private_key = process.env.PRIVATE_KEY.replace(/\\n/g, '\n')
var client_email = process.env.CLIENT_EMAIL
var client_id = process.env.CLIENT_ID
var auth_uri = process.env.AUTH_URI
var token_uri = process.env.TOKEN_URI
var auth_provider_x509_cert_url = process.env.AUTH_PROVIDER_X509_CERT_URI
var client_x509_cert_url = process.env.CLIENT_X509_CERT_URL

var template = { type, project_id, private_key_id, private_key, client_email, client_id, auth_uri, token_uri, auth_provider_x509_cert_url, client_x509_cert_url}

module.exports = template;