# Keyval SDK utility: feature_add
module KeyvalUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
