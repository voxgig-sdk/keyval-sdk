<?php
declare(strict_types=1);

// Keyval SDK exists test

require_once __DIR__ . '/../keyval_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = KeyvalSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
