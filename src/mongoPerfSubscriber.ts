import {Collection, MongoClient, TimeSeriesCollectionOptions} from 'mongodb';
import {PerformanceObserver} from 'perf_hooks';
import {ParikshanPerformaceEntry} from '.';

export interface MongoDbDetails {
  /** mongodb connection string */
  dbConnectionString: string;
  /** db name */
  dbName: string;
  /** collection name. If not present then it will be created */
  collectionName: string;
  /** auto delete document after n seconds. Ignore to keep document */
  deleteAfterSeconds?: number;
}

const collections: {parikshans?: Collection} = {};

/**
 * Connects to db and and saves performance measurements in time series collection,
 * if collection doesn't exist then a new time series collection with given name will be created
 * @param dbDetails - mongo db and collection details
 */
export const initMongoPerfSubscriber = async (dbDetails: MongoDbDetails) => {
  const client = new MongoClient(dbDetails.dbConnectionString);
  await client.connect();
  const db = client.db(dbDetails.dbName);
  const currentCollections = await db.collections({
    nameOnly: true,
  });
  const serverInfo = await db.admin().serverInfo();
  if (
    serverInfo.version >= '5' &&
    !currentCollections.find(
      collection => collection.collectionName === dbDetails.collectionName
    )
  ) {
    const opts: TimeSeriesCollectionOptions = {
      timeField: 'calledAt',
      metaField: 'functionName',
      granularity: 'seconds',
    };
    collections.parikshans = await db.createCollection(
      dbDetails.collectionName,
      {
        timeseries: opts,
        expireAfterSeconds: dbDetails.deleteAfterSeconds,
      }
    );
  } else {
    collections.parikshans = db.collection(dbDetails.collectionName);
  }
};

export interface ParikshanMongoDocument extends ParikshanPerformaceEntry {
  /** `timeField`. `Date` object for function called at */
  calledAt: Date;
  /** `metaField`. Function name. 'anonymous' if function doesn't have any name */
  functionName: string;
}

// not keeping it in mongoentry since multiple function calls will create multiple observers
const observer = new PerformanceObserver(entryList => {
  if (collections.parikshans) {
    const entries = entryList.getEntries();
    const parikshans: ParikshanMongoDocument[] = entries
      .filter(
        entry =>
          entry.name === 'parikshan' &&
          (<any>entry).detail?.functionName !== 'initMongoPerfSubscriber'
      )
      .map((entry: any) => {
        const entryJSON = entry.toJSON();
        entryJSON.calledAt = entryJSON.detail.calledAt;
        entryJSON.functionName = entryJSON.detail.functionName;
        return entryJSON;
      });
    if (parikshans.length) collections.parikshans.insertMany(parikshans);
  }
});

observer.observe({
  entryTypes: ['measure'],
});
