# Keyval SDK configuration


def make_config():
    return {
        "main": {
            "name": "Keyval",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api.keyval.org",
            "auth": {
                "prefix": "Bearer",
            },
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
            "active": True,
            "name": "key",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "value",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
        ],
        "name": "key_value_operation",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "mykey",
                      "kind": "param",
                      "name": "key",
                      "orig": "key",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "myvalue",
                      "kind": "param",
                      "name": "value",
                      "orig": "value",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/set/{key}/{value}",
                "parts": [
                  "set",
                  "{key}",
                  "{value}",
                ],
                "select": {
                  "exist": [
                    "key",
                    "value",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "mykey",
                      "kind": "param",
                      "name": "key",
                      "orig": "key",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/get/{key}",
                "parts": [
                  "get",
                  "{key}",
                ],
                "select": {
                  "exist": [
                    "key",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "get",
            ],
            [
              "set",
            ],
          ],
        },
      },
      "nt": {
        "fields": [
          {
            "active": True,
            "name": "key",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "value",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
        ],
        "name": "nt",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "myvalue",
                      "kind": "param",
                      "name": "value",
                      "orig": "value",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/-/{value}",
                "parts": [
                  "-",
                  "{value}",
                ],
                "select": {
                  "exist": [
                    "value",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "",
            ],
          ],
        },
      },
    },
    }
