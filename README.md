# code-challenge-dealer-service
Serverless microservice to expose dealers and vehicles

## Install and set-up a project

    npm init -y
    npm install serverless
    npm install serverless-offline
    serverless create --template aws-nodejs
    
## Deploy manually in AWS

    serverless config credentials --provider aws --key <key> --secret <secret>
    serverless deploy

## Local serverless test

    serverless offline start

## Recommendations
* Use a short name of service in the serverless.yml

## See Github action for Serverless documentation
https://github.com/serverless/github-action