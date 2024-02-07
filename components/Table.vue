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
            v-model:sort="sort"
            :loading="store.loading"
            sort-mode="manual"
            sort-desc-icon="i-heroicons-arrow-down"
            sort-asc-icon="i-heroicons-arrow-up"
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
                <span class="font-medium">{{ store.rows.length }}</span>
                results
                </span>
            </div>
    
            <UPagination
                v-model="page"
                v-model:sort="sort"
                :page-count="pageCount"
                :total="store.rows.length"
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
import { ref, computed, watch } from 'vue';
import { findCollection } from '~/services/mongodb';
import { palStore } from '~/store/palStore';

const store = palStore();
const sort = ref({ column: 'number', direction: 'asc' as const });
store.loading = true;
watch(() => [store.rows, sort.value], async ([rows, sortValue]) => {
  if (!rows) {
    store.fetchPalData();
  }

  if (rows && !store.loading) {
    try {
        store.loading = true;
        const sortedAndFilteredResults = store.rows.sort((a, b) => {
          const columnA = a[sort.value.column];
          const columnB = b[sort.value.column];

          const numericA = typeof columnA === 'string' ? parseFloat(columnA) : columnA;
          const numericB = typeof columnB === 'string' ? parseFloat(columnB) : columnB;

          if (numericA === undefined || isNaN(numericA)) {
            return sort.value.direction === 'asc' ? 1 : -1;
          }
          if (numericB === undefined || isNaN(numericB)) {
            return sort.value.direction === 'asc' ? -1 : 1;
          }

          if (numericA < numericB) {
            return sort.value.direction === 'asc' ? -1 : 1;
          }
          if (numericA > numericB) {
            return sort.value.direction === 'asc' ? 1 : -1;
          }
          return 0;
        });
      } finally {
      store.loading = false;
    }
  }});

const columns = [
    { key: 'number', label: 'Number', sortable: true, },
    { key: 'name', label: 'Name', sortable: true, class: 'String' },
    { key: 'breed_power', label: 'Breeding power', sortable: true, class: 'Number'},
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
  if (store.rows) {
    const filtered = q.value
      ? store.rows.filter((pal) =>
          Object.values(pal).some((value) => String(value).toLowerCase().includes(q.value.toLowerCase()))
        )
      : store.rows;

    const startIdx = (page.value - 1) * pageCount.value;
    const endIdx = page.value * pageCount.value;

    return filtered.slice(startIdx, endIdx);
  } else {
    return [];
  }
});
 

const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1);
const pageTo = computed(() => Math.min(page.value * pageCount.value, pageTotal.value));
const pageTotal = ref(store.rows.length);
const resetFilters = () => {
  q.value = '';
  selectedColumns.value = [...columns.slice(0, 18)];
  pageCount.value = 15;
};
console.log(filteredRows.value.length)
watch(() => filteredRows.value, () => {
  pageTotal.value = store.rows.length;
});

// Fetch data on component mount
onMounted(() => {
  store.fetchPalData();
});
</script>
