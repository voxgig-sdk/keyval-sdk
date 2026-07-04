package core

func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Keyval",
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
						"active": true,
						"name": "key",
						"req": false,
						"type": "`$STRING`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "value",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
				},
				"name": "key_value_operation",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "mykey",
											"kind": "param",
											"name": "key",
											"orig": "key",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
										map[string]any{
											"active": true,
											"example": "myvalue",
											"kind": "param",
											"name": "value",
											"orig": "value",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 1,
										},
									},
								},
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
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "mykey",
											"kind": "param",
											"name": "key",
											"orig": "key",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
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
								"index$": 1,
							},
						},
						"key$": "load",
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
						"active": true,
						"name": "key",
						"req": false,
						"type": "`$STRING`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "value",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
				},
				"name": "nt",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "myvalue",
											"kind": "param",
											"name": "value",
											"orig": "value",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "load",
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
