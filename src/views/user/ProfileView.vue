<template>
    <div class="container" style="padding-top: 5rem; padding-bottom: 8rem;">
    <h1>{{ user.name }}</h1>
    <h1>{{ user.id }}</h1>
    <h1>{{ user.email }}</h1>
    <h1>{{ user.adress }}</h1>
    </div>
</template>


<script setup>
import { useUserStore } from "../../stores/userstore.js";
import { storeToRefs } from "pinia";
const { user } = storeToRefs(useUserStore());

</script>