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

// Define your composition function for asynchronous data fetching
const { data: pals, } = useLazyAsyncData<{
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
      const results: 
      { _id: string,
        index: String,
        name: String,
        is_nocturnal: String,
        kindling: Number,
        watering: Number,
        planting: Number,
        electric: Number,
        handiwork: Number,
        gathering: Number,
        lumbering: Number,
        mining: Number,
        medicine: Number,
        cooling: Number,
        transporting: Number,
        farming: Number,
        food: Number,
        breed_power: String,
        hp: String,
        melee: String,
        shot: String,
        defence: String,
        price: String,
        stamina: String,
        walking: String,
        running: String,
        mounted: String,
        transporting_speed: String,
        capture_multi: String,
        male_chance: String,
        }[] = await collection.find()

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
    watch: []
  }); 
  
  const columns = [
    { key: 'number', label: 'Number', sortable: false },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'power', label: 'Breeding power', sortable: true },
    {key: "type_1", label: "Type 1", sortable: true},
    {key: "type_2", label: "Type 2", sortable: true},
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
  const columnsTable = computed(() => columns.filter((column) => selectedColumns.value.includes(column)))
  const q = ref('');
  const page = ref(1);
  const items = ref([3, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50]);
  const pageCount = ref(15);
  
  // const filteredRows = computed(() => {
  //   const filtered = q.value
  //     ? pals.value.filter((pal) =>
  //         Object.values(pal).some((value) => String(value).toLowerCase().includes(q.value.toLowerCase()))
  //       )
  //     : pals.value;
  
  //   const startIdx = (page.value - 1) * pageCount.value;
  //   const endIdx = page.value * pageCount.value;
  
  //   return filtered.slice(startIdx, endIdx);
  // });
  
  
  const sort = ref({ column: 'name', direction: 'asc' });
  const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1)
  
  const pageTo = computed(() => Math.min(page.value * pageCount.value, pageTotal.value))
  onMounted(() => {
  
  });

  const resetFilters = () => {
    q.value = '';
    selectedColumns.value = [...columns.slice(0, 18)];
    pageCount.value = 15;
  };


  const sortedRows = computed(() => {
    const sorted = pals.value.sort((a, b) => {
      const column = sort.value.column;
      const direction = sort.value.direction === 'asc' ? 1 : -1;

      if (a[column] > b[column]) {
        return direction;
      } else if (a[column] < b[column]) {
        return -direction;
      } else {
        return 0;
      }
    });

  return q.value
    ? sorted.filter((pal) =>
        Object.values(pal).some((value) => String(value).toLowerCase().includes(q.value.toLowerCase()))
      )
    : sorted;
});

const pageTotal = ref(sortedRows.value.length);

const filteredRows = computed(() => {
  const startIdx = (page.value - 1) * pageCount.value;
  const endIdx = page.value * pageCount.value;

  return sortedRows.value.slice(startIdx, endIdx);
});
</script>
  