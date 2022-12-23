import { Cell, Slice, StackItem, Address, Builder, InternalMessage, CommonMessageInfo, CellMessage, beginCell, serializeDict, TupleSlice4, readString, stringToCell } from 'ton';
import { ContractExecutor, createExecutorFromCode, ExecuteError } from 'ton-nodejs';
import BN from 'bn.js';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function packStateInit(src: StateInit): Cell {
    let b_0 = new Builder();
    b_0 = b_0.storeRef(src.code);
    b_0 = b_0.storeRef(src.data);
    return b_0.endCell();
}

export function packStackStateInit(src: StateInit, __stack: StackItem[]) {
    __stack.push({ type: 'cell', cell: src.code });
    __stack.push({ type: 'cell', cell: src.data });
}

export function packTupleStateInit(src: StateInit): StackItem[] {
    let __stack: StackItem[] = [];
    __stack.push({ type: 'cell', cell: src.code });
    __stack.push({ type: 'cell', cell: src.data });
    return __stack;
}

export function unpackStackStateInit(slice: TupleSlice4): StateInit {
    const code = slice.readCell();
    const data = slice.readCell();
    return { $$type: 'StateInit', code: code, data: data };
}
export function unpackTupleStateInit(slice: TupleSlice4): StateInit {
    const code = slice.readCell();
    const data = slice.readCell();
    return { $$type: 'StateInit', code: code, data: data };
}
export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: BN;
    raw: Cell;
}

export function packContext(src: Context): Cell {
    let b_0 = new Builder();
    b_0 = b_0.storeBit(src.bounced);
    b_0 = b_0.storeAddress(src.sender);
    b_0 = b_0.storeInt(src.value, 257);
    b_0 = b_0.storeRef(src.raw);
    return b_0.endCell();
}

export function packStackContext(src: Context, __stack: StackItem[]) {
    __stack.push({ type: 'int', value: src.bounced ? new BN(-1) : new BN(0) });
    __stack.push({ type: 'slice', cell: beginCell().storeAddress(src.sender).endCell() });
    __stack.push({ type: 'int', value: src.value });
    __stack.push({ type: 'slice', cell: src.raw });
}

export function packTupleContext(src: Context): StackItem[] {
    let __stack: StackItem[] = [];
    __stack.push({ type: 'int', value: src.bounced ? new BN(-1) : new BN(0) });
    __stack.push({ type: 'slice', cell: beginCell().storeAddress(src.sender).endCell() });
    __stack.push({ type: 'int', value: src.value });
    __stack.push({ type: 'slice', cell: src.raw });
    return __stack;
}

export function unpackStackContext(slice: TupleSlice4): Context {
    const bounced = slice.readBoolean();
    const sender = slice.readAddress();
    const value = slice.readBigNumber();
    const raw = slice.readCell();
    return { $$type: 'Context', bounced: bounced, sender: sender, value: value, raw: raw };
}
export function unpackTupleContext(slice: TupleSlice4): Context {
    const bounced = slice.readBoolean();
    const sender = slice.readAddress();
    const value = slice.readBigNumber();
    const raw = slice.readCell();
    return { $$type: 'Context', bounced: bounced, sender: sender, value: value, raw: raw };
}
export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: BN;
    mode: BN;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function packSendParameters(src: SendParameters): Cell {
    let b_0 = new Builder();
    b_0 = b_0.storeBit(src.bounce);
    b_0 = b_0.storeAddress(src.to);
    b_0 = b_0.storeInt(src.value, 257);
    b_0 = b_0.storeInt(src.mode, 257);
    if (src.body !== null) {
        b_0 = b_0.storeBit(true);
        b_0 = b_0.storeRef(src.body);
    } else {
        b_0 = b_0.storeBit(false);
    }
    if (src.code !== null) {
        b_0 = b_0.storeBit(true);
        b_0 = b_0.storeRef(src.code);
    } else {
        b_0 = b_0.storeBit(false);
    }
    if (src.data !== null) {
        b_0 = b_0.storeBit(true);
        b_0 = b_0.storeRef(src.data);
    } else {
        b_0 = b_0.storeBit(false);
    }
    return b_0.endCell();
}

export function packStackSendParameters(src: SendParameters, __stack: StackItem[]) {
    __stack.push({ type: 'int', value: src.bounce ? new BN(-1) : new BN(0) });
    __stack.push({ type: 'slice', cell: beginCell().storeAddress(src.to).endCell() });
    __stack.push({ type: 'int', value: src.value });
    __stack.push({ type: 'int', value: src.mode });
    if (src.body !== null) {
        __stack.push({ type: 'cell', cell: src.body });
    } else {
        __stack.push({ type: 'null' });
    }
    if (src.code !== null) {
        __stack.push({ type: 'cell', cell: src.code });
    } else {
        __stack.push({ type: 'null' });
    }
    if (src.data !== null) {
        __stack.push({ type: 'cell', cell: src.data });
    } else {
        __stack.push({ type: 'null' });
    }
}

export function packTupleSendParameters(src: SendParameters): StackItem[] {
    let __stack: StackItem[] = [];
    __stack.push({ type: 'int', value: src.bounce ? new BN(-1) : new BN(0) });
    __stack.push({ type: 'slice', cell: beginCell().storeAddress(src.to).endCell() });
    __stack.push({ type: 'int', value: src.value });
    __stack.push({ type: 'int', value: src.mode });
    if (src.body !== null) {
        __stack.push({ type: 'cell', cell: src.body });
    } else {
        __stack.push({ type: 'null' });
    }
    if (src.code !== null) {
        __stack.push({ type: 'cell', cell: src.code });
    } else {
        __stack.push({ type: 'null' });
    }
    if (src.data !== null) {
        __stack.push({ type: 'cell', cell: src.data });
    } else {
        __stack.push({ type: 'null' });
    }
    return __stack;
}

export function unpackStackSendParameters(slice: TupleSlice4): SendParameters {
    const bounce = slice.readBoolean();
    const to = slice.readAddress();
    const value = slice.readBigNumber();
    const mode = slice.readBigNumber();
    const body = slice.readCellOpt();
    const code = slice.readCellOpt();
    const data = slice.readCellOpt();
    return { $$type: 'SendParameters', bounce: bounce, to: to, value: value, mode: mode, body: body, code: code, data: data };
}
export function unpackTupleSendParameters(slice: TupleSlice4): SendParameters {
    const bounce = slice.readBoolean();
    const to = slice.readAddress();
    const value = slice.readBigNumber();
    const mode = slice.readBigNumber();
    const body = slice.readCellOpt();
    const code = slice.readCellOpt();
    const data = slice.readCellOpt();
    return { $$type: 'SendParameters', bounce: bounce, to: to, value: value, mode: mode, body: body, code: code, data: data };
}
export type ChangeOwner = {
    $$type: 'ChangeOwner';
    newOwner: Address;
}

export function packChangeOwner(src: ChangeOwner): Cell {
    let b_0 = new Builder();
    b_0 = b_0.storeUint(3067051791, 32);
    b_0 = b_0.storeAddress(src.newOwner);
    return b_0.endCell();
}

export function packStackChangeOwner(src: ChangeOwner, __stack: StackItem[]) {
    __stack.push({ type: 'slice', cell: beginCell().storeAddress(src.newOwner).endCell() });
}

export function packTupleChangeOwner(src: ChangeOwner): StackItem[] {
    let __stack: StackItem[] = [];
    __stack.push({ type: 'slice', cell: beginCell().storeAddress(src.newOwner).endCell() });
    return __stack;
}

export function unpackStackChangeOwner(slice: TupleSlice4): ChangeOwner {
    const newOwner = slice.readAddress();
    return { $$type: 'ChangeOwner', newOwner: newOwner };
}
export function unpackTupleChangeOwner(slice: TupleSlice4): ChangeOwner {
    const newOwner = slice.readAddress();
    return { $$type: 'ChangeOwner', newOwner: newOwner };
}
export type Operation = {
    $$type: 'Operation';
    to: Address;
    value: BN;
    timeout: BN;
    bounce: boolean;
    mode: BN;
    body: Cell | null;
    stateInit: StateInit | null;
}

export function packOperation(src: Operation): Cell {
    let b_0 = new Builder();
    b_0 = b_0.storeAddress(src.to);
    b_0 = b_0.storeCoins(src.value);
    b_0 = b_0.storeUint(src.timeout, 32);
    b_0 = b_0.storeBit(src.bounce);
    b_0 = b_0.storeUint(src.mode, 8);
    if (src.body !== null) {
        b_0 = b_0.storeBit(true);
        b_0 = b_0.storeRef(src.body);
    } else {
        b_0 = b_0.storeBit(false);
    }
    if (src.stateInit !== null) {
        b_0 = b_0.storeBit(true);
        b_0 = b_0.storeCellCopy(packStateInit(src.stateInit));
    } else {
        b_0 = b_0.storeBit(false);
    }
    return b_0.endCell();
}

export function packStackOperation(src: Operation, __stack: StackItem[]) {
    __stack.push({ type: 'slice', cell: beginCell().storeAddress(src.to).endCell() });
    __stack.push({ type: 'int', value: src.value });
    __stack.push({ type: 'int', value: src.timeout });
    __stack.push({ type: 'int', value: src.bounce ? new BN(-1) : new BN(0) });
    __stack.push({ type: 'int', value: src.mode });
    if (src.body !== null) {
        __stack.push({ type: 'cell', cell: src.body });
    } else {
        __stack.push({ type: 'null' });
    }
    if (src.stateInit !== null) {
        __stack.push({ type: 'tuple', items: packTupleStateInit(src.stateInit) });
    } else {
        __stack.push({ type: 'null' });
    }
}

export function packTupleOperation(src: Operation): StackItem[] {
    let __stack: StackItem[] = [];
    __stack.push({ type: 'slice', cell: beginCell().storeAddress(src.to).endCell() });
    __stack.push({ type: 'int', value: src.value });
    __stack.push({ type: 'int', value: src.timeout });
    __stack.push({ type: 'int', value: src.bounce ? new BN(-1) : new BN(0) });
    __stack.push({ type: 'int', value: src.mode });
    if (src.body !== null) {
        __stack.push({ type: 'cell', cell: src.body });
    } else {
        __stack.push({ type: 'null' });
    }
    if (src.stateInit !== null) {
        __stack.push({ type: 'tuple', items: packTupleStateInit(src.stateInit) });
    } else {
        __stack.push({ type: 'null' });
    }
    return __stack;
}

export function unpackStackOperation(slice: TupleSlice4): Operation {
    const to = slice.readAddress();
    const value = slice.readBigNumber();
    const timeout = slice.readBigNumber();
    const bounce = slice.readBoolean();
    const mode = slice.readBigNumber();
    const body = slice.readCellOpt();
    const stateInit_p = slice.pop();
    const stateInit = stateInit_p.type !== 'tuple' ? null : unpackTupleStateInit(new TupleSlice4(stateInit_p.items));
    return { $$type: 'Operation', to: to, value: value, timeout: timeout, bounce: bounce, mode: mode, body: body, stateInit: stateInit };
}
export function unpackTupleOperation(slice: TupleSlice4): Operation {
    const to = slice.readAddress();
    const value = slice.readBigNumber();
    const timeout = slice.readBigNumber();
    const bounce = slice.readBoolean();
    const mode = slice.readBigNumber();
    const body = slice.readCellOpt();
    const stateInit_p = slice.pop();
    const stateInit = stateInit_p.type !== 'tuple' ? null : unpackTupleStateInit(new TupleSlice4(stateInit_p.items));
    return { $$type: 'Operation', to: to, value: value, timeout: timeout, bounce: bounce, mode: mode, body: body, stateInit: stateInit };
}
export type OpRequest = {
    $$type: 'OpRequest';
    queryId: BN;
    operation: Operation;
}

export function packOpRequest(src: OpRequest): Cell {
    let b_0 = new Builder();
    b_0 = b_0.storeUint(573841557, 32);
    b_0 = b_0.storeUint(src.queryId, 64);
    b_0 = b_0.storeCellCopy(packOperation(src.operation));
    return b_0.endCell();
}

export function packStackOpRequest(src: OpRequest, __stack: StackItem[]) {
    __stack.push({ type: 'int', value: src.queryId });
    packStackOperation(src.operation, __stack);
}

export function packTupleOpRequest(src: OpRequest): StackItem[] {
    let __stack: StackItem[] = [];
    __stack.push({ type: 'int', value: src.queryId });
    __stack.push({ type: 'tuple', items: packTupleOperation(src.operation) });
    return __stack;
}

export function unpackStackOpRequest(slice: TupleSlice4): OpRequest {
    const queryId = slice.readBigNumber();
    const operation = unpackStackOperation(slice);
    return { $$type: 'OpRequest', queryId: queryId, operation: operation };
}
export function unpackTupleOpRequest(slice: TupleSlice4): OpRequest {
    const queryId = slice.readBigNumber();
    const operation = unpackTupleOperation(slice);
    return { $$type: 'OpRequest', queryId: queryId, operation: operation };
}
export type OpDeploy = {
    $$type: 'OpDeploy';
    queryId: BN;
    requestor: Address;
}

export function packOpDeploy(src: OpDeploy): Cell {
    let b_0 = new Builder();
    b_0 = b_0.storeUint(1570915180, 32);
    b_0 = b_0.storeUint(src.queryId, 64);
    b_0 = b_0.storeAddress(src.requestor);
    return b_0.endCell();
}

export function packStackOpDeploy(src: OpDeploy, __stack: StackItem[]) {
    __stack.push({ type: 'int', value: src.queryId });
    __stack.push({ type: 'slice', cell: beginCell().storeAddress(src.requestor).endCell() });
}

export function packTupleOpDeploy(src: OpDeploy): StackItem[] {
    let __stack: StackItem[] = [];
    __stack.push({ type: 'int', value: src.queryId });
    __stack.push({ type: 'slice', cell: beginCell().storeAddress(src.requestor).endCell() });
    return __stack;
}

export function unpackStackOpDeploy(slice: TupleSlice4): OpDeploy {
    const queryId = slice.readBigNumber();
    const requestor = slice.readAddress();
    return { $$type: 'OpDeploy', queryId: queryId, requestor: requestor };
}
export function unpackTupleOpDeploy(slice: TupleSlice4): OpDeploy {
    const queryId = slice.readBigNumber();
    const requestor = slice.readAddress();
    return { $$type: 'OpDeploy', queryId: queryId, requestor: requestor };
}
export type OpDeployReady = {
    $$type: 'OpDeployReady';
    queryId: BN;
}

export function packOpDeployReady(src: OpDeployReady): Cell {
    let b_0 = new Builder();
    b_0 = b_0.storeUint(3923668259, 32);
    b_0 = b_0.storeUint(src.queryId, 64);
    return b_0.endCell();
}

export function packStackOpDeployReady(src: OpDeployReady, __stack: StackItem[]) {
    __stack.push({ type: 'int', value: src.queryId });
}

export function packTupleOpDeployReady(src: OpDeployReady): StackItem[] {
    let __stack: StackItem[] = [];
    __stack.push({ type: 'int', value: src.queryId });
    return __stack;
}

export function unpackStackOpDeployReady(slice: TupleSlice4): OpDeployReady {
    const queryId = slice.readBigNumber();
    return { $$type: 'OpDeployReady', queryId: queryId };
}
export function unpackTupleOpDeployReady(slice: TupleSlice4): OpDeployReady {
    const queryId = slice.readBigNumber();
    return { $$type: 'OpDeployReady', queryId: queryId };
}
export type OpExecute = {
    $$type: 'OpExecute';
    queryId: BN;
    operation: Operation;
}

export function packOpExecute(src: OpExecute): Cell {
    let b_0 = new Builder();
    b_0 = b_0.storeUint(3871391700, 32);
    b_0 = b_0.storeUint(src.queryId, 64);
    b_0 = b_0.storeCellCopy(packOperation(src.operation));
    return b_0.endCell();
}

export function packStackOpExecute(src: OpExecute, __stack: StackItem[]) {
    __stack.push({ type: 'int', value: src.queryId });
    packStackOperation(src.operation, __stack);
}

export function packTupleOpExecute(src: OpExecute): StackItem[] {
    let __stack: StackItem[] = [];
    __stack.push({ type: 'int', value: src.queryId });
    __stack.push({ type: 'tuple', items: packTupleOperation(src.operation) });
    return __stack;
}

export function unpackStackOpExecute(slice: TupleSlice4): OpExecute {
    const queryId = slice.readBigNumber();
    const operation = unpackStackOperation(slice);
    return { $$type: 'OpExecute', queryId: queryId, operation: operation };
}
export function unpackTupleOpExecute(slice: TupleSlice4): OpExecute {
    const queryId = slice.readBigNumber();
    const operation = unpackTupleOperation(slice);
    return { $$type: 'OpExecute', queryId: queryId, operation: operation };
}
export async function Multisig_init(members: Cell, totalWeight: BN, requiredWeight: BN) {
    const __code = 'te6ccgECMwEABDsAART/APSkE/S88sgLAQIBYgIDAgLKBAUCASApKgIBIAYHAgHSJygCASAICQIBIBQVAgEgCgsCASASEwIBSAwNAgFYEBECgRwIddJwh+VMCDXCx/eAtDTAwFxsMABkX+RcOIB+kAiUGZvBPhhApFb4CCCECI0IJW64wKCEObAv9S64wIw8sCCgDg8ACwgbvLQgIADgMO1E0NQB+GL0BIEBAdcAgQEB1wBVIGwTA9MfAYIQIjQglbry4IHTP/pAAQH6ANMf0gDTB20B0gABkjHU3m0B0gABlzHU1FnwDQHeVWAQeDgQmhCJVQbwIMj4QgHMVSBQI/QAgQEBzwCBAQHPAMntVADe7UTQ1AH4YvQEgQEB1wCBAQHXAFUgbBMD0x8BghDmwL/UuvLggdM/+kABAfoA0x/SANMHbQHSAAGSMdTebQHSAAGXMdTUWfANAd5VYBB4OBCaEIlVBvAhyPhCAcxVIFAj9ACBAQHPAIEBAc8Aye1UAEcyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydCAAHRBM/QKb6GUAdcAMOBbbYAAP8QN3loQDeRQABWW8CgIB9BYXAgEgGBkAFSUfwHKAOBwAcoAgAAkcFnwBoAIBIBobAgEgISICASAcHQIBIB8gAfcyHEBygFQB/AWcAHKAlAFzxZQA/oCcAHKaCNusyVus7GOPX/wFshw8BZw8BYkbrOZf/AWBPABUATMlTQDcPAW4iRus5l/8BYE8AFQBMyVNANw8BbicPAWAn/wFgLJWMyWMzMBcPAW4iFus5h/8BYB8AEBzJQxcPAW4skBgHgDJHBwcA3IzEkdRodQREUVA1DczxYa9AAYgQEBzwAWgQEBzwAUygASygDIRhcQNRhQds8WUAT6AhLLH8oAywcibpUycFjKAJZ/AcoAEsziIW6UcDLKAJp/AcoAAfALAszM4skBzMmAABPsAADsCtD0BDCCAJO5AYAQ9A9vofLgZG3I9ADJVZAL8BmAAJwDyMwDUCP0AIEBAc8AgQEBzwDJgAgEgIyQCASAlJgAVDGBAQsygQEB8AeAAAxbgAAUMDGAABRsIYACJDf4QW8kECNfA4EBCysCgQEB8AeCALTjIW6zAvABwgASsPL0+EL4KFQYe1F6RhdQREUVA/AaXPAXf3BQQoBCUEJtAvAYgAAUXwiACASArLAIBIC8wAgEgLS4AN7oc3tRNDUAfhi9ASBAQHXAIEBAdcAVSBsE/AegAO7aQvaiaGoA/DF6AkCAgOuAQICA64AqkDYJqoF4DkAA3t1C9qJoagD8MXoCQICA64BAgIDrgCqQNgn4D8AIBIDEyAAm7Nf8BuAA3tyg9qJoagD8MXoCQICA64BAgIDrgCqQNgn4DsABNt3owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcw';
    const depends = new Map<string, Cell>();
    depends.set('37817', Cell.fromBoc(Buffer.from('te6ccgECIgEABK8AART/APSkE/S88sgLAQIBYgIDAgLLBAUCASAeHwIBIAYHAgEgERICASAICQAFst4FAgFICgsAD/EDd5aEA3kUAn07ftwIddJwh+VMCDXCx/eAtDTAwFxsMABkX+RcOIB+kAiUGZvBPhhApFb4CCCEF2iQ2y64wLAAJEw4w3ywIKAMDQALCBu8tCAgAfww7UTQ1AH4YvpAAQH0BIEBAdcAgQEB1wDSANIA1AHQ+kABAfoA0x/SANMHbQHSAAGSMdTebQHSAAGXMdTUWfAJAd5VYDcQfRB8EHsQehB5EHhVBWwdDdMfAYIQXaJDbLry4IHTP/pAARIyEN4QzRC8EKsQmhCJEHgQZxBWEEUOAv75ASCC8CKu5tCm3BRldyd91Y0GrjCQo83T2KiFYRhCCK5fbrA5uo7XMO1E0NQB+GL6QAEB9ASBAQHXAIEBAdcA0gDSANQB0PpAAQH6ANMf0gDTB20B0gABkjHU3m0B0gABlzHU1FnwCQHeVWA3EH0QfBB7EHoQeRB4VQVsHfAXEA8AyBA0QwDwFsj4QgHMVcBQ3M8WGvQAGIEBAc8AFoEBAc8AFMoAEsoAyEYXEDUYUHbPFlAE+gISyx/KAMsHIm6VMnBYygCWfwHKABLM4iFulHAyygCafwHKAAHwBwLMzOLJAczJ7VQB+uCC8NK0n8iktvGymrVg77TNdGVh0E7oOCT8LZpHU0mxo679uo7W7UTQ1AH4YvpAAQH0BIEBAdcAgQEB1wDSANIA1AHQ+kABAfoA0x/SANMHbQHSAAGSMdTebQHSAAGXMdTUWfAJAd5VYDcQfRB8EHsQehB5EHhVBWwd8BjgEADAyPhCAcxVwFDczxYa9AAYgQEBzwAWgQEBzwAUygASygDIRhcQNRhQds8WUAT6AhLLH8oAywcibpUycFjKAJZ/AcoAEsziIW6UcDLKAJp/AcoAAfAHAszM4skBzMntVNsxAgEgExQAAdwCAVgVFgIBIBgZABUlH8BygDgcAHKAIAH3MhxAcoBUAfwEnABygJQBc8WUAP6AnABymgjbrMlbrOxjj1/8BLIcPAScPASJG6zmX/wEgTwAVAEzJU0A3DwEuIkbrOZf/ASBPABUATMlTQDcPAS4nDwEgJ/8BICyVjMljMzAXDwEuIhbrOYf/ASAfABAcyUMXDwEuLJAYBcABPsAAgEgGhsCASAcHQDJHBwcA3IzEkdRodQREUVA1DczxYa9AAYgQEBzwAWgQEBzwAUygASygDIRhcQNRhQds8WUAT6AhLLH8oAywcibpUycFjKAJZ/AcoAEsziIW6UcDLKAJp/AcoAAfAHAszM4skBzMmAABRfDIAAzHBwgEIEyAGCEOnebSNYyx/LP8lBQG1t8BOAAASACASAgIQBxvd6ME4LnYerpZXPY9CdhzrJUKNs0E4TusalpWyPlmRadeW/vixHME4IGc6tPOK/OkoWA6wtxMj2UAAm4Lc8BSACxuFHe1E0NQB+GL6QAEB9ASBAQHXAIEBAdcA0gDSANQB0PpAAQH6ANMf0gDTB20B0gABkjHU3m0B0gABlzHU1FnwCQHeVWA3EH0QfBB7EHoQeRB4VQVsHfAVg=', 'base64'))[0]);
    let systemCell = beginCell().storeDict(serializeDict(depends, 16, (src, v) => v.refs.push(src))).endCell();
    let __stack: StackItem[] = [];
    __stack.push({ type: 'cell', cell: systemCell });
    __stack.push({ type: 'cell', cell: members});
    __stack.push({ type: 'int', value: totalWeight });
    __stack.push({ type: 'int', value: requiredWeight });
    let codeCell = Cell.fromBoc(Buffer.from(__code, 'base64'))[0];
    let executor = await createExecutorFromCode({ code: codeCell, data: new Cell() });
    let res = await executor.get('init_Multisig', __stack, { debug: true });
    if (res.debugLogs.length > 0) { console.warn(res.debugLogs); }
    let data = res.stack.readCell();
    return { code: codeCell, data };
}

export const Multisig_errors: { [key: string]: string } = {
    '2': `Stack undeflow`,
    '3': `Stack overflow`,
    '4': `Integer overflow`,
    '5': `Integer out of expected range`,
    '6': `Invalid opcode`,
    '7': `Type check error`,
    '8': `Cell overflow`,
    '9': `Cell underflow`,
    '10': `Dictionary error`,
    '13': `Out of gas error`,
    '32': `Method ID not found`,
    '34': `Action is invalid or not supported`,
    '37': `Not enough TON`,
    '38': `Not enough extra-currencies`,
    '128': `Null reference exception`,
    '129': `Invalid serialization prefix`,
    '130': `Invalid incoming message`,
    '131': `Constraints error`,
    '132': `Access denied`,
    '133': `Contract stopped`,
    '134': `Invalid argument`,
    '46307': `Not a member`,
}

export class Multisig {
    readonly executor: ContractExecutor; 
    constructor(executor: ContractExecutor) { this.executor = executor; } 
    
    async send(args: { amount: BN, from?: Address, debug?: boolean }, message: OpRequest | OpExecute) {
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'OpRequest') {
            body = packOpRequest(message);
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'OpExecute') {
            body = packOpExecute(message);
        }
        if (body === null) { throw new Error('Invalid message type'); }
        try {
            let r = await this.executor.internal(new InternalMessage({
                to: this.executor.address,
                from: args.from || this.executor.address,
                bounce: false,
                value: args.amount,
                body: new CommonMessageInfo({
                    body: new CellMessage(body!)
                })
            }), { debug: args.debug });
            if (r.debugLogs.length > 0) { console.warn(r.debugLogs); }
        } catch (e) {
            if (e instanceof ExecuteError) {
                if (e.debugLogs.length > 0) { console.warn(e.debugLogs); }
                if (Multisig_errors[e.exitCode.toString()]) {
                    throw new Error(Multisig_errors[e.exitCode.toString()]);
                }
            }
            throw e;
        }
    }
    async getMember(address: Address) {
        try {
            let __stack: StackItem[] = [];
            __stack.push({ type: 'slice', cell: beginCell().storeAddress(address).endCell() });
            let result = await this.executor.get('member', __stack, { debug: true });
            if (result.debugLogs.length > 0) { console.warn(result.debugLogs); }
            return result.stack.readBigNumberOpt();
        } catch (e) {
            if (e instanceof ExecuteError) {
                if (e.debugLogs.length > 0) { console.warn(e.debugLogs); }
                if (Multisig_errors[e.exitCode.toString()]) {
                    throw new Error(Multisig_errors[e.exitCode.toString()]);
                }
            }
            throw e;
        }
    }
    async getMembers() {
        try {
            let __stack: StackItem[] = [];
            let result = await this.executor.get('members', __stack, { debug: true });
            if (result.debugLogs.length > 0) { console.warn(result.debugLogs); }
            return result.stack.readCellOpt();
        } catch (e) {
            if (e instanceof ExecuteError) {
                if (e.debugLogs.length > 0) { console.warn(e.debugLogs); }
                if (Multisig_errors[e.exitCode.toString()]) {
                    throw new Error(Multisig_errors[e.exitCode.toString()]);
                }
            }
            throw e;
        }
    }
    async getTotalWeight() {
        try {
            let __stack: StackItem[] = [];
            let result = await this.executor.get('totalWeight', __stack, { debug: true });
            if (result.debugLogs.length > 0) { console.warn(result.debugLogs); }
            return result.stack.readBigNumber();
        } catch (e) {
            if (e instanceof ExecuteError) {
                if (e.debugLogs.length > 0) { console.warn(e.debugLogs); }
                if (Multisig_errors[e.exitCode.toString()]) {
                    throw new Error(Multisig_errors[e.exitCode.toString()]);
                }
            }
            throw e;
        }
    }
    async getRequiredWeight() {
        try {
            let __stack: StackItem[] = [];
            let result = await this.executor.get('requiredWeight', __stack, { debug: true });
            if (result.debugLogs.length > 0) { console.warn(result.debugLogs); }
            return result.stack.readBigNumber();
        } catch (e) {
            if (e instanceof ExecuteError) {
                if (e.debugLogs.length > 0) { console.warn(e.debugLogs); }
                if (Multisig_errors[e.exitCode.toString()]) {
                    throw new Error(Multisig_errors[e.exitCode.toString()]);
                }
            }
            throw e;
        }
    }
}