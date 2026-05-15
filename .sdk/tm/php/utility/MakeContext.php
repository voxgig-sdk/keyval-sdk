<?php
declare(strict_types=1);

// Keyval SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class KeyvalMakeContext
{
    public static function call(array $ctxmap, ?KeyvalContext $basectx): KeyvalContext
    {
        return new KeyvalContext($ctxmap, $basectx);
    }
}
