<?php
declare(strict_types=1);

// Typed models for the Keyval SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** KeyValueOperation entity data model. */
class KeyValueOperation
{
    public ?string $key = null;
    public ?string $value = null;
}

/** Request payload for KeyValueOperation#load. */
class KeyValueOperationLoadMatch
{
    public string $key;
    public string $value;
}

/** Nt entity data model. */
class Nt
{
    public ?string $key = null;
    public ?string $value = null;
}

/** Request payload for Nt#load. */
class NtLoadMatch
{
    public string $value;
}

