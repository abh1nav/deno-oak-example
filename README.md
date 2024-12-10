# Deno POC

### 1. Install deno

```shell
brew install deno
```

### 2. Install dependencies

```shell
deno install
```

### Run server

```shell
deno run dev
```

### Interact with server

Create a user:

```shell
curl -XPOST -H 'Content-Type: application/json' \
"http://localhost:8080/users" \
-d '{"id": "0000", "name": "asdf", "email": "a@example.com", "password": "password"}'
```

Get user by ID:

```
curl -XGET "http://localhost:8080/users/0000"
```

This should return a user if it exists or a 404 if it doesn't.

Delete a user:

```shell
curl -XDELETE "http://localhost:8080/users/0000"
```

This will return a 204. This is a no-op if the user does not exist.

