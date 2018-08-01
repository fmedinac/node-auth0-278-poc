var auth0 = require('auth0');
var dotenv    = require('dotenv');	
var express   = require('express');	
var bodyParser = require('body-parser');	

var app = express();
dotenv.load();

app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/'));
app.use(function (req, res, next) {	
  res.header("Access-Control-Allow-Origin", "*");	
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");	
  next();	
});

var managementClient = new auth0.ManagementClient({
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  domain: process.env.AUTH0_DOMAIN,
  scope: 'delete:guardian_enrollments update:users read:guardian_enrollments',
});

var CONNECTION = 'Username-Password-Authentication';

app.post('/regenerate-recovery-code', function (req, res) {
  const id = req.body.id;

  managementClient.regenerateRecoveryCode({ id })
    .then(result => res.send(result))
    .catch(error => {
      res.status(500).send(error.message);
    });
});	

app.get('/guardian-enrollment', function (req, res) {
  const id = req.query.id;

  managementClient.getGuardianEnrollment({ id })
    .then(result => res.send(result))
    .catch(error => {
      res.status(500).send(error.message);
    });
});	

app.delete('/guardian-enrollment', function (req, res) {
  const id = req.body.id;

  managementClient.deleteGuardianEnrollment({ id })
    .then(result => res.send(result))
    .catch(error => {
      res.status(500).send(error.message);
    });
});	

app.listen(3001);
console.log('listening on port http://localhost:3001');
