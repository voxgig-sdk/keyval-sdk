<?php
declare(strict_types=1);

// Keyval SDK utility: result_headers

class KeyvalResultHeaders
{
    public static function call(KeyvalContext $ctx): ?KeyvalResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
