<?php
declare(strict_types=1);

// Keyval SDK utility: prepare_body

class KeyvalPrepareBody
{
    public static function call(KeyvalContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
