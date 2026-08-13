# Keyval SDK utility: make_context

from keyval_sdk.core.context import KeyvalContext


def make_context_util(ctxmap, basectx):
    return KeyvalContext(ctxmap, basectx)
