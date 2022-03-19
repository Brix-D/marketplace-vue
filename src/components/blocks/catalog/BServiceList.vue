<template>
    <v-row :dense="!$vuetify.breakpoint.mdAndUp">
        <v-col v-for="service in items" :key="service.id" lg="3" sm="4" xs="6">
            <BMarketCard v-bind="service" />
        </v-col>
    </v-row>
</template>

<script>
import BMarketCard from '@/components/blocks/catalog/BMarketCard';
export default {
    name: 'BServiceList',
    components: {
        BMarketCard,
    },
    props: {
        items: {
            type: Array,
            default: () => [],
        },
    },
};
</script>

<style scoped lang="scss"></style>
