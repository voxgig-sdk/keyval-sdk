-- Keyval SDK exists test

local sdk = require("keyval_sdk")

describe("KeyvalSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
