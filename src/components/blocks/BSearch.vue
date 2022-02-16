<template>
    <div class="d-flex">
        <v-text-field
            v-model="searchValue"
            prepend-inner-icon="mdi-magnify"
            hide-details
            outlined
            label="Поиск..."
            clearable
            :color="$vuetify.theme.currentTheme.secondary"
        />
        <v-btn outlined :color="$vuetify.theme.currentTheme.secondary" class="ml-2" x-large>
            Поиск
        </v-btn>
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

<style scoped lang="scss"></style>
