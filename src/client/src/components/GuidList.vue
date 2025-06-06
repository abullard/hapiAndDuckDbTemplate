<script setup>
const items = [
    { id: '7d8dc10d-bfb4-4b0e-8252-e993e69b6902', count: '1' },
    { id: '98ce3e10-22e7-4e34-bd5a-d6a72c4aed6f', count: '2' },
    { id: '98ce3e10-22e7-4e34-bd5a-d6a72c4aed6f', count: '3' },
    { id: '98ce3e10-22e7-4e34-bd5a-d6a72c4aed6f', count: '4' },
    { id: '98ce3e10-22e7-4e34-bd5a-d6a72c4aed6f', count: '5' },
    { id: '98ce3e10-22e7-4e34-bd5a-d6a72c4aed6f', count: '6' },
    { id: '98ce3e10-22e7-4e34-bd5a-d6a72c4aed6f', count: '7' },
    { id: '98ce3e10-22e7-4e34-bd5a-d6a72c4aed6f', count: '8' },
    { id: '98ce3e10-22e7-4e34-bd5a-d6a72c4aed6f', count: '9' },
    { id: '98ce3e10-22e7-4e34-bd5a-d6a72c4aed6f', count: '10' },
    { id: '98ce3e10-22e7-4e34-bd5a-d6a72c4aed6f', count: '11' },
    { id: '98ce3e10-22e7-4e34-bd5a-d6a72c4aed6f', count: '12' },
    { id: '98ce3e10-22e7-4e34-bd5a-d6a72c4aed6f', count: '13' },
]
</script>

<template>
    <div class="database-items" v-for="item of items">
        <p>{{ item.count }} - {{ item.id }}</p>
    </div>
</template>

<style scoped>
.database-items {
    outline: solid 1px gray;
    border-radius: 4px;
    padding: 0.5rem;
    margin: 1rem;
}
</style>
