<template>
  <UCard class="dark:bg-gray-900 max-w-full h-screen pb-2 w-screen"
  :ui="{
      base: '',
      ring: '',
      divide: '',
      header: { padding: 'px-4 py-5' },
      body: { padding: '', base: 'divide-y divide-gray-900 dark:divide-gray-900' },
      footer: { padding: 'p-4', background: 'dark:bg-gray-900'}
    }"
  >
    <template #header>
      <ColorMode  />
    </template>
    <UTabs :items="items" class="w-full">
      <template #table="{ item }">
        <Table />
      </template>

      <template #breeding_calculator="{ item }">
        <BreedingCalculator />
      </template>
    </UTabs>
    <template #footer>
      <div class="dark:bg-gray-900 max-w-full min-w-full pb-2 w-screen">
        
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">

const items = [{
  slot: 'table',
  label: 'Pal table'
}, {
  slot: 'breeding_calculator',
  label: 'Breeding Calculator'
}]
</script>
