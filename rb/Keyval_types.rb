# frozen_string_literal: true

# Typed models for the Keyval SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# KeyValueOperation entity data model.
#
# @!attribute [rw] key
#   @return [String, nil]
#
# @!attribute [rw] value
#   @return [String, nil]
KeyValueOperation = Struct.new(
  :key,
  :value,
  keyword_init: true
)

# Request payload for KeyValueOperation#load.
#
# @!attribute [rw] key
#   @return [String]
KeyValueOperationLoadMatch = Struct.new(
  :key,
  keyword_init: true
)

