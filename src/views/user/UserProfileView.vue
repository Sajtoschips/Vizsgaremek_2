<template>
    <body>
        <div class="container p-5">
            <div class="mt-5 row justify-content-around ">
                <h1>{{ user.name }}</h1>
                <h1>{{ user.email }}</h1>
                <h1>{{ user.adress }}</h1>
                <h1>{{ user.phone_number }}</h1>
            </div>
        </div>
        </body>
</template>


<script setup>
const user = JSON.parse(sessionStorage.getItem("user"));
</script>