# Keyval SDK configuration

module KeyvalConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "Keyval",
        "slug" => "keyval",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
        },
      },
      "options" => {
        "base" => "https://api.keyval.org",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "key_value_operation" => {},
          "nt" => {},
        },
      },
      "entity" => {
        "key_value_operation" => {
          "fields" => [
            {
              "name" => "key",
              "short" => "The key that was stored (auto-generated if '-' was used)",
              "type" => "`$STRING`",
            },
            {
              "name" => "value",
              "short" => "The value that was stored",
              "type" => "`$STRING`",
            },
          ],
          "name" => "key_value_operation",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "mykey",
                        "kind" => "param",
                        "name" => "key",
                        "orig" => "key",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "myvalue",
                        "kind" => "param",
                        "name" => "value",
                        "orig" => "value",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/set/{key}/{value}",
                  "parts" => [
                    "set",
                    "{key}",
                    "{value}",
                  ],
                  "select" => {
                    "exist" => [
                      "key",
                      "value",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "mykey",
                        "kind" => "param",
                        "name" => "key",
                        "orig" => "key",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/get/{key}",
                  "parts" => [
                    "get",
                    "{key}",
                  ],
                  "select" => {
                    "exist" => [
                      "key",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "get",
              ],
              [
                "set",
              ],
            ],
          },
        },
        "nt" => {
          "fields" => [
            {
              "name" => "key",
              "short" => "The auto-generated key",
              "type" => "`$STRING`",
            },
            {
              "name" => "value",
              "short" => "The value that was stored",
              "type" => "`$STRING`",
            },
          ],
          "name" => "nt",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "myvalue",
                        "kind" => "param",
                        "name" => "value",
                        "orig" => "value",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/-/{value}",
                  "parts" => [
                    "-",
                    "{value}",
                  ],
                  "select" => {
                    "exist" => [
                      "value",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "",
              ],
            ],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    KeyvalFeatures.make_feature(name)
  end
end
