# Keyval SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

KeyvalUtility.registrar = ->(u) {
  u.clean = KeyvalUtilities::Clean
  u.done = KeyvalUtilities::Done
  u.make_error = KeyvalUtilities::MakeError
  u.feature_add = KeyvalUtilities::FeatureAdd
  u.feature_hook = KeyvalUtilities::FeatureHook
  u.feature_init = KeyvalUtilities::FeatureInit
  u.fetcher = KeyvalUtilities::Fetcher
  u.make_fetch_def = KeyvalUtilities::MakeFetchDef
  u.make_context = KeyvalUtilities::MakeContext
  u.make_options = KeyvalUtilities::MakeOptions
  u.make_request = KeyvalUtilities::MakeRequest
  u.make_response = KeyvalUtilities::MakeResponse
  u.make_result = KeyvalUtilities::MakeResult
  u.make_point = KeyvalUtilities::MakePoint
  u.make_spec = KeyvalUtilities::MakeSpec
  u.make_url = KeyvalUtilities::MakeUrl
  u.param = KeyvalUtilities::Param
  u.prepare_auth = KeyvalUtilities::PrepareAuth
  u.prepare_body = KeyvalUtilities::PrepareBody
  u.prepare_headers = KeyvalUtilities::PrepareHeaders
  u.prepare_method = KeyvalUtilities::PrepareMethod
  u.prepare_params = KeyvalUtilities::PrepareParams
  u.prepare_path = KeyvalUtilities::PreparePath
  u.prepare_query = KeyvalUtilities::PrepareQuery
  u.graphql_body = KeyvalUtilities::GraphqlBody
  u.graphql_errors = KeyvalUtilities::GraphqlErrors
  u.result_basic = KeyvalUtilities::ResultBasic
  u.result_body = KeyvalUtilities::ResultBody
  u.result_headers = KeyvalUtilities::ResultHeaders
  u.transform_request = KeyvalUtilities::TransformRequest
  u.transform_response = KeyvalUtilities::TransformResponse
}
