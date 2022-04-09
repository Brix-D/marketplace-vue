<template>
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
</template>

<script>
import { mapState } from 'vuex';
import BFilters from '@/components/blocks/catalog/BFilters';

export default {
    name: 'TheCatalog',
    components: { BFilters },
};
</script>
