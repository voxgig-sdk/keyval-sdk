import { KeyvalEntityBase } from '../KeyvalEntityBase';
import type { KeyvalSDK } from '../KeyvalSDK';
import type { Control } from '../types';
import type { KeyValueOperation, KeyValueOperationLoadMatch } from '../KeyvalTypes';
declare class KeyValueOperationEntity extends KeyvalEntityBase<KeyValueOperation> {
    constructor(client: KeyvalSDK, entopts: any);
    make(this: KeyValueOperationEntity): KeyValueOperationEntity;
    load(this: any, reqmatch?: KeyValueOperationLoadMatch, ctrl?: Control): Promise<KeyValueOperationEntity>;
}
export { KeyValueOperationEntity };
