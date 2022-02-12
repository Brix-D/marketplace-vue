<template>
    <div id="app">
        <v-app dark class="application__background">
            <TheHeader />
            <v-main>
                <v-container>
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
};
</script>
<style scoped lang="scss">
.application {
    &__background {
        background-color: var(--v-background-base);
    }
}
</style>
