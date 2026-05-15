package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewKeyValueOperationEntityFunc func(client *KeyvalSDK, entopts map[string]any) KeyvalEntity

var NewNtEntityFunc func(client *KeyvalSDK, entopts map[string]any) KeyvalEntity

