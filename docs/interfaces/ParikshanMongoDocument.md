[parikshan](../README.md) / ParikshanMongoDocument

# Interface: ParikshanMongoDocument

## Hierarchy

- [`ParikshanPerformaceEntry`](ParikshanPerformaceEntry.md)

  ↳ **`ParikshanMongoDocument`**

## Table of contents

### Properties

- [calledAt](ParikshanMongoDocument.md#calledat)
- [detail](ParikshanMongoDocument.md#detail)
- [duration](ParikshanMongoDocument.md#duration)
- [entryType](ParikshanMongoDocument.md#entrytype)
- [functionName](ParikshanMongoDocument.md#functionname)
- [name](ParikshanMongoDocument.md#name)
- [startTime](ParikshanMongoDocument.md#starttime)

## Properties

### calledAt

• **calledAt**: `Date`

`timeField`. `Date` object for function called at

#### Defined in

[mongoPerfSubscriber.ts:56](https://github.com/gajananpp/parikshan/blob/b7537f7/src/mongoPerfSubscriber.ts#L56)

___

### detail

• **detail**: `Object`

Extra details

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `arguments` | `string`[] | list of function's stringified arguments |
| `calledAt` | `Date` | `Date` object for function called at |
| `functionName` | `string` | Function name. 'anonymous' if function doesn't have any name |
| `location` | `undefined` \| { `end`: { `column`: `number` ; `line`: `number`  } ; `filename`: `string` ; `start`: { `column`: `number` ; `line`: `number`  }  } | Location of function in source code. Will be only present when compiled with -s flag else undefined |
| `returnedAt` | `Date` | `Date` object for function returned at |

#### Inherited from

[ParikshanPerformaceEntry](ParikshanPerformaceEntry.md).[detail](ParikshanPerformaceEntry.md#detail)

#### Defined in

[parikshan.ts:126](https://github.com/gajananpp/parikshan/blob/b7537f7/src/parikshan.ts#L126)

___

### duration

• **duration**: `number`

A high res timeStamp representing the time value of the duration of the function

#### Inherited from

[ParikshanPerformaceEntry](ParikshanPerformaceEntry.md).[duration](ParikshanPerformaceEntry.md#duration)

#### Defined in

[parikshan.ts:120](https://github.com/gajananpp/parikshan/blob/b7537f7/src/parikshan.ts#L120)

___

### entryType

• **entryType**: ``"measure"``

Entry type

#### Inherited from

[ParikshanPerformaceEntry](ParikshanPerformaceEntry.md).[entryType](ParikshanPerformaceEntry.md#entrytype)

#### Defined in

[parikshan.ts:124](https://github.com/gajananpp/parikshan/blob/b7537f7/src/parikshan.ts#L124)

___

### functionName

• **functionName**: `string`

`metaField`. Function name. 'anonymous' if function doesn't have any name

#### Defined in

[mongoPerfSubscriber.ts:58](https://github.com/gajananpp/parikshan/blob/b7537f7/src/mongoPerfSubscriber.ts#L58)

___

### name

• **name**: ``"parikshan"``

PerformanceEntry name

#### Inherited from

[ParikshanPerformaceEntry](ParikshanPerformaceEntry.md).[name](ParikshanPerformaceEntry.md#name)

#### Defined in

[parikshan.ts:118](https://github.com/gajananpp/parikshan/blob/b7537f7/src/parikshan.ts#L118)

___

### startTime

• **startTime**: `number`

A high res timeStamp representing the starting time for the performance metric. Not a UNIX timestamp

#### Inherited from

[ParikshanPerformaceEntry](ParikshanPerformaceEntry.md).[startTime](ParikshanPerformaceEntry.md#starttime)

#### Defined in

[parikshan.ts:122](https://github.com/gajananpp/parikshan/blob/b7537f7/src/parikshan.ts#L122)
