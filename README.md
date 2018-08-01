# node-auth0-278-poc

## Install

Create and populate a `.env` file with the following vars:

```
AUTH0_CLIENT_ID=***
AUTH0_CLIENT_SECRET=***
AUTH0_DOMAIN=***.auth0.com
```

Run

```sh
$ yarn
$ yarn start
```

## Endpoints

### Regenerate the recovery code

```sh
curl -X POST \
  http://localhost:3001/regenerate-recovery-code \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{ "id": "auth0|1234567890qwertyuiop" }'
```

### Get Guardian Enrollment

```sh
curl -X GET \
  'http://localhost:3001/guardian-enrollment?id=sms%7Cdev_1234567890' \
  -H 'cache-control: no-cache'
```

### Delete Guardian Enrollment

```sh
curl -X DELETE \
  'http://localhost:3001/guardian-enrollment' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{ "id": "sms|dev_1234567890" }'
```
