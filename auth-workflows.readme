# A) Authentication workflows
-------------------------

## with session / cookies (the one used in this demo app)

- user submits login credentials (email, password)
- server verifies the credentials against the db
- server creates a temporary user session
- server issues a cookie with a session ID
- client sends the cookie with each request
- server validates it against the session store & grants access
- when user logs out, server destroys the session and clears the cookie


## Alternative with tokens (ex: JWT) / client localStorage

- user payload is embedded in a token
- token is signed et base64url encoded
  -- sent typicaly via Authorization header
  -- stored in localStorage (in plain text)
- server retrieves user info from the token (trusted because signed)
- no user sessions are stored server side
- only revoked tokens are persisted
- refresh token sent to renew the access token

###############################################