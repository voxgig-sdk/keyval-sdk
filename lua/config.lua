-- Keyval SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Keyval",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
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
            ["name"] = "key",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "value",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "key_value_operation",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "mykey",
                      ["kind"] = "param",
                      ["name"] = "key",
                      ["orig"] = "key",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "myvalue",
                      ["kind"] = "param",
                      ["name"] = "value",
                      ["orig"] = "value",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/set/{key}/{value}",
                ["parts"] = {
                  "set",
                  "{key}",
                  "{value}",
                },
                ["select"] = {
                  ["exist"] = {
                    "key",
                    "value",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "mykey",
                      ["kind"] = "param",
                      ["name"] = "key",
                      ["orig"] = "key",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/get/{key}",
                ["parts"] = {
                  "get",
                  "{key}",
                },
                ["select"] = {
                  ["exist"] = {
                    "key",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "get",
            },
            {
              "set",
            },
          },
        },
      },
      ["nt"] = {
        ["fields"] = {
          {
            ["name"] = "key",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "value",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "nt",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "myvalue",
                      ["kind"] = "param",
                      ["name"] = "value",
                      ["orig"] = "value",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/-/{value}",
                ["parts"] = {
                  "-",
                  "{value}",
                },
                ["select"] = {
                  ["exist"] = {
                    "value",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "",
            },
          },
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
