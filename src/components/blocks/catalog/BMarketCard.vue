<template>
    <!--        min-width="200"-->
    <v-card
        :color="$vuetify.theme.currentTheme.white"
        flat
        class="rounded-lg d-flex flex-column"
        height="100%"
    >
        <v-card-title class="card__title">{{ title }}</v-card-title>
        <v-card-subtitle class="card__subtitle">
            <p>{{ category }}</p>
            <p>{{ type }}</p>
        </v-card-subtitle>
        <v-card-text class="card__description pb-0 mb-4">{{ description }}</v-card-text>
        <v-card-title class="pt-0 mt-auto">{{ numberToPrice(price) }}</v-card-title>
        <v-card-actions class="justify-center pb-4">
            <v-btn
                :color="$vuetify.theme.currentTheme.info"
                dark
                class="px-10 rounded-lg"
                :to="{ name: 'serviceView', params: { id } }"
            >
                Детали
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
        title: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        // author: {
        //     type: String,
        //     required: true,
        // },
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
    &__title {
        word-break: break-word;
    }
    &__description {
        @include text-overflow-column(4);
    }
}
</style>
