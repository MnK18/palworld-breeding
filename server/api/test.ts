// import Realm from 'realm-web'

// const app = new Realm.App({ id: "65b2c300d1659a38cea0bc27" });
// const credentials = Realm.Credentials.apiKey('fWgqvs2VeZMk0NQ5OFtg2nP5I3GBEoZi5ZrAcbLkPkchtmbASrYvkNkxivS2Banb');
// try {
//   const user =  app.logIn(credentials);
//   const mongo = app.currentUser.mongoClient('Palworld');
//   const collection = mongo.db('Palworld').collection('Pals');
//   console.log(collection);
// } catch(err) {
//   console.error("Failed to log in", err);
// }
  
  
// <!-- <script setup lang="ts">
//   import { ref, computed, onMounted } from 'vue';
//   import * as Realm from 'realm-web';
  
//   // Declare pending
//   const pending = ref(false);  // Assuming pending is a boolean, adjust as needed
  
// const q = ref('');
// const page = ref(1);
// const pageCount = 5;
// const pageFrom = ref(0);
// const pageTo = ref(0);
// const pals = ref([] as { number: number; name: string; power: number }[]);
// const columns = [{
//   key: 'number',
//   label: 'Number',
//   sortable: true
// }, {
//   key: 'name',
//   label: 'Name',
//   sortable: true
// }, {
//   key: 'power',
//   label: 'Breeding power',
//   sortable: true
// }];


// const filteredRows = computed(() => {
//   const filtered = q.value
//     ? pals.value.filter((pal) =>
//         Object.values(pal).some((value) => String(value).toLowerCase().includes(q.value.toLowerCase()))
//       )
//     : pals.value;

//   const startIdx = (page.value - 1) * pageCount;
//   const endIdx = page.value * pageCount;

//   return filtered.slice(startIdx, endIdx);
// });

// const rows = computed(() => {
//   return pals.value.slice((page.value - 1) * pageCount, (page.value) * pageCount);
// });

// onMounted(async () => {
//   const app = new Realm.App({ id: 'data-itvjz' });
//   const credentials = Realm.Credentials.apiKey('fWgqvs2VeZMk0NQ5OFtg2nP5I3GBEoZi5ZrAcbLkPkchtmbASrYvkNkxivS2Banb');
//   await app.logIn(credentials);
//   if (app.currentUser) {
//     const mongo = app.currentUser.mongoClient('Palworld');
//     const collection = mongo.db('palworld_db').collection('pal');
//     const results: { _id: string; key: number; name: string; power: number }[] = await collection.find();

//     for (const result of results) {
//       pals.value.push({
//         number: result.key,
//         name: result.name,
//         power: result.power,
//       });
//     }

//     console.log(pals.value);
//   }
// });
// </script> -->