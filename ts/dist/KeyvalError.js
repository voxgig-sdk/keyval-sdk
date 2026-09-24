"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyvalError = void 0;
class KeyvalError extends Error {
    isKeyvalError = true;
    sdk = 'Keyval';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.KeyvalError = KeyvalError;
//# sourceMappingURL=KeyvalError.js.map