<?php
declare(strict_types=1);

// Keyval SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class KeyvalFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new KeyvalBaseFeature();
            case "test":
                return new KeyvalTestFeature();
            default:
                return new KeyvalBaseFeature();
        }
    }
}
