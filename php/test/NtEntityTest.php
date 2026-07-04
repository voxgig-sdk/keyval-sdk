<?php
declare(strict_types=1);

// Nt entity test

require_once __DIR__ . '/../keyval_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class NtEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = KeyvalSDK::test(null, null);
        $ent = $testsdk->Nt(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = nt_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "nt." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set KEYVAL_TEST_NT_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $nt_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.nt")));
        $nt_ref01_data = null;
        if (count($nt_ref01_data_raw) > 0) {
            $nt_ref01_data = Helpers::to_map($nt_ref01_data_raw[0][1]);
        }

        // LOAD
        $nt_ref01_ent = $client->Nt(null);
        $nt_ref01_match_dt0 = [];
        $nt_ref01_data_dt0_loaded = $nt_ref01_ent->load($nt_ref01_match_dt0, null);
        $this->assertNotNull($nt_ref01_data_dt0_loaded);

    }
}

function nt_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/nt/NtTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = KeyvalSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["nt01", "nt02", "nt03", "01", "02", "03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("KEYVAL_TEST_NT_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "KEYVAL_TEST_NT_ENTID" => $idmap,
        "KEYVAL_TEST_LIVE" => "FALSE",
        "KEYVAL_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["KEYVAL_TEST_NT_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["KEYVAL_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new KeyvalSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["KEYVAL_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["KEYVAL_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
