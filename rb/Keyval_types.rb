# frozen_string_literal: true

# Typed models for the Keyval SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
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
#
# @!attribute [rw] value
#   @return [String]
KeyValueOperationLoadMatch = Struct.new(
  :key,
  :value,
  keyword_init: true
)

# Nt entity data model.
#
# @!attribute [rw] key
#   @return [String, nil]
#
# @!attribute [rw] value
#   @return [String, nil]
Nt = Struct.new(
  :key,
  :value,
  keyword_init: true
)

# Request payload for Nt#load.
#
# @!attribute [rw] value
#   @return [String]
NtLoadMatch = Struct.new(
  :value,
  keyword_init: true
)

