<template>
    <!--        min-width="200"-->
    <v-card
        :color="$vuetify.theme.currentTheme.white"
        flat
        class="rounded-lg d-flex flex-column"
        height="100%"
    >
        <v-card-title>{{ title }}</v-card-title>
        <v-card-subtitle class="card__subtitle">
            <p>{{ category }}</p>
            <p>{{ author }}</p>
        </v-card-subtitle>
        <v-card-text>{{ description }}</v-card-text>
        <v-card-title class="pt-0 mt-auto">{{ numberToPrice(price) }}</v-card-title>
        <v-card-actions class="justify-center pb-4">
            <v-btn :color="$vuetify.theme.currentTheme.info" dark rounded class="px-10">
                Купить
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { numberToPrice } from '@/utils';
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
    methods: {
        numberToPrice,
    },
};
</script>

<style scoped lang="scss">
.card {
    &__subtitle {
        p {
            margin-bottom: 0;
        }
    }
}
</style>
