# Keyval SDK feature factory

from keyval_sdk.feature.base_feature import KeyvalBaseFeature
from keyval_sdk.feature.test_feature import KeyvalTestFeature


def _make_feature(name):
    features = {
        "base": lambda: KeyvalBaseFeature(),
        "test": lambda: KeyvalTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
