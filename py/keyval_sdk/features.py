# Keyval SDK feature factory

from keyval_sdk.feature.base_feature import KeyvalBaseFeature
from keyval_sdk.feature.ratelimit_feature import KeyvalRatelimitFeature
from keyval_sdk.feature.retry_feature import KeyvalRetryFeature
from keyval_sdk.feature.test_feature import KeyvalTestFeature
from keyval_sdk.feature.timeout_feature import KeyvalTimeoutFeature


_FEATURES = {
    "base": lambda: KeyvalBaseFeature(),
    "ratelimit": lambda: KeyvalRatelimitFeature(),
    "retry": lambda: KeyvalRetryFeature(),
    "test": lambda: KeyvalTestFeature(),
    "timeout": lambda: KeyvalTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
