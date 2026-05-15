package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/keyval-sdk"
	"github.com/voxgig-sdk/keyval-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestKeyValueOperationEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.KeyValueOperation(nil)
		if ent == nil {
			t.Fatal("expected non-nil KeyValueOperationEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := key_value_operationBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "key_value_operation." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set KEYVAL_TEST_KEY_VALUE_OPERATION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		keyValueOperationRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.key_value_operation", setup.data)))
		var keyValueOperationRef01Data map[string]any
		if len(keyValueOperationRef01DataRaw) > 0 {
			keyValueOperationRef01Data = core.ToMapAny(keyValueOperationRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = keyValueOperationRef01Data

		// LOAD
		keyValueOperationRef01Ent := client.KeyValueOperation(nil)
		keyValueOperationRef01MatchDt0 := map[string]any{}
		keyValueOperationRef01DataDt0Loaded, err := keyValueOperationRef01Ent.Load(keyValueOperationRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if keyValueOperationRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func key_value_operationBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "key_value_operation", "KeyValueOperationTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read key_value_operation test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse key_value_operation test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"key_value_operation01", "key_value_operation02", "key_value_operation03", "get01", "get02", "get03", "set01", "set02", "set03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("KEYVAL_TEST_KEY_VALUE_OPERATION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"KEYVAL_TEST_KEY_VALUE_OPERATION_ENTID": idmap,
		"KEYVAL_TEST_LIVE":      "FALSE",
		"KEYVAL_TEST_EXPLAIN":   "FALSE",
		"KEYVAL_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["KEYVAL_TEST_KEY_VALUE_OPERATION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["KEYVAL_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["KEYVAL_APIKEY"],
			},
			extra,
		})
		client = sdk.NewKeyvalSDK(core.ToMapAny(mergedOpts))
	}

	live := env["KEYVAL_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["KEYVAL_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
