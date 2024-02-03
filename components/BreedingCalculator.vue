<template>
<UContainer  class="dark:bg-gray-900 max-w-fit max-h-fit py-2 items-center justify-center"  :ui="{ base: '', ring: '', divide: 'divide-y divide-gray-200', header: { padding: 'px-4 py-5' }, body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700' }, footer: { padding: 'p-4' } }">
    <UForm  :validate="validate" :state="state" class="space-y-4 items-center justify-center" @submit="onSubmit" @error="onError">
        <h1 class="text-center text-3xl font-bold">CHILD CALCULATOR</h1>
        <div class="flex space-x-4">
            <UFormGroup label="Parent 1" name="parent1">
                <USelectMenu 
                    v-model="state.parent1" 
                    placeholder="Select..." 
                    :options="selectOptions" 
                    clear-search-on-close 
                    searchable 
                    searchable-placeholder="Search a pal..."
                    class="me-2 w-36"
                    />
            </UFormGroup>

            <UFormGroup label="Parent 2" name="parent2">
                <USelectMenu v-model="state.parent2" 
                    placeholder="Select..." 
                    :options="selectOptions" 
                    clear-search-on-close 
                    searchable 
                    searchable-placeholder="Search a pal..."
                    :ui="{ width: 'w-auto' }"
                    class="me-2 w-36"
                    />
            </UFormGroup>
            <UButton type="submit" icon='i-heroicons-magnifying-glass-circle' variant="link" size="xl">
              Breed
            </UButton>
        </div>
  </UForm>
  <UTable class="items-center justify-center pt-3 w-80" 
  :rows="rows"
  :columns="columns"
  :loading="loading"
  :emptyState="{icon: '', label: ''}"
  :ui="{'th': {'base': 'text-center'}, 'td': {'base': 'whitespace-nowrap text-center'}}"
   />
</UContainer>
</template>


<script setup lang="ts">
import type { FormError, FormErrorEvent, FormSubmitEvent } from '#ui/types'
import { palStore } from '~/store/palStore';
import { findChild } from '~/services/mongodb';
import type { PalBreeding } from '~/types/PalBreeding'

const rows = ref<{child: String}[]>([])
const loading = ref<Boolean>(false)
const store = palStore()
const state = reactive({
  parent1: undefined,
  parent2: undefined
})
const columns = [
    {key: 'child', label: "Child"}
]
const selectOptions = store.rows.map((row) => ({
  label: row.name,
  value: row.name, // You can use a different property based on what you want to set as the selected value
}));


const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.parent1) errors.push({ path: 'parent1', message: 'Required' })
  if (!state.parent2) errors.push({ path: 'parent2', message: 'Required' })
  return errors
}

async function onSubmit (event: FormSubmitEvent<any>) {
    loading.value = true;
    const response :PalBreeding[] = await findChild('palworld_db', 'pal_breeding', event.data)
    rows.value = response.map((row) => ({
        child: row.child
    }));
    loading.value = false;
}

async function onError (event: FormErrorEvent) {
  const element = document.getElementById(event.errors[0].id)
  element?.focus()
  element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}
</script>