
<template>
     <h3>{{ product.title }}</h3>
    <p><strong>Dátum:</strong> {{ product.updated_at }}, <strong>Szerző: </strong>{{ product.user_name }} </p>
    <p>{{ product.description }}</p>
</template>


<script setup>
const props = defineProps(['product']);
</script>

<style lang="scss" scoped></style>