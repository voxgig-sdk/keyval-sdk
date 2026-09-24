-- Keyval SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Keyval",
      slug = "keyval",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://api.keyval.org",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["key_value_operation"] = {},
        ["nt"] = {},
      },
    },
    entity = {
      ["key_value_operation"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "key",
            ["title"] = "Key",
            ["type"] = "`$STRING`",
            ["short"] = "The key that was stored (auto-generated if '-' was used)",
          },
          {
            ["name"] = "value",
            ["title"] = "Value",
            ["type"] = "`$STRING`",
            ["short"] = "The value that was stored",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["from"] = {
            ["key"] = "key",
            ["value"] = "value",
          },
          ["name"] = "id",
          ["parts"] = {
            "key",
            "value",
          },
          ["sep"] = "/",
        },
        ["name"] = "key_value_operation",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/set/{key}/{value}",
                ["segments"] = {
                  {
                    ["lit"] = "set",
                  },
                  {
                    ["var"] = "key",
                  },
                  {
                    ["var"] = "value",
                  },
                },
                ["parts"] = {
                  "set",
                  "{key}",
                  "{value}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "key",
                      ["orig"] = "key",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "mykey",
                    },
                    {
                      ["name"] = "value",
                      ["orig"] = "value",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "myvalue",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "key",
                    "value",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/get/{key}",
                ["segments"] = {
                  {
                    ["lit"] = "get",
                  },
                  {
                    ["var"] = "key",
                  },
                },
                ["parts"] = {
                  "get",
                  "{key}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "key",
                      ["orig"] = "key",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "mykey",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "key",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["nt"] = {
        ["fields"] = {
          {
            ["name"] = "key",
            ["title"] = "Key",
            ["type"] = "`$STRING`",
            ["short"] = "The auto-generated key",
          },
          {
            ["name"] = "value",
            ["title"] = "Value",
            ["type"] = "`$STRING`",
            ["short"] = "The value that was stored",
          },
        },
        ["name"] = "nt",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/-/{value}",
                ["segments"] = {
                  {
                    ["lit"] = "-",
                  },
                  {
                    ["var"] = "value",
                  },
                },
                ["parts"] = {
                  "-",
                  "{value}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "value",
                      ["orig"] = "value",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "myvalue",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "value",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
