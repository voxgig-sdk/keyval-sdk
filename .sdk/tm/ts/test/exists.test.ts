
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { KeyvalSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = KeyvalSDK.test()
    equal(testsdk instanceof KeyvalSDK, true,
      'KeyvalSDK.test() must return a client synchronously')
  })

})
