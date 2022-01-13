[parikshan](../README.md) / ParikshanPerformaceEntry

# Interface: ParikshanPerformaceEntry

## Hierarchy

- **`ParikshanPerformaceEntry`**

  ↳ [`ParikshanMongoDocument`](ParikshanMongoDocument.md)

## Table of contents

### Properties

- [detail](ParikshanPerformaceEntry.md#detail)
- [duration](ParikshanPerformaceEntry.md#duration)
- [entryType](ParikshanPerformaceEntry.md#entrytype)
- [name](ParikshanPerformaceEntry.md#name)
- [startTime](ParikshanPerformaceEntry.md#starttime)

## Properties

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

#### Defined in

[parikshan.ts:126](https://github.com/gajananpp/parikshan/blob/b7537f7/src/parikshan.ts#L126)

___

### duration

• **duration**: `number`

A high res timeStamp representing the time value of the duration of the function

#### Defined in

[parikshan.ts:120](https://github.com/gajananpp/parikshan/blob/b7537f7/src/parikshan.ts#L120)

___

### entryType

• **entryType**: ``"measure"``

Entry type

#### Defined in

[parikshan.ts:124](https://github.com/gajananpp/parikshan/blob/b7537f7/src/parikshan.ts#L124)

___

### name

• **name**: ``"parikshan"``

PerformanceEntry name

#### Defined in

[parikshan.ts:118](https://github.com/gajananpp/parikshan/blob/b7537f7/src/parikshan.ts#L118)

___

### startTime

• **startTime**: `number`

A high res timeStamp representing the starting time for the performance metric. Not a UNIX timestamp

#### Defined in

[parikshan.ts:122](https://github.com/gajananpp/parikshan/blob/b7537f7/src/parikshan.ts#L122)
