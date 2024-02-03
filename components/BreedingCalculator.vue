<template>
  <div class="dark:bg-gray-900 py-2 flex px-5">
    <div class="flex flex-col hide-scrollbar mr-4">
      <div class="max-h-[350px] overflow-y-auto flex flex-col  hide-scrollbar items-center ">
        <UForm :validate="validateCalculator" :state="stateCalculator" class="space-y-4 items-center justify-center" @submit="onSubmitCalculator" @error="onError">
          <h1 class="text-center text-3xl font-bold py-3">Parent Breeding Discovery</h1>
          <div class="flex space-x-4">
            <UFormGroup label="Parent 1" name="parent1">
              <USelectMenu v-model="stateCalculator.parent1" placeholder="Select..." :options="selectOptions" clear-search-on-close searchable searchable-placeholder="Search a pal..." class="me-2 w-36" />
            </UFormGroup>
            <UFormGroup label="Parent 2" name="parent2">
              <USelectMenu v-model="stateCalculator.parent2" placeholder="Select..." :options="selectOptions" clear-search-on-close searchable searchable-placeholder="Search a pal..." :ui="{ width: 'w-auto' }" class="me-2 w-36" />
            </UFormGroup>
            <UButton type="submit" icon='i-heroicons-magnifying-glass-circle' variant="link" size="xl">Breed</UButton>
          </div>
        </UForm>
        <UTable class="items-center justify-center pt-3 w-full" :rows="rowsCalculator" :columns="columnsCalculator" :loading="loadingCalculator" :emptyState="{icon: '', label: ''}" :ui="{'th': {'base': 'text-center'}, 'td': {'base': 'whitespace-nowrap text-center'}}" />
      </div>
      <div class="max-h-[600px] overflow-y-auto hide-scrollbar">
        <h1 class="text-center text-3xl font-bold py-3">Parent Unique Breeding Discovery</h1>
        <UTable class="items-center justify-center" 
          :rows="rowUnuqies"
          :columns="columnsUnique"
          :emptyState="{icon: '', label: ''}"
        />
      </div>
    </div>
    <UDivider orientation="vertical" class="w-1 pl-2 pr-6"  />
    <div class="max-h-[950px] overflow-y-auto hide-scrollbar flex flex-col  w-4/5 items-center">
      <UForm :validate="validateMatrix" :state="stateMatrix" class="space-y-4 items-center justify-center" @submit="onSubmitMatrix" @error="onError">
          <h1 class="text-center text-3xl font-bold py-3">Pal Breeding Matrix</h1>
          <div class="flex space-x-4">
            <UFormGroup label="Parent" name="parent">
              <USelectMenu v-model="stateMatrix.parent" placeholder="Select..." :options="selectOptions" clear-search-on-close searchable searchable-placeholder="Search a pal..." class="me-2 w-36" />
            </UFormGroup>
            <UButton type="submit" icon='i-heroicons-magnifying-glass-circle' variant="link" size="xl">Show matrix</UButton>
          </div>
        </UForm>
        <UTable class="items-center justify-center pt-3 w-full  hide-scrollbar" :rows="rowsMatrix" :columns="columnsMatrix" :loading="loadingMatrix" :emptyState="{icon: '', label: ''}" :ui="{'th': {'base': 'text-center'}, 'td': {'base': 'whitespace-nowrap text-center'}}" />
    </div>
  </div>
</template>



<script setup lang="ts">
import type { FormError, FormErrorEvent, FormSubmitEvent } from '#ui/types'
import { palStore } from '~/store/palStore';
import { findChild, getUniques, getMatrix } from '~/services/mongodb';
import type { PalBreeding } from '~/types/PalBreeding'

const rowsCalculator = ref<{child: String}[]>([])
const rowsMatrix = ref<PalBreeding[]>([])
const loadingCalculator = ref<Boolean>(false)
const loadingMatrix = ref<Boolean>(false)
const store = palStore()
const stateCalculator = reactive({
  parent1: undefined,
  parent2: undefined,
})

const stateMatrix = reactive({
  parent: undefined
})

const columnsCalculator = [
    {key: 'child', label: "Child"}
]

const columnsUnique = [
    {key: 'child', label: "Child", sortable: true, class: "String"},
    {key: 'parent1', label: "Parent 1", sortable: true, class: "String"},
    {key: 'parent2', label: "Parent 2", sortable: true, class: "String"},
]

const columnsMatrix = [
    {key: 'child', label: "Child", sortable: true, class: "String"},
    {key: 'parent1', label: "Parent 1", sortable: true, class: "String"},
    {key: 'parent2', label: "Parent 2", sortable: true, class: "String"},
]

const selectOptions = store.rows.map((row) => ({
  label: row.name,
  value: row.name, // You can use a different property based on what you want to set as the selected value
}));


const validateCalculator = (stateCalculator: any): FormError[] => {
  const errors = []
  if (!stateCalculator.parent1) errors.push({ path: 'parent1', message: 'Required' })
  if (!stateCalculator.parent2) errors.push({ path: 'parent2', message: 'Required' })
  return errors
}

const validateMatrix = (stateCalculator: any): FormError[] => {
  const errors = []
  if (!stateCalculator.parent) errors.push({ path: 'parent', message: 'Required' })
  return errors
}

async function onSubmitCalculator (event: FormSubmitEvent<any>) {
  loadingCalculator.value = true;
    const response :PalBreeding[] = await findChild('palworld_db', 'pal_breeding', event.data)
    rowsCalculator.value = response.map((row) => ({
        child: row.child
    }));
    loadingCalculator.value = false;
}

async function onSubmitMatrix (event: FormSubmitEvent<any>) {
  loadingMatrix.value = true;
  const reponse: PalBreeding[] = await getMatrix('palworld_db', 'pal_breeding', event.data)
  rowsMatrix.value = reponse;
  loadingMatrix.value = false;
}

async function onError (event: FormErrorEvent) {
  const element = document.getElementById(event.errors[0].id)
  element?.focus()
  element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

const parent1Options = ['Relaxaurus', 'Incineram', 'Mau', 'Vanwyrm', 'Eikthyrdeer', 'Elphidran', 'Pyrin', 'Mammorest', 'Mossanda', 'Dinossom', 'Jolthog', 'Frostallion', 'Kingpaca', 'Lyleen', 'Leezpunk', 'Blazehowl', 'Robinquill', 'Broncherry', 'Surfent', 'Gobfin', 'Suzaku', 'Reptyro', 'Hangyu', 'Mossanda', 'Vanwyrm', 'Mossanda', 'Grizzbolt', 'Kitsun'];
const parent2Options = ['Sparkit', 'Maraith', 'Pengullet', 'Foxcicle', 'Hangyu', 'Surfent', 'Katress', 'Wumpo', 'Grizzbolt', 'Rayhound', 'Pengullet', 'Helzephyr', 'Reindrix', 'Menasting', 'Flambelle', 'Felbat', 'Fuddler', 'Fuack', 'Dumud', 'Rooby', 'Jormuntide', 'Foxcicle', 'Swee', 'Petallia', 'Anubis', 'Rayhound', 'Relaxaurus', 'Astegon',];

const parentSets: { parent1: { value: string }; parent2: { value: string } }[] = [];

for (let i = 0; i < parent1Options.length && i < parent2Options.length; i++) {
  const combination1 = {
    parent1: { value: parent1Options[i] },
    parent2: { value: parent2Options[i] }
  };
  const combination2 = {
    parent1: { value: parent2Options[i] },
    parent2: { value: parent1Options[i] }
  };
  parentSets.push(combination1);
  parentSets.push(combination2);
}
const rowUnuqies :PalBreeding[] = await getUniques('palworld_db', 'pal_breeding', parentSets);
</script>