<?php
declare(strict_types=1);

// Keyval SDK utility: result_body

class KeyvalResultBody
{
    public static function call(KeyvalContext $ctx): ?KeyvalResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
