<template>
    <div>
        <h1>Data from MongoDB Realm</h1>  
        <UTable :rows="data" />
    </div>
</template>

<script setup>
import * as Realm from "realm-web";

const data = ref();

onMounted(async () => {
    const app = new Realm.App({ id: "data-itvjz" });
    const credentials = Realm.Credentials.apiKey('fWgqvs2VeZMk0NQ5OFtg2nP5I3GBEoZi5ZrAcbLkPkchtmbASrYvkNkxivS2Banb');
    const user = await app.logIn(credentials);
    console.assert(user.id === app.currentUser.id);
    const mongo = app.currentUser.mongoClient('Palworld');
    const collection = mongo.db('Palworld').collection('Pals');
    const pal = await collection.find();
    data.value = pal;
});
</script>