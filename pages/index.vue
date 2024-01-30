<template>
    <ColorMode class="dark:bg-gray-900" />
    <UCard class="w-full" :ui="{ base: '', ring: '', divide: 'divide-y divide-gray-200', header: { padding: 'px-4 py-5' }, body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700' }, footer: { padding: 'p-4' } }">
      <template #header>
        <h2 class="font-semibold text-xl text-gray-900 dark:text-white leading-tight">
          Pals
        </h2>
      </template>
  
      <!-- Filters -->
      <div class="h-3/4 w-full">
      <div class="flex items-center justify-between gap-3 px-4 py-3">
        <UInput v-model="q" icon="i-heroicons-magnifying-glass-20-solid" placeholder="Search..." />
      </div>
  
      <!-- Header and Action buttons -->
      <div class="flex justify-between items-center w-full px-4 py-3">
        <div class="flex items-center gap-1.5">
          <span class="text-sm leading-5">Rows per page:</span>
  
          <USelect v-model="pageCount" :options="[3, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50]" class="me-2 w-20" size="xs" />
          
          <span class="text-sm leading-5">Columns on page:</span>
          
          <USelectMenu v-model="selectedColumns" :options="columns" multiple placeholder="Columns" />
        </div>
      </div>
  
      <!-- Table -->
      <UTable
        :columns="selectedColumns"
        :rows="filteredRows"
        :loading="pending"
        sort-asc-icon="i-heroicons-arrow-up"
        sort-desc-icon="i-heroicons-arrow-down"
        class="w-full table-auto overflow-hidden sm:overflow-x-auto"
      >
      </UTable>
    </div>
      <!-- Number of rows & Pagination -->
      <template #footer>
        <div class="flex flex-wrap justify-between items-center">
          <div>
            <span class="text-sm leading-5">
              Showing
              <span class="font-medium">{{ pageFrom }}</span>
              to
              <span class="font-medium">{{ pageTo }}</span>
              of
              <span class="font-medium">{{ pals.length }}</span>
              results
            </span>
          </div>
  
          <UPagination
            v-model="page"
            :page-count="pageCount"
            :total="pals.length"
            :ui="{
              wrapper: 'flex items-center gap-1',
              rounded: '!rounded-full min-w-[32px] justify-center',
              default: {
                activeButton: {
                  variant: 'outline',
                },
              },
            }"
          />
        </div>
      </template>
    </UCard>
  </template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import * as Realm from 'realm-web';

// Define your composition function for asynchronous data fetching
const { data: pals, pending } = useLazyAsyncData<{
  number: string;
  name: string;
  power: number;
  type_1: String;
  type_2: String; 
  is_nocturnal: String; 
  kindling: Number; 
  watering: Number; 
  planting: Number; 
  electric: Number; 
  handiwork: Number; 
  gathering: Number; 
  lumbering: Number; 
  mining: Number; 
  medicine: Number; 
  cooling: Number; 
  transporting: Number; 
  farming: Number; 
  food: Number;
  hp: Number; 
  melee: Number; 
  shot: Number; 
  defence: Number; 
  price: Number; 
  stamina: Number; 
  walking: Number; 
  running: Number; 
  mounted: Number; 
  transporting_speed: Number; 
  capture_multi: Number; 
  male_chance: Number;

}[]>('pals', async () => {
  const app = new Realm.App({ id: 'data-itvjz' });
  const credentials = Realm.Credentials.apiKey('fWgqvs2VeZMk0NQ5OFtg2nP5I3GBEoZi5ZrAcbLkPkchtmbASrYvkNkxivS2Banb');
  await app.logIn(credentials);

  if (app.currentUser) {
    const mongo = app.currentUser.mongoClient('Palworld');
    const collection = mongo.db('palworld_db').collection('pal');
    const results: { _id: string; index: String, name: String, is_nocturnal: String, kindling: Number, watering: Number; planting: Number; electric: Number; handiwork: Number; gathering: Number; lumbering: Number; mining: Number; medicine: Number; cooling: Number; transporting: Number; farming: Number; food: Number; breed_power: String; hp: String; melee: String; shot: String; defence: String; price: String; stamina: String; walking: String; running: String; mounted: String; transporting_speed: String; capture_multi: String; male_chance: String;}[] = await collection.find();
    const collection2 = mongo.db('palworld_db').collection('pal_breeding');
    const find: {_id: string; parent1: string; parent2:string; child: string}[] = await collection2.find({child: "Lamball"})
    console.log(results)
    return results.map((result) => ({
      number: result.index,
      name: result.name,
      power: result.breed_power,
      type_1: result['type 1'],
      type_2: result['type 2'],
      is_nocturnal: result.is_nocturnal,
      kindling: result.kindling,
      watering: result.watering,
      planting: result.planting,
      electric: result.electric,
      handiwork: result.handiwork,
      gathering: result.gathering,
      lumbering: result.lumbering,
      mining: result.mining,
      medicine: result.medicine,
      cooling: result.cooling,
      transporting: result.transporting,
      farming: result.farming,
      food: result.food,
      hp: result.hp,
      melee: result.melee,
      shot: result.shot,
      defence: result.defence,
      price: result.price,
      stamina: result.stamina,
      walking: result.walking,
      running: result.running,
      mounted: result.mounted,
      transporting_speed: result.transporting_speed,
      capture_multi: result.capture_multi,
      male_chance: result.male_chance,
    }));
  }

  return []; // Default value when data fetching fails or no data available
}, {
  default: () => [],
  watch: [] // Add the necessary dependencies here
}); 

const columns = [
  { key: 'number', label: 'Number', sortable: false },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'power', label: 'Breeding power', sortable: true },
  {key: "type_1", label: "Type 1", sortable: true},
  {key: "type_2", label: "Type 2", sortable: true},
  {key: "is_nocturnal", label: "Found at Night", sortable: true},
  {key: "kindling", label: "Kindling", sortable: true},
  {key: "watering", label: "Watering", sortable: true},
  {key: "planting", label: "Planting", sortable: true},
  {key: "electric", label: "Electric", sortable: true},
  {key: "handiwork", label: "Handiwork", sortable: true},
  {key: "gathering", label: "Gathering", sortable: true},
  {key: "lumbering", label: "Lumbering", sortable: true},
  {key: "mining", label: "Mining", sortable: true},
  {key: "medicine", label: "Medicine", sortable: true},
  {key: "cooling", label: "Cooling", sortable: true},
  {key: "transporting", label: "Transporting", sortable: true},
  {key: "farming", label: "Farming", sortable: true},
  {key: "food", label: "Food", sortable: true},
  {key: "hp", label: "Health", sortable: true},
  {key: "melee", label: "Melee Damage", sortable: true},
  {key: "shot", label: "Ranged Damage", sortable: true},
  {key: "defence", label: "Defence", sortable: true},
  {key: "price", label: "Price", sortable: true},
  {key: "stamina", label: "Stamina", sortable: true},
  {key: "walking", label: "Walking", sortable: true},
  {key: "running", label: "Running", sortable: true},
  {key: "mounted", label: "Mounted", sortable: true},
  {key: "transporting_speed", label: "Transporting Speed", sortable: true},
  {key: "capture_multi", label: "Capture Multiple", sortable: true},
  {key: "male_chance", label: "Male Chance (%)", sortable: true},
];

const selectedColumns = ref([...columns.slice(0, 18)]);
const q = ref('');
const page = ref(1);
const items = ref([3, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50]);
const pageCount = ref(15);

const filteredRows = computed(() => {
  const filtered = q.value
    ? pals.value.filter((pal) =>
        Object.values(pal).some((value) => String(value).toLowerCase().includes(q.value.toLowerCase()))
      )
    : pals.value;

  const startIdx = (page.value - 1) * pageCount.value;
  const endIdx = page.value * pageCount.value;

  return filtered.slice(startIdx, endIdx);
});


const pageTotal = ref(pals.value.length) // This value should be dynamic coming from the API
const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1)

const pageTo = computed(() => Math.min(page.value * pageCount.value, pageTotal.value))
onMounted(() => {

});
</script>
