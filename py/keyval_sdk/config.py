# Keyval SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Keyval",
            "slug": "keyval",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api.keyval.org",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "key_value_operation": {},
                "nt": {},
            },
        },
        "entity": {
      "key_value_operation": {
        "fields": [
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "key",
            "title": "Key",
            "type": "`$STRING`",
            "short": "The key that was stored (auto-generated if '-' was used)",
          },
          {
            "name": "value",
            "title": "Value",
            "type": "`$STRING`",
            "short": "The value that was stored",
          },
        ],
        "id": {
          "field": "id",
          "from": {
            "key": "key",
            "value": "value",
          },
          "name": "id",
          "parts": [
            "key",
            "value",
          ],
          "sep": "/",
        },
        "name": "key_value_operation",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/set/{key}/{value}",
                "segments": [
                  {
                    "lit": "set",
                  },
                  {
                    "var": "key",
                  },
                  {
                    "var": "value",
                  },
                ],
                "parts": [
                  "set",
                  "{key}",
                  "{value}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "key",
                      "orig": "key",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "mykey",
                    },
                    {
                      "name": "value",
                      "orig": "value",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "myvalue",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "key",
                    "value",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/get/{key}",
                "segments": [
                  {
                    "lit": "get",
                  },
                  {
                    "var": "key",
                  },
                ],
                "parts": [
                  "get",
                  "{key}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "key",
                      "orig": "key",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "mykey",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "key",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "nt": {
        "fields": [
          {
            "name": "key",
            "title": "Key",
            "type": "`$STRING`",
            "short": "The auto-generated key",
          },
          {
            "name": "value",
            "title": "Value",
            "type": "`$STRING`",
            "short": "The value that was stored",
          },
        ],
        "name": "nt",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/-/{value}",
                "segments": [
                  {
                    "lit": "-",
                  },
                  {
                    "var": "value",
                  },
                ],
                "parts": [
                  "-",
                  "{value}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "value",
                      "orig": "value",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "myvalue",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "value",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
