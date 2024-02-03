import { ref, computed, onMounted } from 'vue';
import * as Realm from 'realm-web';
import type { PalType } from '~/types/PalType';

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
    console.log(parents['parent2']['value'],parents['parent1']['value'])
    const results: T[] = await collection.find({'parent1': parents['parent1']['value'], 'parent2': parents['parent2']['value']});
    return results;
}
