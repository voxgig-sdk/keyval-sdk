
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Keyval',
        slug: "keyval",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
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
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://api.keyval.org",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        key_value_operation: {
        },
  
        nt: {
        },
  
    }
  }


  entity = {
    "key_value_operation": {
      "fields": [
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "key",
          "short": "The key that was stored (auto-generated if '-' was used)",
          "type": "`$STRING`"
        },
        {
          "name": "value",
          "short": "The value that was stored",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "from": {
          "key": "key",
          "value": "value"
        },
        "name": "id",
        "parts": [
          "key",
          "value"
        ],
        "sep": "/"
      },
      "name": "key_value_operation",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": "mykey",
                    "kind": "param",
                    "name": "key",
                    "orig": "key",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "example": "myvalue",
                    "kind": "param",
                    "name": "value",
                    "orig": "value",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/set/{key}/{value}",
              "segments": [
                {
                  "lit": "set"
                },
                {
                  "var": "key"
                },
                {
                  "var": "value"
                }
              ],
              "select": {
                "exist": [
                  "key",
                  "value"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "set",
                "{key}",
                "{value}"
              ]
            },
            {
              "args": {
                "params": [
                  {
                    "example": "mykey",
                    "kind": "param",
                    "name": "key",
                    "orig": "key",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/get/{key}",
              "segments": [
                {
                  "lit": "get"
                },
                {
                  "var": "key"
                }
              ],
              "select": {
                "exist": [
                  "key"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "get",
                "{key}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "get"
          ],
          [
            "set"
          ]
        ]
      }
    },
    "nt": {
      "fields": [
        {
          "name": "key",
          "short": "The auto-generated key",
          "type": "`$STRING`"
        },
        {
          "name": "value",
          "short": "The value that was stored",
          "type": "`$STRING`"
        }
      ],
      "name": "nt",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": "myvalue",
                    "kind": "param",
                    "name": "value",
                    "orig": "value",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/-/{value}",
              "segments": [
                {
                  "lit": "-"
                },
                {
                  "var": "value"
                }
              ],
              "select": {
                "exist": [
                  "value"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "-",
                "{value}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            ""
          ]
        ]
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

