<?php
declare(strict_types=1);

// Keyval SDK base feature

class KeyvalBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(KeyvalContext $ctx, array $options): void {}
    public function PostConstruct(KeyvalContext $ctx): void {}
    public function PostConstructEntity(KeyvalContext $ctx): void {}
    public function SetData(KeyvalContext $ctx): void {}
    public function GetData(KeyvalContext $ctx): void {}
    public function GetMatch(KeyvalContext $ctx): void {}
    public function SetMatch(KeyvalContext $ctx): void {}
    public function PrePoint(KeyvalContext $ctx): void {}
    public function PreSpec(KeyvalContext $ctx): void {}
    public function PreRequest(KeyvalContext $ctx): void {}
    public function PreResponse(KeyvalContext $ctx): void {}
    public function PreResult(KeyvalContext $ctx): void {}
    public function PreDone(KeyvalContext $ctx): void {}
    public function PreUnexpected(KeyvalContext $ctx): void {}
}
