
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { KeyvalSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await KeyvalSDK.test()
    equal(null !== testsdk, true)
  })

})
