<?php
declare(strict_types=1);

// Keyval SDK configuration

class KeyvalConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Keyval",
                "slug" => "keyval",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://api.keyval.org",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "key_value_operation" => [],
                    "nt" => [],
                ],
            ],
            "entity" => [
        'key_value_operation' => [
          'fields' => [
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'key',
              'short' => 'The key that was stored (auto-generated if \'-\' was used)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'value',
              'short' => 'The value that was stored',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'from' => [
              'key' => 'key',
              'value' => 'value',
            ],
            'name' => 'id',
            'parts' => [
              'key',
              'value',
            ],
            'sep' => '/',
          ],
          'name' => 'key_value_operation',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'mykey',
                        'kind' => 'param',
                        'name' => 'key',
                        'orig' => 'key',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'myvalue',
                        'kind' => 'param',
                        'name' => 'value',
                        'orig' => 'value',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/set/{key}/{value}',
                  'segments' => [
                    [
                      'lit' => 'set',
                    ],
                    [
                      'var' => 'key',
                    ],
                    [
                      'var' => 'value',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'key',
                      'value',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'set',
                    '{key}',
                    '{value}',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'mykey',
                        'kind' => 'param',
                        'name' => 'key',
                        'orig' => 'key',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/get/{key}',
                  'segments' => [
                    [
                      'lit' => 'get',
                    ],
                    [
                      'var' => 'key',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'key',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'get',
                    '{key}',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'get',
              ],
              [
                'set',
              ],
            ],
          ],
        ],
        'nt' => [
          'fields' => [
            [
              'name' => 'key',
              'short' => 'The auto-generated key',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'value',
              'short' => 'The value that was stored',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'nt',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'myvalue',
                        'kind' => 'param',
                        'name' => 'value',
                        'orig' => 'value',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/-/{value}',
                  'segments' => [
                    [
                      'lit' => '-',
                    ],
                    [
                      'var' => 'value',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'value',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    '-',
                    '{value}',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                '',
              ],
            ],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return KeyvalFeatures::make_feature($name);
    }
}
