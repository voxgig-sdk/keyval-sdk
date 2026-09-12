import { KeyvalEntityBase } from '../KeyvalEntityBase';
import type { KeyvalSDK } from '../KeyvalSDK';
import type { Control } from '../types';
import type { Nt, NtLoadMatch } from '../KeyvalTypes';
declare class NtEntity extends KeyvalEntityBase<Nt> {
    constructor(client: KeyvalSDK, entopts: any);
    make(this: NtEntity): NtEntity;
    load(this: any, reqmatch?: NtLoadMatch, ctrl?: Control): Promise<NtEntity>;
}
export { NtEntity };
