# Keyval SDK utility: make_context

from projectname_sdk.core.context import KeyvalContext


def make_context_util(ctxmap, basectx):
    return KeyvalContext(ctxmap, basectx)
