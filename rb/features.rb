# Keyval SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module KeyvalFeatures
  def self.make_feature(name)
    case name
    when "base"
      KeyvalBaseFeature.new
    when "test"
      KeyvalTestFeature.new
    else
      KeyvalBaseFeature.new
    end
  end
end
