-- Keyval SDK error

local KeyvalError = {}
KeyvalError.__index = KeyvalError


function KeyvalError.new(code, msg, ctx)
  local self = setmetatable({}, KeyvalError)
  self.is_sdk_error = true
  self.sdk = "Keyval"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function KeyvalError:error()
  return self.msg
end


function KeyvalError:__tostring()
  return self.msg
end


return KeyvalError
