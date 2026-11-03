# Keyval SDK utility: prepare_body
require_relative 'media'
module KeyvalUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return KeyvalUtilities.raw_body(ctx.reqdata) if KeyvalUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
