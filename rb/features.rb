# Keyval SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module KeyvalFeatures
  def self.make_feature(name)
    case name
    when "base"
      KeyvalBaseFeature.new
    when "ratelimit"
      KeyvalRatelimitFeature.new
    when "retry"
      KeyvalRetryFeature.new
    when "test"
      KeyvalTestFeature.new
    when "timeout"
      KeyvalTimeoutFeature.new
    else
      KeyvalBaseFeature.new
    end
  end
end
