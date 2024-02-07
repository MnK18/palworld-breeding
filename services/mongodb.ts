import * as Realm from 'realm-web';

export const findCollection = async <T>(dbName: string, collectionName: string): Promise<T[]> => {
    const app = new Realm.App({ id: 'data-itvjz' });
    const credentials = Realm.Credentials.apiKey('fWgqvs2VeZMk0NQ5OFtg2nP5I3GBEoZi5ZrAcbLkPkchtmbASrYvkNkxivS2Banb');
    await app.logIn(credentials);
    const mongo = app.currentUser.mongoClient('Palworld');
    const collection = mongo.db(dbName).collection(collectionName);
    const results: T[] = await collection.find();
    return results;
}

export const findChild = async <T>(dbName: string, collectionName: string, parents: any): Promise<T[]> => {
    const app = new Realm.App({ id: 'data-itvjz' });
    const credentials = Realm.Credentials.apiKey('fWgqvs2VeZMk0NQ5OFtg2nP5I3GBEoZi5ZrAcbLkPkchtmbASrYvkNkxivS2Banb');
    await app.logIn(credentials);
    const mongo = app.currentUser.mongoClient('Palworld');
    const collection = mongo.db(dbName).collection(collectionName);
    const results: T[] = await collection.find({'parent1': parents['parent1']['value'], 'parent2': parents['parent2']['value']});
    
    if (results.length == 0) {
        const results: T[] = await collection.find({'parent1': parents['parent2']['value'], 'parent2': parents['parent1']['value']});
        return results;
    }
    return results;
}

export const getUniques = async <T>(dbName: string, collectionName: string, parentSets: any[]): Promise<T[]> => {
    const app = new Realm.App({ id: 'data-itvjz' });
    const credentials = Realm.Credentials.apiKey('fWgqvs2VeZMk0NQ5OFtg2nP5I3GBEoZi5ZrAcbLkPkchtmbASrYvkNkxivS2Banb');
    await app.logIn(credentials);
    const mongo = app.currentUser.mongoClient('Palworld');
    const collection = mongo.db(dbName).collection(collectionName);

    const orClauses = parentSets.map(parentSet => ({
        'parent1': parentSet['parent1']['value'],
        'parent2': parentSet['parent2']['value']
    }));

    const results: T[] = await collection.find({
        $or: orClauses
    });

    return results;
}

export const getMatrix = async <T>(dbName: string, collectionName: string, parent: any[]): Promise<T[]> => {
    const app = new Realm.App({ id: 'data-itvjz' });
    const credentials = Realm.Credentials.apiKey('fWgqvs2VeZMk0NQ5OFtg2nP5I3GBEoZi5ZrAcbLkPkchtmbASrYvkNkxivS2Banb');
    await app.logIn(credentials);
    const mongo = app.currentUser.mongoClient('Palworld');
    const collection = mongo.db(dbName).collection(collectionName);

    const results: T[] = await collection.find({ $or: [{ parent1: parent['parent']['value'] }, { parent2: parent['parent']['value'] }] });
    return results;
}

export const getParents = async <T>(dbName: string, collectionName: string, child: any[]): Promise<T[]> => {
    const app = new Realm.App({ id: 'data-itvjz' });
    const credentials = Realm.Credentials.apiKey('fWgqvs2VeZMk0NQ5OFtg2nP5I3GBEoZi5ZrAcbLkPkchtmbASrYvkNkxivS2Banb');
    await app.logIn(credentials);
    const mongo = app.currentUser.mongoClient('Palworld');
    const collection = mongo.db(dbName).collection(collectionName);

    const results: T[] = await collection.find({'child': child['child']['value']});
    return results;
}