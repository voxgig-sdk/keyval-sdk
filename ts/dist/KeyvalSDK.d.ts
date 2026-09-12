import { KeyValueOperationEntity } from './entity/KeyValueOperationEntity';
import { NtEntity } from './entity/NtEntity';
export type * from './KeyvalTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { KeyvalEntityBase } from './KeyvalEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class KeyvalSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    KeyValueOperation(entopts?: Record<string, any>): KeyValueOperationEntity;
    Nt(entopts?: Record<string, any>): NtEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): KeyvalSDK;
    tester(testopts?: any, sdkopts?: any): KeyvalSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof KeyvalSDK;
export { stdutil, config, BaseFeature, KeyvalEntityBase, KeyvalSDK, SDK, };
