parikshan

# parikshan

## Table of contents

### Namespaces

- [parikshan](modules/parikshan.md)

### Classes

- [Compiler](classes/Compiler.md)

### Interfaces

- [AnyFunction](interfaces/AnyFunction.md)
- [MongoDbDetails](interfaces/MongoDbDetails.md)
- [ParikshanMongoDocument](interfaces/ParikshanMongoDocument.md)
- [ParikshanPerformaceEntry](interfaces/ParikshanPerformaceEntry.md)

### Variables

- [parikshan](README.md#parikshan)

### Functions

- [initMongoPerfSubscriber](README.md#initmongoperfsubscriber)

## Variables

### parikshan

• **parikshan**: `Object`

#### Call signature

▸ (`fn`, `loc?`): (...`args`: `any`[]) => `any`

Wraps input function with performance measurement.
If the wrapped function returns a promise,
a finally handler will be attached to the promise and the duration will be reported once the finally handler is invoked

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | [`AnyFunction`](interfaces/AnyFunction.md) | input function |
| `loc?` | `SourceLocation` | location of function in original source code |

##### Returns

`fn`

function wrapped with performance hooks

▸ (...`args`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

`any`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `usesThisOrNative` | (`fn`: [`AnyFunction`](interfaces/AnyFunction.md)) => `boolean` |

#### Defined in

parikshan.ts:23

## Functions

### initMongoPerfSubscriber

▸ `Const` **initMongoPerfSubscriber**(`dbDetails`): `Promise`<`void`\>

Connects to db and and saves performance measurements in time series collection,
if collection doesn't exist then a new time series collection with given name will be created

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dbDetails` | [`MongoDbDetails`](interfaces/MongoDbDetails.md) | mongo db and collection details |

#### Returns

`Promise`<`void`\>

#### Defined in

mongoPerfSubscriber.ts:23
