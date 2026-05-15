<?php
declare(strict_types=1);

// Keyval SDK utility: feature_add

class KeyvalFeatureAdd
{
    public static function call(KeyvalContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
