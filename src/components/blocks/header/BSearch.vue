<template>
    <div class="d-flex">
        <div class="search__background flex-grow-1">
            <v-text-field
                v-model="searchValue"
                prepend-inner-icon="mdi-magnify"
                hide-details
                outlined
                label="Поиск..."
                clearable
                :color="$vuetify.theme.currentTheme.secondary"
                @keypress.enter="APPLY_SEARCH(searchValue)"
            />
            <!--                @click:clear.prevent="clearSearch()"-->
        </div>
        <div class="ml-4 search__background">
            <v-btn
                outlined
                :color="$vuetify.theme.currentTheme.secondary"
                min-height="56"
                @click="APPLY_SEARCH(searchValue)"
            >
                Поиск
            </v-btn>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    name: 'BSearch',
    data() {
        return {
            searchValue: '',
        };
    },
    watch: {
        searchValue(value) {
            if (value === null) {
                this.searchValue = '';
            }
        },
    },
    methods: {
        ...mapMutations({
            APPLY_SEARCH: 'filters/APPLY_SEARCH',
        }),
    },
};
</script>

<style scoped lang="scss">
.search {
    &__background {
        background-color: $color-white;
    }
}
</style>
