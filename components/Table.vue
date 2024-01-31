<template>
    <div class="dark:bg-gray-900 min-h-full max-w-fit max-h-full">
        <UContainer class="dark:bg-gray-900 min-h-full max-w-fit max-h-full pb-2" :ui="{ strategy: 'override', base: '', padding: 'px-1 sm:px-3', constrained:''}">
        <!-- Filters -->
        <div class="h-3/4 w-full">
        <div class="flex items-center justify-between gap-3 px-4 py-3">
            <UInput v-model="q" icon="i-heroicons-magnifying-glass-20-solid" placeholder="Search..." />
        </div>
        <UDivider></UDivider>
        <!-- Header and Action buttons -->
        <div class="flex justify-between items-center w-full px-4 py-3">
            <div class="flex items-center gap-1.5">
            <span class="text-sm leading-5 pr-1">Rows per page:</span>
    
            <USelect v-model="pageCount" :options="[3, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50]" class="me-2 w-20" size="xs" />
            
            <USelectMenu v-model="selectedColumns" :options="columns" multiple size="xl" :ui="{ width: 'w-auto' }" class="me-2 w-32" >
            <UButton
                icon="i-heroicons-view-columns"
                color="gray"
                size="xs"
                :ui="{width: 'w-96'}"
                class="me-2 justify-center items-center  w-32"
            >
                Columns
                <template #trailing>
                <UIcon name="i-heroicons-chevron-down-20-solid" class="text-base"/>
                </template>
            </UButton>
            </USelectMenu>

            <UButton
            icon="i-heroicons-funnel"
            color="gray"
            size="xs"
            @click="resetFilters"
            >
            Reset
            </UButton>
            </div>
        </div>
    
        <UDivider class="py-2"></UDivider> 
        <!-- Table -->
        <UTable
            :columns="columnsTable"
            :rows="filteredRows"
            :loading="pending"
            v-model:sort="sort"
            sort-mode="manual"
            sort-asc-icon="i-heroicons-arrow-up"
            sort-desc-icon="i-heroicons-arrow-down"
            :ui="{ strategy: 'override' ,base: 'table-fixed', wrapper: 'relative overflow-x-auto max-w-full'}"
        >
        </UTable>
        
        <UDivider class="py-3"></UDivider>
        </div>
        <!-- Number of rows & Pagination -->
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
                v-model:sort="sort"
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
        </UContainer>
    </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import * as Realm from 'realm-web';
import type { PalType } from '~/types/PalType';

const sort = ref({ column: 'number', direction: 'asc' as const })

// Define your composition function for asynchronous data fetching
const { data: pals, pending } = useLazyAsyncData<PalType[]>('pals', async () => {
  const app = new Realm.App({ id: 'data-itvjz' });
  const credentials = Realm.Credentials.apiKey('fWgqvs2VeZMk0NQ5OFtg2nP5I3GBEoZi5ZrAcbLkPkchtmbASrYvkNkxivS2Banb');
  await app.logIn(credentials);

  if (app.currentUser) {
    const mongo = app.currentUser.mongoClient('Palworld');
    const collection = mongo.db('palworld_db').collection('pal');
    const results: any[] = await collection.find();

    const sortedResults: PalType[] = results.map((result) => ({
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

    const sortedAndFilteredResults = sortedResults.sort((a, b) => {
      const columnA = a[sort.value.column];
      const columnB = b[sort.value.column];

      // Convert the values to numbers for numeric columns
      const numericA = typeof columnA === 'string' ? parseFloat(columnA) : columnA;
      const numericB = typeof columnB === 'string' ? parseFloat(columnB) : columnB;

      if (numericA < numericB) {
        return sort.value.direction === 'asc' ? -1 : 1;
      }
      if (numericA > numericB) {
        return sort.value.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sortedAndFilteredResults;
  }

  // Default value when data fetching fails or no data available
  return [];
}, {
  default: () => [],
  watch: [sort],
});


  
  const columns = [
    { key: 'number', label: 'Number', sortable: true, },
    { key: 'name', label: 'Name', sortable: true, class: 'String' },
    { key: 'power', label: 'Breeding power', sortable: true, class: 'Number'},
    {key: "type_1", label: "Type 1", sortable: true, class: 'String'},
    {key: "type_2", label: "Type 2", sortable: true, class: 'String'},
    {key: "is_nocturnal", label: "Found at Night", sortable: true},
    {key: "kindling", label: "Kindling", sortable: true, class: 'Number'},
    {key: "watering", label: "Watering", sortable: true, class: 'Number'},
    {key: "planting", label: "Planting", sortable: true, class: 'Number'},
    {key: "electric", label: "Electric", sortable: true, class: 'Number'},
    {key: "handiwork", label: "Handiwork", sortable: true, class: 'Number'},
    {key: "gathering", label: "Gathering", sortable: true, class: 'Number'},
    {key: "lumbering", label: "Lumbering", sortable: true, class: 'Number'},
    {key: "mining", label: "Mining", sortable: true, class: 'Number'},
    {key: "medicine", label: "Medicine", sortable: true, class: 'Number'},
    {key: "cooling", label: "Cooling", sortable: true, class: 'Number'},
    {key: "transporting", label: "Transporting", sortable: true, class: 'Number'},
    {key: "farming", label: "Farming", sortable: true, class: 'Number'},
    {key: "food", label: "Food", sortable: true, class: 'Number'},
    {key: "hp", label: "Health", sortable: true, class: 'Number'},
    {key: "melee", label: "Melee Damage", sortable: true, class: 'Number'},
    {key: "shot", label: "Ranged Damage", sortable: true, class: 'Number'},
    {key: "defence", label: "Defence", sortable: true, class: 'Number'},
    {key: "price", label: "Price", sortable: true, class: 'Number'},
    {key: "stamina", label: "Stamina", sortable: true, class: 'Number'},
    {key: "walking", label: "Walking", sortable: true, class: 'Number'},
    {key: "running", label: "Running", sortable: true, class: 'Number'},
    {key: "mounted", label: "Mounted", sortable: true, class: 'Number'},
    {key: "transporting_speed", label: "Transporting Speed", sortable: true, class: 'Number'},
    {key: "capture_multi", label: "Capture Multiple", sortable: true, class: 'Number'},
    {key: "male_chance", label: "Male Chance (%)", sortable: true, class: 'Number'},
  ];
  
  const selectedColumns = ref([...columns.slice(0, 18)]);
  const columnsTable = computed(() => columns.filter((column) => selectedColumns.value.includes(column)))
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
  
  const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1)
  
  const pageTo = computed(() => Math.min(page.value * pageCount.value, pageTotal.value))
  onMounted(() => {
  
  });

  const pageTotal = ref(filteredRows.value.length);

  const resetFilters = () => {
    q.value = '';
    selectedColumns.value = [...columns.slice(0, 18)];
    pageCount.value = 15;
  };
</script>
  