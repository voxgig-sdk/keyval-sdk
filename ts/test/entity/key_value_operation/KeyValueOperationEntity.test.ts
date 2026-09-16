

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { KeyvalSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('KeyValueOperationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when KEYVAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('KEYVAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = KeyvalSDK.test()
    const ent = testsdk.KeyValueOperation()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.KEYVAL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'key_value_operation.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"key","req":false,"short":"The key that was stored (auto-generated if '-' was used)","type":"`$STRING`","index$":1},{"active":true,"name":"value","req":false,"short":"The value that was stored","type":"`$STRING`","index$":2}],"id":{"field":"id","from":{"key":"key","value":"value"},"name":"id","parts":["key","value"],"sep":"/"},"name":"key_value_operation","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"mykey","kind":"param","name":"key","orig":"key","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"example":"myvalue","kind":"param","name":"value","orig":"value","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /set/{key}/{value}","json":"{\"operationId\":\"setKeyValue\",\"parameters\":[{\"description\":\"The key to store. Use '-' to auto-generate a key.\",\"example\":\"mykey\",\"in\":\"path\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The value to store for the specified key.\",\"example\":\"myvalue\",\"in\":\"path\",\"name\":\"value\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"key\":{\"description\":\"The key that was stored (auto-generated if '-' was used)\",\"type\":\"string\"},\"value\":{\"description\":\"The value that was stored\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successfully stored the key/value pair\"},\"400\":{\"description\":\"Bad request - invalid key or value\"},\"500\":{\"description\":\"Server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/set/{key}/{value}","segments":[{"lit":"set"},{"var":"key"},{"var":"value"}],"select":{"exist":["key","value"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"example":"mykey","kind":"param","name":"key","orig":"key","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /get/{key}","json":"{\"operationId\":\"getValueByKey\",\"parameters\":[{\"description\":\"The key to retrieve the value for.\",\"example\":\"mykey\",\"in\":\"path\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"key\":{\"description\":\"The requested key\",\"type\":\"string\"},\"value\":{\"description\":\"The value associated with the key\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successfully retrieved the value\"},\"400\":{\"description\":\"Bad request - invalid key\"},\"404\":{\"description\":\"Key not found\"},\"500\":{\"description\":\"Server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/get/{key}","segments":[{"lit":"get"},{"var":"key"}],"select":{"exist":["key"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[["get"],["set"]]},"key$":"key_value_operation","name__orig":"key_value_operation","Name":"KeyValueOperation","name_":"key_value_operation","name-":"key-value-operation","NAME":"KEY_VALUE_OPERATION","index$":0}, {"active":true,"entity":"key_value_operation","key$":"BasicKeyValueOperationFlow","kind":"basic","name":"BasicKeyValueOperationFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"key_value_operation_ref01","srcdatavar":"key_value_operation_ref01_data","suffix":"_dt0"},"match":{"id":"key_value_operation01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-key_value_operation_ref01"}}],"index$":0}]}, 'KeyValueOperation')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let key_value_operation_ref01_data = Object.values(setup.data.existing.key_value_operation)[0] as any

    // LOAD
    const key_value_operation_ref01_ent = client.KeyValueOperation()
    const key_value_operation_ref01_match_dt0: any = {}
    key_value_operation_ref01_match_dt0.id = key_value_operation_ref01_data.id
    const key_value_operation_ref01_data_dt0 = (await key_value_operation_ref01_ent.load(key_value_operation_ref01_match_dt0)).data()
    assert(key_value_operation_ref01_data_dt0.id === key_value_operation_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/key_value_operation/KeyValueOperationTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = KeyvalSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['key_value_operation01','key_value_operation02','key_value_operation03','get01','get02','get03','set01','set02','set03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'KEYVAL_TEST_KEY_VALUE_OPERATION_ENTID': idmap,
    'KEYVAL_TEST_LIVE': 'FALSE',
    'KEYVAL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['KEYVAL_TEST_KEY_VALUE_OPERATION_ENTID']

  const live = 'TRUE' === env.KEYVAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['KEYVAL_TEST_KEY_VALUE_OPERATION_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new KeyvalSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.KEYVAL_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
