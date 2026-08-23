package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Keyval",
			"slug": "keyval",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://api.keyval.org",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"key_value_operation": map[string]any{},
				"nt": map[string]any{},
			},
		},
		"entity": map[string]any{
			"key_value_operation": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "key",
						"short": "The key that was stored (auto-generated if '-' was used)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "value",
						"short": "The value that was stored",
						"type": "`$STRING`",
					},
				},
				"name": "key_value_operation",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "mykey",
											"kind": "param",
											"name": "key",
											"orig": "key",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "myvalue",
											"kind": "param",
											"name": "value",
											"orig": "value",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/set/{key}/{value}",
								"parts": []any{
									"set",
									"{key}",
									"{value}",
								},
								"select": map[string]any{
									"exist": []any{
										"key",
										"value",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "mykey",
											"kind": "param",
											"name": "key",
											"orig": "key",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/get/{key}",
								"parts": []any{
									"get",
									"{key}",
								},
								"select": map[string]any{
									"exist": []any{
										"key",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"get",
						},
						[]any{
							"set",
						},
					},
				},
			},
			"nt": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "key",
						"short": "The auto-generated key",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "value",
						"short": "The value that was stored",
						"type": "`$STRING`",
					},
				},
				"name": "nt",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "myvalue",
											"kind": "param",
											"name": "value",
											"orig": "value",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/-/{value}",
								"parts": []any{
									"-",
									"{value}",
								},
								"select": map[string]any{
									"exist": []any{
										"value",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"",
						},
					},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
