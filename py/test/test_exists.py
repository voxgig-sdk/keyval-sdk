# ProjectName SDK exists test

import pytest
from keyval_sdk import KeyvalSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = KeyvalSDK.test(None, None)
        assert testsdk is not None
