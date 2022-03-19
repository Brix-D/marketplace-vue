<template>
    <!--    <div class="catalog">-->
    <v-row dense>
        <v-col md="9" xs="12">
            <div class="wrapper rounded-lg pa-3">
                <slot />
            </div>
        </v-col>
        <v-col v-if="$vuetify.breakpoint.mdAndUp" md="3">
            <div class="wrapper rounded-lg pa-3">
                <div class="catalog__filters">filters</div>
            </div>
        </v-col>
        <!--    </div>-->
    </v-row>
</template>

<script>
export default {
    name: 'TheCatalog',
};
</script>

<style scoped lang="scss">
.catalog {
    display: grid;
    grid-template-columns: 3fr 1fr;
    column-gap: $spacer * 3;
    height: 100vh;
    &__filters {
    }
}
</style>
