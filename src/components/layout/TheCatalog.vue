<template>
    <div>
        <v-container fluid class="py-2 mb-2 wrapper rounded-lg">
            <BSearch />
        </v-container>
        <v-row dense>
            <v-col md="9" xs="12">
                <div class="wrapper rounded-lg pa-3">
                    <slot />
                </div>
            </v-col>
            <v-col v-if="$vuetify.breakpoint.mdAndUp" md="3" class="d-flex">
                <div class="wrapper rounded-lg pa-3 d-flex flex-column flex-grow-1">
                    <BFilters />
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import BFilters from '@/components/blocks/catalog/BFilters';
import BSearch from '@/components/blocks/header/BSearch';

export default {
    name: 'TheCatalog',
    components: { BFilters, BSearch },
};
</script>
