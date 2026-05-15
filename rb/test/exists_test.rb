# Keyval SDK exists test

require "minitest/autorun"
require_relative "../Keyval_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = KeyvalSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
