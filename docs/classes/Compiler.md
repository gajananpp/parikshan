[parikshan](../README.md) / Compiler

# Class: Compiler

Compiler class

**`example`**
How to use it:
```javascript
const compiler = new Compiler()
const compiledFileContents = await compiler.compile(["build/src/**\/*.js"], "output", true)
```

## Table of contents

### Constructors

- [constructor](Compiler.md#constructor)

### Properties

- [parikshanAST](Compiler.md#parikshanast)

### Methods

- [compile](Compiler.md#compile)
- [transform](Compiler.md#transform)

## Constructors

### constructor

• **new Compiler**()

## Properties

### parikshanAST

▪ `Static` **parikshanAST**: `VariableDeclaration`

AST for requiring parikshan to be added at start of each file

#### Defined in

compiler.ts:23

## Methods

### compile

▸ **compile**(`globPaths`, `destPath`, `captureSourceLocation?`): `Promise`<`void`[]\>

Reads source from matched files and writes transformed
source to output dir keeping the file structure

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `globPaths` | `string`[] | `undefined` | input file glob patterns |
| `destPath` | `string` | `undefined` | output dir |
| `captureSourceLocation` | `boolean` | `false` | set it to true if wanted to capture line, column number and filename in performance entry |

#### Returns

`Promise`<`void`[]\>

#### Defined in

compiler.ts:140

___

### transform

▸ **transform**(`src`, `filePath?`, `captureSourceLocation?`): `string`

Wraps source code's functions and their arguments
which could possibly have function value at runtime into [`parikshan`](../README.md) function

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `src` | `string` | original source code |
| `filePath?` | `string` | source code file path |
| `captureSourceLocation?` | `boolean` | whether to pass source code coordinates as argument to [`parikshan`](../README.md) function |

#### Returns

`string`

transformed source code

#### Defined in

compiler.ts:73
