import { ref, computed, onMounted } from 'vue';
import * as Realm from 'realm-web';
import type { PalType } from '~/types/PalType';


const app = new Realm.App({ id: 'data-itvjz' });
const credentials = Realm.Credentials.apiKey('fWgqvs2VeZMk0NQ5OFtg2nP5I3GBEoZi5ZrAcbLkPkchtmbASrYvkNkxivS2Banb');
app.logIn(credentials);
const mongo = app.currentUser.mongoClient('Palworld');

const collection = mongo.db('palworld_db').collection('pal');

export const findCollection = async <T>(dbName: string, collectionName: string): Promise<T[]> => {
    const collection = mongo.db(dbName).collection(collectionName);
    const results: T[] = await collection.find();
    return results;
}
