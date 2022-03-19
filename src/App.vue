<template>
    <div id="app">
        <v-app dark class="application__background">
            <TheHeader :show-slider="isCatalogPage" :show-search="isCatalogPage" />
            <v-main>
                <v-container fluid>
                    <router-view />
                </v-container>
            </v-main>
            <v-footer app absolute>
                <span>&copy; {{ new Date().getFullYear() }}</span>
            </v-footer>
        </v-app>
    </div>
</template>

<script>
import TheHeader from '@/components/layout/TheHeader';
export default {
    components: {
        TheHeader,
    },
    computed: {
        isCatalogPage() {
            return this.$route.name === 'catalog' || this.$route.name === 'catalogDemand';
        },
    },
};
</script>
<style scoped lang="scss">
.application {
    &__background {
        background-color: var(--v-background-base);
    }
}
</style>
