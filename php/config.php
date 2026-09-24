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
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'key',
              'title' => 'Key',
              'type' => '`$STRING`',
              'short' => 'The key that was stored (auto-generated if \'-\' was used)',
            ],
            [
              'name' => 'value',
              'title' => 'Value',
              'type' => '`$STRING`',
              'short' => 'The value that was stored',
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
                  'parts' => [
                    'set',
                    '{key}',
                    '{value}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'key',
                        'orig' => 'key',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => 'mykey',
                      ],
                      [
                        'name' => 'value',
                        'orig' => 'value',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => 'myvalue',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'key',
                      'value',
                    ],
                  ],
                ],
                [
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
                  'parts' => [
                    'get',
                    '{key}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'key',
                        'orig' => 'key',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => 'mykey',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'key',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'nt' => [
          'fields' => [
            [
              'name' => 'key',
              'title' => 'Key',
              'type' => '`$STRING`',
              'short' => 'The auto-generated key',
            ],
            [
              'name' => 'value',
              'title' => 'Value',
              'type' => '`$STRING`',
              'short' => 'The value that was stored',
            ],
          ],
          'name' => 'nt',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
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
                  'parts' => [
                    '-',
                    '{value}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'value',
                        'orig' => 'value',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => 'myvalue',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'value',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
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
