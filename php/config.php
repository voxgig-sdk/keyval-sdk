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
                "test" => [
          'options' => [
            'active' => false,
          ],
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
                  'parts' => [
                    'set',
                    '{key}',
                    '{value}',
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
                  'parts' => [
                    'get',
                    '{key}',
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
                  'parts' => [
                    '-',
                    '{value}',
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
