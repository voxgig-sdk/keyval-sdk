
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://api.keyval.org',

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
          "active": true,
          "name": "key",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "value",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        }
      ],
      "name": "key_value_operation",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": "mykey",
                    "kind": "param",
                    "name": "key",
                    "orig": "key",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "example": "myvalue",
                    "kind": "param",
                    "name": "value",
                    "orig": "value",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 1
                  }
                ]
              },
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
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": "mykey",
                    "kind": "param",
                    "name": "key",
                    "orig": "key",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
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
              },
              "index$": 1
            }
          ],
          "key$": "load"
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
          "active": true,
          "name": "key",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "value",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        }
      ],
      "name": "nt",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": "myvalue",
                    "kind": "param",
                    "name": "value",
                    "orig": "value",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
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
              },
              "index$": 0
            }
          ],
          "key$": "load"
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

