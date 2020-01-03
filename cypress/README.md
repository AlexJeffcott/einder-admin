# Get going with Cypress

## Pre-requisists

1. you are able to run app locally with docker.

## setting up the environment variables

Here you have two options:

1. You can start by setting up the base .env file and then add the passwords and tokens later by running the following bash command.
2. Alternately, you could use the subsequent bash command to create a function in your bash_profile which does all of that (including all your other ones) for you. You only need to add the default username and passwords and then you can run `tokenme` from any folder to complete recreate of env files with the correct tokens.

```bash
 echo '{
 "E2E_USER": "quality-assurance+beta@medicuja.com",
 # YOU WILL NEED TO ADD THE CORRECT PASSWORD HERE
 "E2E_PASS": "",
 "HTTP_USERNAME": "red",
 # YOU WILL NEED TO ADD THE CORRECT PASSWORD HERE
 "HTTP_PASSWORD": "",
 "LOCAL": false,
 "GRAPHQL_API_AUTH": "Basic cmVkOkJ1ZW5vc0VyaXM=,",
 "GRAPHQL_API_URL_LOCAL_US": "https://qa.nextapi.us.qa.medicuja.de/",
 "GRAPHQL_API_URL_LOCAL_DE": "https://qa.nextapi.de.qa.medicuja.de/",
 "GRAPHQL_API_URL_QA_US": "https://qa.nextapi.us.qa.medicuja.de/",
 "GRAPHQL_API_URL_QA_DE": "https://qa.nextapi.de.qa.medicuja.de/",
 "BASEURL_LOCAL_US": "http://localhost:3004/",
 "BASEURL_LOCAL_DE": "http://localhost:3003/",
 "GRAPHQL_API_URL_LOCAL_US_TOKEN": "",
 "GRAPHQL_API_URL_LOCAL_DE_TOKEN": "",
 "BASEURL_QA_US": "https://qa.us.next.medicuja.de/",
 "BASEURL_QA_DE": "https://qa.de.next.medicuja.de/",
 "GRAPHQL_API_URL_QA_US_TOKEN": "",
 "GRAPHQL_API_URL_QA_DE_TOKEN": "",
 "ACCOUNT_URL_QA_US": "https://qa.amboss.us.qa.medicuja.de/account/",
 "ACCOUNT_URL_QA_DE": "https://qa.amboss.de.qa.medicuja.de/account/"
}' > ~/projects/ui-amboss/amboss-web-ui/cypress.env.json
```

```bash
function tokenme(){
        # $1 is the user login password
        # $2 is the http password
        # $3 is the user login email
        # $4 is the http username
        # $5 is the name of the pr server for the browser url
        # $6 is the name of the pr server for the graphql url
      
        # ENSURE THAT THIS PATH TO ui-amboss IS CORRECT
        cd ~/projects/ui-amboss
      
        # ADD DEFAULTS FOR USERNAMES AND PASSWORDS HERE OR PASS THEM AS ARGS TO THE FUNCTION
        E2E_PW=${1:-'PLEASE ADD A DEFAULT HERE'}
        HTTP_PW=${2:-'PLEASE ADD A DEFAULT  HERE'}
        E2E_UN=${3:-'quality-assurance+beta@medicuja.com'}
        HTTP_USERNAME=${4:-'red'}
      
        if [[ -n $5 ]]
        then
          BASEURL_QA_US='https://'$5'.us.next.medicuja.de/'
          BASEURL_QA_DE='https://'$5'.de.next.medicuja.de/'
        else
          BASEURL_QA_US='https://qa.us.next.medicuja.de/'
          BASEURL_QA_DE='https://qa.de.next.medicuja.de/'
        fi
      
        if [[ -n $6 ]]
        then
          GRAPHQL_API_URL_US='https://'$6'.nextapi.us.next.medicuja.de/'
          GRAPHQL_API_URL_DE='https://'$6'.nextapi.de.next.medicuja.de/'
        else
          GRAPHQL_API_URL_US='https://qa.nextapi.us.qa.medicuja.de/'
          GRAPHQL_API_URL_DE='https://qa.nextapi.de.qa.medicuja.de/'
        fi
      
        GRAPHQL_TOKEN_FOR_QAUS="$(curl ${GRAPHQL_API_URL_US} -s -H 'Content-Type: application/json' --data-binary '{"query":"mutation{\n login(login: \"'"$E2E_UN"'\", password: \"'"$E2E_PW"'\", deviceId: \"DEADBEEF\"){token}}","variables":{}}' | awk -F'"' '$2=="data"{printf("%s", $8)}')"
       if [[ -z ${GRAPHQL_TOKEN_FOR_QAUS} ]]
       then
         GRAPHQL_TOKEN_FOR_QAUS='NO TOKEN RETURNED'
       fi
      
        GRAPHQL_TOKEN_FOR_QADE="$(curl ${GRAPHQL_API_URL_DE} -s -H 'Content-Type: application/json' --data-binary '{"query":"mutation{login(login: \"'"$E2E_UN"'\", password: \"'"$E2E_PW"'\", deviceId: \"DEADBEEF\"){token}}","variables":{}}' | awk -F'"' '$2=="data"{printf("%s", $8)}')"
       if [[ -z ${GRAPHQL_TOKEN_FOR_QADE} ]]
       then
         GRAPHQL_TOKEN_FOR_QADE='NO TOKEN RETURNED'
       fi
      
        echo '
        NODE_ENV=development
        URL_LOCALE_PREFIX=us
        GRAPHQL_TOKEN='${GRAPHQL_TOKEN_FOR_QAUS}'
        EVENT_TRACKING_ENDPOINT='${GRAPHQL_API_URL_US}'api/event-gateway/v1/t
        GRAPHQL_API_URL='${GRAPHQL_API_URL_US}'
        GRAPHQL_API_URL_BROWSER='${GRAPHQL_API_URL_US}'
        GRAPHQL_API_URL_SERVER='${GRAPHQL_API_URL_US}'
        LEGACY_URL=https://www.amboss.com/us/
        ' > .env.us
      
        echo '
        NODE_ENV=development
        URL_LOCALE_PREFIX=de
        GRAPHQL_TOKEN='${GRAPHQL_TOKEN_FOR_QADE}'
        EVENT_TRACKING_ENDPOINT='${GRAPHQL_API_URL_DE}'api/event-gateway/v1/t
        GRAPHQL_API_URL='${GRAPHQL_API_URL_DE}'
        GRAPHQL_API_URL_BROWSER='${GRAPHQL_API_URL_DE}'
        GRAPHQL_API_URL_SERVER='${GRAPHQL_API_URL_DE}'
        LEGACY_URL=https://www.amboss.com/de/
        ' > .env.de
      
        cd amboss-web-ui
      
        echo '
        NODE_ENV=development
        GRAPHQL_API_AUTH="Basic cmVkOkJ1ZW5vc0VyaXM=,"
        NODE_DEBUG=request
        PORT=3003
        PWORD=BuenosErys
        SESSION_SECRET=djofkg
        SENTRY_ORG=miamed
        SENTRY_SERVER_PROJECT=pr-next-nodejs-server
        SENTRY_CLIENT_PROJECT=pr-next-js-frontend
      
        # QA US
        URL_LOCALE_PREFIX=us
        GRAPHQL_TOKEN='${GRAPHQL_TOKEN_FOR_QAUS}'
        EVENT_TRACKING_ENDPOINT='${GRAPHQL_API_URL_US}'api/event-gateway/v1/t
        GRAPHQL_API_URL='${GRAPHQL_API_URL_US}'
        GRAPHQL_API_URL_BROWSER='${GRAPHQL_API_URL_US}'
        GRAPHQL_API_URL_SERVER='${GRAPHQL_API_URL_US}'
        LEGACY_URL=https://www.amboss.com/us/
      
        # QA DE
        #URL_LOCALE_PREFIX=de
        #GRAPHQL_TOKEN='${GRAPHQL_TOKEN_FOR_QADE}'
        #EVENT_TRACKING_ENDPOINT='${GRAPHQL_API_URL_DE}'api/event-gateway/v1/t
        #GRAPHQL_API_URL='${GRAPHQL_API_URL_DE}'
        #GRAPHQL_API_URL_BROWSER='${GRAPHQL_API_URL_DE}'
        #GRAPHQL_API_URL_SERVER='${GRAPHQL_API_URL_DE}'
        #LEGACY_URL=https://www.amboss.com/de/
        ' > .env.local
      
        echo '{
        "E2E_USER": "'${E2E_UN}'",
        "E2E_PASS": "'${E2E_PW}'",
        "HTTP_USERNAME": "red",
        "HTTP_PASSWORD": "'${HTTP_PW}'",
        "LOCAL": false,
        "GRAPHQL_API_AUTH": "Basic cmVkOkJ1ZW5vc0VyaXM=,",
        "GRAPHQL_API_URL_LOCAL_US": "'${GRAPHQL_API_URL_US}'",
        "GRAPHQL_API_URL_LOCAL_DE": "'${GRAPHQL_API_URL_DE}'",
        "GRAPHQL_API_URL_QA_US": "'${GRAPHQL_API_URL_US}'",
        "GRAPHQL_API_URL_QA_DE": "'${GRAPHQL_API_URL_DE}'",
        "BASEURL_LOCAL_US": "http://localhost:3004/",
        "BASEURL_LOCAL_DE": "http://localhost:3003/",
        "GRAPHQL_API_URL_LOCAL_US_TOKEN": "'${GRAPHQL_TOKEN_FOR_QAUS}'",
        "GRAPHQL_API_URL_LOCAL_DE_TOKEN": "'${GRAPHQL_TOKEN_FOR_QADE}'",
        "BASEURL_QA_US": "'${BASEURL_QA_US}'",
        "BASEURL_QA_DE": "'${BASEURL_QA_DE}'",
        "GRAPHQL_API_URL_QA_US_TOKEN": "'${GRAPHQL_TOKEN_FOR_QAUS}'",
        "GRAPHQL_API_URL_QA_DE_TOKEN": "'${GRAPHQL_TOKEN_FOR_QADE}'",
        "ACCOUNT_URL_QA_US": "https://qa.amboss.us.qa.medicuja.de/account/",
        "ACCOUNT_URL_QA_DE": "https://qa.amboss.de.qa.medicuja.de/account/"
        }' > cypress.env.json
      
        echo UN: ${E2E_UN}
        echo PW: ${E2E_PW}
        echo QAUS: ${GRAPHQL_TOKEN_FOR_QAUS}
        echo QADE: ${GRAPHQL_TOKEN_FOR_QADE}
        echo GRAPHQL_API_URL_US: ${GRAPHQL_API_URL_US}
        echo GRAPHQL_API_URL_DE: ${GRAPHQL_API_URL_DE}
        echo BASEURL_QA_US: ${BASEURL_QA_US}
        echo BASEURL_QA_DE: ${BASEURL_QA_DE}
      }
```
You should then be able to run the above using the following args in the following manner (remember the order of the args is vitally important) `tokenme "myPassword" "httpPassword" "ajt@medicuja.com" "red" "ON-cy" "ON-cy"`
## Running it against the online qa builds

- Be sure to add the appropriate passwords and tokens to:
  `ui-amboss/amboss-web-ui/cypress.env.json`
- Then navigate to amboss-web-ui and run:
  ```bash
  yarn cypress:test:qa
  ```

## Running it locally with docker

### Use Cypress which runs against your localhost (3003 and 3004 for de and us respectively) and the qa graphql servers by default.

- ensure that your Docker client is running
- Be sure to add the appropriate passwords and tokens to:
  `ui-amboss/.env.us, ui-amboss/.env.de, ui-amboss/amboss-web-ui/cypress.env.json, and ui-amboss/amboss-web-ui/.env.local`
  or (as described above) simply run:
  ```bash
  tokenme
  ```
- Then run the following in its own terminal instance:
  ```bash
  yarn docker:dev:us
  ```
- Then run the following in its own terminal instance:
  ```bash
  yarn docker:dev:de
  ```
- Then run the following in its own terminal instance:
  ```bash
  yarn cypress:test:local
  ```

