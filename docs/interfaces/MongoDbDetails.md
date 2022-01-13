[parikshan](../README.md) / MongoDbDetails

# Interface: MongoDbDetails

## Table of contents

### Properties

- [collectionName](MongoDbDetails.md#collectionname)
- [dbConnectionString](MongoDbDetails.md#dbconnectionstring)
- [dbName](MongoDbDetails.md#dbname)
- [deleteAfterSeconds](MongoDbDetails.md#deleteafterseconds)

## Properties

### collectionName

• **collectionName**: `string`

collection name. If not present then it will be created

#### Defined in

mongoPerfSubscriber.ts:11

___

### dbConnectionString

• **dbConnectionString**: `string`

mongodb connection string

#### Defined in

mongoPerfSubscriber.ts:7

___

### dbName

• **dbName**: `string`

db name

#### Defined in

mongoPerfSubscriber.ts:9

___

### deleteAfterSeconds

• `Optional` **deleteAfterSeconds**: `number`

auto delete document after n seconds. Ignore to keep document

#### Defined in

mongoPerfSubscriber.ts:13
