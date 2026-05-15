
import { Context } from './Context'


class KeyvalError extends Error {

  isKeyvalError = true

  sdk = 'Keyval'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  KeyvalError
}

