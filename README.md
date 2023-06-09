# code-challenge-dealer-service
Serverless microservice to expose dealers and vehicles

## API Gateway Endpoints

![API Gateway Endpoints](https://i.imgur.com/wlDhr6P.png)

    GET - https://9tjf6hha91.execute-api.us-west-2.amazonaws.com/dealers
    GET - https://9tjf6hha91.execute-api.us-west-2.amazonaws.com/vehicles/{bac}

## Install and set-up a project

    npm init -y
    npm install serverless
    npm install serverless-offline
    npm install node-fetch@2
    npm install yup
    npm install jest --save-dev
    npm install serverless-plugin-include-dependencies --save-dev
    serverless create --template aws-nodejs
    serverless plugin install -n serverless-plugin-common-excludes
    
## Deploy manually in AWS

    serverless config credentials --provider aws --key <key> --secret <secret>
    serverless deploy

## Local serverless test

    serverless offline start

## Recommendations
* Use a short name of service in the serverless.yml

## See Github action for Serverless documentation
https://github.com/serverless/github-action