import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "key_value_operation",
    "accessor": "KeyValueOperation",
    "op": "load",
    "method": "GET",
    "path": "/set/{key}/{value}",
    "args": [
      {
        "name": "key",
        "wire": "key",
        "value": "mykey"
      },
      {
        "name": "value",
        "wire": "value",
        "value": "myvalue"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "key": "x",
      "value": "x"
    },
    "idField": "id"
  },
  {
    "entity": "key_value_operation",
    "accessor": "KeyValueOperation",
    "op": "load",
    "method": "GET",
    "path": "/get/{key}",
    "args": [
      {
        "name": "key",
        "wire": "key",
        "value": "mykey"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "key": "x",
      "value": "x"
    },
    "idField": "id"
  },
  {
    "entity": "nt",
    "accessor": "Nt",
    "op": "load",
    "method": "GET",
    "path": "/-/{value}",
    "args": [
      {
        "name": "value",
        "wire": "value",
        "value": "myvalue"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "key": "x",
      "value": "x"
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
