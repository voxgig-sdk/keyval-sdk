
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

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
     test:     {
      "options": {
        "active": false
      }
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
              "parts": [
                "set",
                "{key}",
                "{value}"
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
              }
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
              "parts": [
                "get",
                "{key}"
              ],
              "select": {
                "exist": [
                  "key"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "-",
                "{value}"
              ],
              "select": {
                "exist": [
                  "value"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
  config
}

