<template>
    <!--    :dense="!$vuetify.breakpoint.mdAndUp"-->
    <v-row>
        <v-col v-for="service in items" :key="service.uniqueId" lg="3" md="4" sm="4" :cols="12">
            <!--            :cols="$vuetify.breakpoint.smAndUp ? 'auto' : false"-->
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
