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
        </div>
      </div>
  
      <!-- Table -->
      <UTable
        :columns="columns"
        :rows="filteredRows"
        :loading="pending"
        sort-asc-icon="i-heroicons-arrow-up"
        sort-desc-icon="i-heroicons-arrow-down"
        class="w-full"
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
  number: number;
  name: string;
  power: number;
}[]>('pals', async () => {
  const app = new Realm.App({ id: 'data-itvjz' });
  const credentials = Realm.Credentials.apiKey('fWgqvs2VeZMk0NQ5OFtg2nP5I3GBEoZi5ZrAcbLkPkchtmbASrYvkNkxivS2Banb');
  await app.logIn(credentials);

  if (app.currentUser) {
    const mongo = app.currentUser.mongoClient('Palworld');
    const collection = mongo.db('palworld_db').collection('pal');
    const results: { _id: string; key: number; name: string; power: number }[] = await collection.find();

    return results.map((result) => ({
      number: result.key,
      name: result.name,
      power: result.power
    }));
  }

  return []; // Default value when data fetching fails or no data available
}, {
  default: () => [],
  watch: [] // Add the necessary dependencies here
});

const columns = [
  { key: 'number', label: 'Number', sortable: true },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'power', label: 'Breeding power', sortable: true }
];

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
  // No need to include data fetching logic here since it's handled by the composition function
});
</script>
