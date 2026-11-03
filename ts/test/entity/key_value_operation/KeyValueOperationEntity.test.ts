

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { KeyvalSDK, BaseFeature, config, stdutil } from '../../..'

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


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = KeyvalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.KeyValueOperation().load({"key":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.KEYVAL_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'key_value_operation.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"key":{"a":true,"h":"Key","n":"key","r":false,"sh":"The requested key","t":"`$STRING`","key$":"key","index$":0},"value":{"a":true,"h":"Value","n":"value","r":false,"sh":"The value associated with the key","t":"`$STRING`","key$":"value","index$":1}},"name":"key_value_operation","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /get/{key}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"mykey","k":"param","n":"key","or":"key","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/get/{key}","q":{"exist":["key"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"get"},{"var":"key"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"key_value_operation","name__orig":"key_value_operation","Name":"KeyValueOperation","name_":"key_value_operation","name-":"key-value-operation","NAME":"KEY_VALUE_OPERATION","index$":0}, {"active":true,"entity":"key_value_operation","key$":"BasicKeyValueOperationFlow","kind":"basic","name":"BasicKeyValueOperationFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"key_value_operation_ref01","srcdatavar":"key_value_operation_ref01_data","suffix":"_dt0"},"m":{"id":"key_value_operation01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-key_value_operation_ref01"}}],"unreachable":true}]}, 'KeyValueOperation', {"GET /get/{key}":{"protocol":"http","parameters":[{"name":"key","in":"path","required":true,"description":"The key to retrieve the value for.","schema":{"type":"string"},"example":"mykey","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let key_value_operation_ref01_data = Object.values(setup.data.existing.key_value_operation)[0] as any

  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

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
    ['key_value_operation01','key_value_operation02','key_value_operation03'],
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
  
