---
title: >
  Creating Serverless REST APIs: Less vs. Terraform
description: >
  In this article we will build the same REST API using both Terraform and Less, demonstrating how much faster, easier, and more reliable it is to achieve the same result with Less.

  Less is an easy to use framework that automates the creation and deployment of your serverless applications to the cloud (AWS, Google Cloud, and Azure). Write essentially the same Javascript, Python, Go, or Rust code that you are already accustomed to and Less handles the rest. _You'll forget the cloud is there!_
authors: nilson_nascimento
tags: [terraform, devops, serverless, rest apis]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In this article we will build the same REST API using both Terraform and Less, demonstrating how much faster, easier, and more reliable it is to achieve the same result with Less.

Less is an easy to use framework that automates the creation and deployment of your serverless applications to the cloud (AWS, Google Cloud, and Azure). Write essentially the same Javascript, Python, Go, or Rust code that you are already accustomed to and Less handles the rest. _You'll forget the cloud is there!_

<!-- truncate -->

Let's create a REST API with a single route: `GET /hello`

---

## Implementation using Less

### Create the route
<Tabs groupId="programming-language" queryString="programming-language">
  <TabItem value="nodejs" label="Node.js">
  ```bash
  less-cli create route --name less_vs_tf --path /hello --verb get --language js
  ```

  ```js title="less/apis/less_vs_tf/hello/get.js" showLineNumbers
  exports.process = async (request, response) => {
    response.body = 'Hello, world!';
    response.headers['Content-Type'] = 'application/json';
    return response;
  };
  ```
  </TabItem>
  <TabItem value="python" label="Python">
  ```bash
  less-cli create route --name less_vs_tf --path /hello --verb get --language py
  ```

  ```js title="less/apis/less_vs_tf/hello/get.py" showLineNumbers
  def process(request, response):
    response['body'] = 'Hello, world!'
    response['headers']['Content-Type'] = 'application/json'
    return response    
  ```
  </TabItem>
  <TabItem value="go" label="Go">
  :::note
  Go examples will be added soon.
  :::
  </TabItem>
  <TabItem value="rust" label="Rust">
  :::note
  Rust examples will be added soon.
  :::
  </TabItem>
</Tabs>

### Deploy and test
Deploy your serverless Less project to AWS:
```bash
less-cli deploy less-vs-tf
# [less-cli] Building... ⚙️
# [less-cli] Build complete ✅
# [less-cli] Deploying... 🚀
# [less-cli] Deployment complete ✅
# [less-cli] Resources
# [less-cli]   - API URLs
# [less-cli]     - less-vs-tf: https://[PROJECT_NAME]-less-vs-tf.api.eu-0.a83b464c9.less.chuva.cv
```

Use the URL in the deployment output to test your `GET /hello` route:
```bash
curl [BASE_URL]/hello
```

:::tip It's as easy as that!
Using Less we have easily created and deployed a serverless application to AWS in seconds! Check out the [Less Documentation](/) to learn how to create [WebSockets](/web-sockets), [Pub/Sub](/topics_subscribers), [CRON Jobs](/cron-jobs) and more!
:::

:::warning Spoiler Alert!
You will notice below that the Terraform examples only apply to Node.js. Using Less however, we have already reached our goal using **Node.js**, **Python**, **Go**, or **Rust** and _a single, simple code file_!
:::

---

## Implementation using Terraform

:::note
The Terraform examples in this article use [this Hashicorp article](https://developer.hashicorp.com/terraform/tutorials/aws/lambda-api-gateway) as a reference.
:::

### Create the initial infrastructure
Getting started with the Terraform tutorial we are greeted with the following information:
1. If you are new to Terraform, [complete the Get Started collection first](https://developer.hashicorp.com/terraform/tutorials/aws-get-started) (this is a rabbit hole of 8 tutorials totaling 44 minutes of reading time).
2. Install Terraform and the AWS CLI.
3. Create AWS account and CLI credentials.

Now that we have all that set up we can start coding but first we need to clone the [Learn Terraform Lambda and API Gateway](https://github.com/hashicorp/learn-terraform-lambda-api-gateway) GitHub repository for the Terraform tutorial.

Great, now we can start coding our route!

Wait...

We still need to update our `terraform.tf` file to comment out the `cloud` block:
```js {3-9} title="terraform.tf" showLineNumbers
terraform {
  
  /*
  cloud {
    workspaces {
      name = "learn-terraform-lambda-api-gateway"
    }
  }
  */
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.38.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.6.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.4.2"
    }
  }

  required_version = "~> 1.2"
}
```

Initialize the config:
```bash
terraform init
```

And apply the config to create the S3 bucket:
```bash
terraform apply
```
This is an interactive command. Respond with "yes" when prompted.

### Write the route application code

Now that we're ready to start writing code, let's write our route logic:
```js title="hello-world/hello.js" showLineNumbers
module.exports.handler = async (event) => {
  console.log('Event: ', event);
  let responseMessage = 'Hello, World!';

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: responseMessage,
    }),
  }
}
```

:::danger Not done yet...
You would be fooled if you thought we were done... 😕
:::

### Create and upload a zipped code archive
Now that the application code is ready let's see how to finish creating our function infrastructure.

:::note
Depending on the programming language used the following steps will be different. 
:::

In order to package and deploy our function code let's update the `main.tf` file with the following code:
```js title="main.tf" showLineNumbers
data "archive_file" "lambda_hello_world" {
  type = "zip"

  source_dir  = "${path.module}/hello-world"
  output_path = "${path.module}/hello-world.zip"
}

resource "aws_s3_object" "lambda_hello_world" {
  bucket = aws_s3_bucket.lambda_bucket.id

  key    = "hello-world.zip"
  source = data.archive_file.lambda_hello_world.output_path

  etag = filemd5(data.archive_file.lambda_hello_world.output_path)
}
```

Here we've prepared to create a zip archive of our code and upload it to an S3 bucket.

Let's create the bucket (remember to respond to the prompt with "yes"):
```bash
terraform apply
```

### Create the function infrastructure
We still have a long way to go...

Let's update our `main.tf` to:
1. Configure a Lambda function that uses the zipped code archive.
2. Configure roles for the route function.
3. Configure Cloudwatch for the function logs.
4. Configure IAM roles for the function.
5. Attach a Lambda execution role to the IAM policy.

Add the following to `main.tf`:
```js title="main.tf" showLineNumbers
resource "aws_lambda_function" "hello_world" {
  function_name = "HelloWorld"

  s3_bucket = aws_s3_bucket.lambda_bucket.id
  s3_key    = aws_s3_object.lambda_hello_world.key

  runtime = "nodejs20.x"
  handler = "hello.handler"

  source_code_hash = data.archive_file.lambda_hello_world.output_base64sha256

  role = aws_iam_role.lambda_exec.arn
}

resource "aws_cloudwatch_log_group" "hello_world" {
  name = "/aws/lambda/${aws_lambda_function.hello_world.function_name}"

  retention_in_days = 30
}

resource "aws_iam_role" "lambda_exec" {
  name = "serverless_lambda"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Sid    = ""
      Principal = {
        Service = "lambda.amazonaws.com"
      }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}
```

Finally, let's update our `outputs.tf` code to output our Lambda function's name:
```js title="outputs.tf" showLineNumbers
output "function_name" {
  description = "Name of the Lambda function."

  value = aws_lambda_function.hello_world.function_name
}
```

### Create the route infrastructure
We have a few final configurations to make before we can finally make an HTTP request to our route.

Let's update our `main.tf` file to configure our API Gateway:
```js title="main.tf" showLineNumbers
resource "aws_apigatewayv2_api" "lambda" {
  name          = "serverless_lambda_gw"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "lambda" {
  api_id = aws_apigatewayv2_api.lambda.id

  name        = "serverless_lambda_stage"
  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gw.arn

    format = jsonencode({
      requestId               = "$context.requestId"
      sourceIp                = "$context.identity.sourceIp"
      requestTime             = "$context.requestTime"
      protocol                = "$context.protocol"
      httpMethod              = "$context.httpMethod"
      resourcePath            = "$context.resourcePath"
      routeKey                = "$context.routeKey"
      status                  = "$context.status"
      responseLength          = "$context.responseLength"
      integrationErrorMessage = "$context.integrationErrorMessage"
      }
    )
  }
}

resource "aws_apigatewayv2_integration" "hello_world" {
  api_id = aws_apigatewayv2_api.lambda.id

  integration_uri    = aws_lambda_function.hello_world.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "hello_world" {
  api_id = aws_apigatewayv2_api.lambda.id

  route_key = "GET /hello"
  target    = "integrations/${aws_apigatewayv2_integration.hello_world.id}"
}

resource "aws_cloudwatch_log_group" "api_gw" {
  name = "/aws/api_gw/${aws_apigatewayv2_api.lambda.name}"

  retention_in_days = 30
}

resource "aws_lambda_permission" "api_gw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.hello_world.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.lambda.execution_arn}/*/*"
}
```

Here's what these changes are doing:
1. Define our API Gateway and HTTP protocol.
2. Create a stage for deployments and testing.
3. Configure the API Gateway to use the Lambda function created earlier.
4. Map HTTP requests to the Lambda function including the HTTP verb (`GET`) and the route path (`/hello`).
5. Define log groups in order to capture function logs.
6. Give API Gateway permission to access your function.


Finally, we'll add the API Gateway URL to our `outputs.tf` file:
```js title="outputs.tf" showLineNumbers
output "base_url" {
  description = "Base URL for API Gateway stage."

  value = aws_apigatewayv2_stage.lambda.invoke_url
}
```

### Deploy and test
In order to deploy our final project let's apply our changes once again:
```bash
terraform apply
# ...
#
# Terraform will perform the following actions:
# 
#   # aws_lambda_function.hello_world will be updated in-place
#   ~ resource "aws_lambda_function" "hello_world" {
#         id                             = "HelloWorld"
#       ~ last_modified                  = "2021-07-12T15:00:40.113+0000" -> (known after apply)
#       ~ source_code_hash               = "ifMwKWStaDMUDQ3gh68yJzsWNPRfXHfpwMMDJcE1ymA=" -> "1esYQSK1oTfV84+KmDSwhVTBAy8eX6F6uBKLvNsf8AY="
#         tags                           = {}
#         # (18 unchanged attributes hidden)
# 
#         # (1 unchanged block hidden)
#     }
# 
#   # aws_s3_object.lambda_hello_world will be updated in-place
#   ~ resource "aws_s3_object" "lambda_hello_world" {
#       ~ etag               = "ba1ce6b2aa28971920a6c2b8272fe7c6" -> "adb572ecc1b4f3eda7f497aad0bec527"
#         id                 = "hello-world.zip"
#         tags               = {}
#       + version_id         = (known after apply)
#         # (10 unchanged attributes hidden)
#     }
# 
# Plan: 0 to add, 2 to change, 0 to destroy.
# 
# Do you want to perform these actions?
#   Terraform will perform the actions described above.
#   Only 'yes' will be accepted to approve.
# 
#   Enter a value: yes
# 
# aws_s3_object.lambda_hello_world: Modifying... [id=hello-world.zip]
# aws_s3_object.lambda_hello_world: Modifications complete after 0s [id=hello-world.zip]
# aws_lambda_function.hello_world: Modifying... [id=HelloWorld]
# aws_lambda_function.hello_world: Still modifying... [id=HelloWorld, 10s elapsed]
# aws_lambda_function.hello_world: Modifications complete after 17s [id=HelloWorld]
# 
# Apply complete! Resources: 0 added, 2 changed, 0 destroyed.
# 
# Outputs:
# 
# base_url = "https://iz85oarz9l.execute-api.us-east-1.amazonaws.com/serverless_lambda_stage"
# function_name = "HelloWorld"
# lambda_bucket_name = "learn-terraform-functions-quietly-severely-crucial-gnu"
```
Once again, remember to respond "yes" when prompted.

Now we can finally test our Terraform REST API:
```bash
curl "$(terraform output -raw base_url)/hello"
```

---

## Final comparison
Comparing Less & Terraform, we'll notice a few things that they have in common:
- The application code is very simple for any developer and has almost no learning curve.
- Both projects are serverless giving users infinite scale and no server maintenance.
- Both projects are deployed to AWS.
- Both projects conform to the feature and scale requirements.

We'll also notice some key differences:
- As a developer getting started with Less you can learn everything you need to create and deploy your application within a few minutes.
- A Backend Engineer may take several weeks or months to understand the different the cloud providers, serverless technologies, and Terraform before deploying their first production-grade system.
- As a highly experienced DevOps Engineer, simply following the Terraform tutorial referenced in this article would take over an hour (starting from the _Getting Started_ collection).
- Having to manage all of this infrastructure for such a simple task is very time-consuming and error-prone and gets out of control quickly.
- Terraform requires users to adapt to each cloud provider.
- Terraform requires users to adapt their configuration for each programming language.
- Less allows users to completely forget about infrastructure and simply write application code using their preferred languages and frameworks.
