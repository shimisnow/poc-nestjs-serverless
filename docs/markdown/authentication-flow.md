## How to authenticate, issue and invalidate tokens

## Login

The login process is simples:

1. An API call is made with username and password
2. If the user exists, is active and the password is correct, issues an `accessToken` and `refreshToken`
3. Each token have information about the `userId` and a `loginId` that represents this login request

```mermaid
stateDiagram-v2
direction LR

[*] --> login
state "Login endpoint" as auth
auth --> login: accessToken + refreshToken
login --> auth: username + password
```

## Logout

The logout process is:

1. The endpoint requires an `accessToken`
2. The `loginId` is extracted and added to the cache to mark that the token is now invalid

Once a login request is made, all access and refresh tokens has the same `loginId`. This way a logout process invalidates all access and refresh tokens issued without the need to store each token into database

```mermaid
stateDiagram-v2
direction LR

state "Loggout request" as loggout_req
state "Loggout response" as loggout_res

[*] --> loggout_req: accessToken

state "Verifies if token was invalidated by loggout or password change" as verify
loggout_req --> verify

state is_valid <<choice>>
verify --> is_valid

state "Invalid token" as invalid_token {
    state "The token has already been invalidated and the operation is not allowed" as unauthorized
}

is_valid --> invalid_token

state "Valid token" as valid_token {
    state "Performs the operation and invalidates the token" as invalidate

}

is_valid --> valid_token

invalid_token --> loggout_res
valid_token --> loggout_res
loggout_res --> [*]
```
