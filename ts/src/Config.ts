
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
          "name": "key",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "value",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        }
      ],
      "name": "key_value_operation",
      "op": {
        "load": {
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
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "myvalue",
                    "kind": "param",
                    "name": "value",
                    "orig": "value",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
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
              "active": true,
              "index$": 0
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
                    "type": "`$STRING`",
                    "active": true
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
              "active": true,
              "index$": 1
            }
          ],
          "input": "data",
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
          "name": "key",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "value",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        }
      ],
      "name": "nt",
      "op": {
        "load": {
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
                    "type": "`$STRING`",
                    "active": true
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
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
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

