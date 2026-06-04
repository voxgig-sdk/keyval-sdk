# Keyval SDK

Store and retrieve simple key/value pairs over plain HTTP GET requests

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About KeyVal API

KeyVal is a minimal public key/value store reachable over HTTP at `https://api.keyval.org`. It is designed for quick prototypes, demos, and lightweight scripts that need a remote scratch space without setting up a database.

What you get from the API:

- `GET /set/{key}/{value}` — store a value under the given key
- `GET /get/{key}/` — read back the value previously stored under that key

Operationally the service has CORS enabled, so it can be called directly from browser code. The endpoints are unauthenticated in the documentation surfaced by community catalogues, and no rate limits or durability guarantees are published — treat stored values as public and ephemeral.

## Try it

**TypeScript**
```bash
npm install keyval
```

**Python**
```bash
pip install keyval-sdk
```

**PHP**
```bash
composer require voxgig/keyval-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/keyval-sdk/go
```

**Ruby**
```bash
gem install keyval-sdk
```

**Lua**
```bash
luarocks install keyval-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { KeyvalSDK } from 'keyval'

const client = new KeyvalSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o keyval-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "keyval": {
      "command": "/abs/path/to/keyval-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **KeyValueOperation** | Read and write operations against the shared key/value store, exposed as `GET /set/{key}/{value}` and `GET /get/{key}/`. | `/set/{key}/{value}` |
| **Nt** | Catch-all grouping for operations the generator could not attach to a more specific entity. | `/-/{value}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from keyval_sdk import KeyvalSDK

client = KeyvalSDK({})


# Load a specific keyvalueoperation
keyvalueoperation, err = client.KeyValueOperation(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'keyval_sdk.php';

$client = new KeyvalSDK([]);


// Load a specific keyvalueoperation
[$keyvalueoperation, $err] = $client->KeyValueOperation(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/keyval-sdk/go"

client := sdk.NewKeyvalSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "Keyval_sdk"

client = KeyvalSDK.new({})


# Load a specific keyvalueoperation
keyvalueoperation, err = client.KeyValueOperation(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("keyval_sdk")

local client = sdk.new({})


-- Load a specific keyvalueoperation
local keyvalueoperation, err = client:KeyValueOperation(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = KeyvalSDK.test()
const result = await client.KeyValueOperation().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = KeyvalSDK.test(None, None)
result, err = client.KeyValueOperation(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = KeyvalSDK::test(null, null);
[$result, $err] = $client->KeyValueOperation(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.KeyValueOperation(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = KeyvalSDK.test(nil, nil)
result, err = client.KeyValueOperation(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:KeyValueOperation(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the KeyVal API

- Upstream: [https://keyval.org](https://keyval.org)

---

Generated from the KeyVal API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
