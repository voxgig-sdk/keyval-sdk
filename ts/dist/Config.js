"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Keyval',
        slug: "keyval",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://api.keyval.org",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            key_value_operation: {},
            nt: {},
        }
    };
    entity = {
        "key_value_operation": {
            "fields": [
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "key",
                    "title": "Key",
                    "type": "`$STRING`",
                    "short": "The key that was stored (auto-generated if '-' was used)"
                },
                {
                    "name": "value",
                    "title": "Value",
                    "type": "`$STRING`",
                    "short": "The value that was stored"
                }
            ],
            "id": {
                "field": "id",
                "from": {
                    "key": "key",
                    "value": "value"
                },
                "name": "id",
                "parts": [
                    "key",
                    "value"
                ],
                "sep": "/"
            },
            "name": "key_value_operation",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/set/{key}/{value}",
                            "segments": [
                                {
                                    "lit": "set"
                                },
                                {
                                    "var": "key"
                                },
                                {
                                    "var": "value"
                                }
                            ],
                            "parts": [
                                "set",
                                "{key}",
                                "{value}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "mykey"
                                    },
                                    {
                                        "name": "value",
                                        "orig": "value",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "myvalue"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "key",
                                    "value"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/get/{key}",
                            "segments": [
                                {
                                    "lit": "get"
                                },
                                {
                                    "var": "key"
                                }
                            ],
                            "parts": [
                                "get",
                                "{key}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "key",
                                        "orig": "key",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "mykey"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "key"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "nt": {
            "fields": [
                {
                    "name": "key",
                    "title": "Key",
                    "type": "`$STRING`",
                    "short": "The auto-generated key"
                },
                {
                    "name": "value",
                    "title": "Value",
                    "type": "`$STRING`",
                    "short": "The value that was stored"
                }
            ],
            "name": "nt",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/-/{value}",
                            "segments": [
                                {
                                    "lit": "-"
                                },
                                {
                                    "var": "value"
                                }
                            ],
                            "parts": [
                                "-",
                                "{value}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "value",
                                        "orig": "value",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "myvalue"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "value"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map