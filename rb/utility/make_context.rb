# Keyval SDK utility: make_context
require_relative '../core/context'
module KeyvalUtilities
  MakeContext = ->(ctxmap, basectx) {
    KeyvalContext.new(ctxmap, basectx)
  }
end
