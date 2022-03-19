<template>
    <div>
        <!--        min-width="200"-->
        <v-card :color="$vuetify.theme.currentTheme.white" flat class="rounded-lg">
            <v-card-title>{{ title }}</v-card-title>
            <v-card-subtitle> {{ category }} </v-card-subtitle>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'BMarketCard',
    props: {
        id: {
            type: Number,
            required: true,
        },
        alias: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped lang="scss"></style>
