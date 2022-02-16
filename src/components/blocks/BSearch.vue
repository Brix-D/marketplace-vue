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
            />
        </div>
        <div class="ml-4 search__background">
            <v-btn outlined :color="$vuetify.theme.currentTheme.secondary" min-height="56">
                Поиск
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BSearch',
    data() {
        return {
            searchValue: '',
        };
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
