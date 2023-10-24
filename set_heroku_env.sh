#!/bin/bash


export $(grep -v '^#' .env | xargs)


APP_EXISTS=$(heroku apps | grep "$HEROKU_APP_NAME")

# If the app doesn't exist, create it
if [ -z "$APP_EXISTS" ]; then
    echo "Creating Heroku app: $HEROKU_APP_NAME"
    heroku create $HEROKU_APP_NAME
else
    echo "Heroku app $HEROKU_APP_NAME already exists."
fi

# Set Heroku environment variables
heroku config:set HUBSPOT_ACCESS_KEY=$HUBSPOT_ACCESS_KEY --app $HEROKU_APP_NAME
heroku config:set RETRY_TIMES=$RETRY_TIMES --app $HEROKU_APP_NAME
heroku config:set PIPEDRIVE_URL=$PIPEDRIVE_URL --app $HEROKU_APP_NAME
heroku config:set PIPEDRIVE_API_TOKEN=$PIPEDRIVE_API_TOKEN --app $HEROKU_APP_NAME
heroku config:set NODE_ENV=$NODE_ENV --app $HEROKU_APP_NAME

heroku stack:set container -a $HEROKU_APP_NAME

echo "Environment variables set on Heroku app $HEROKU_APP_NAME."
