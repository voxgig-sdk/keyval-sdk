package voxgigkeyvalsdk

import (
	"github.com/voxgig-sdk/keyval-sdk/go/core"
	"github.com/voxgig-sdk/keyval-sdk/go/entity"
	"github.com/voxgig-sdk/keyval-sdk/go/feature"
	_ "github.com/voxgig-sdk/keyval-sdk/go/utility"
)

// Type aliases preserve external API.
type KeyvalSDK = core.KeyvalSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type KeyvalEntity = core.KeyvalEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type KeyvalError = core.KeyvalError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewKeyValueOperationEntityFunc = func(client *core.KeyvalSDK, entopts map[string]any) core.KeyvalEntity {
		return entity.NewKeyValueOperationEntity(client, entopts)
	}
	core.NewNtEntityFunc = func(client *core.KeyvalSDK, entopts map[string]any) core.KeyvalEntity {
		return entity.NewNtEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewKeyvalSDK = core.NewKeyvalSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewKeyvalSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *KeyvalSDK  { return NewKeyvalSDK(nil) }
func Test() *KeyvalSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
