# Microservices

A simple stateless microservice in Nodejs, with two major functionalities -
1. Authentication
2. Image Thumbnail Generation

#Public Endpoints: The Login Request body should contain an arbitrary username/password pair. Treat it as a mock
authentication service and accept any username/password. Return a signed Json Web Token(JWT,
https://jwt.io/) which can be used to validate future requests.

#Protected Endpoints: The following endpoint should be protected. The JWT obtained in the “Login” endpoint must be attached
to each request. If the JWT is missing or invalid, these endpoints should reject the request.
If JWT is valid, Create Thumbnail Request should contain a public image URL. Download the image, resize to
50x50 pixels, and return the resulting thumbnail.
