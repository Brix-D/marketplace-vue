<template>
    <v-app-bar flat :color="$vuetify.theme.currentTheme.primary" class="menu">
        <v-container fluid class="pa-0">
            <div class="d-flex">
                <div class="d-flex">
                    <v-btn
                        href="/"
                        tile
                        :color="$vuetify.theme.currentTheme.primary"
                        dark
                        depressed
                        min-height="64px"
                        class="menu__item"
                    >
                        Главная
                    </v-btn>
                    <v-btn
                        v-for="item in mainMenu"
                        :key="item.name"
                        :to="item.to"
                        tile
                        :color="$vuetify.theme.currentTheme.primary"
                        dark
                        depressed
                        min-height="64px"
                        class="menu__item"
                        exact
                    >
                        {{ item.name }}
                    </v-btn>
                </div>
                <div class="d-flex ml-auto">
                    <v-btn
                        v-for="item in authMenu"
                        :key="item.name"
                        :to="item.to"
                        tile
                        :color="$vuetify.theme.currentTheme.primary"
                        dark
                        depressed
                        min-height="64px"
                        class="menu__item"
                        exact
                    >
                        {{ item.name }}
                    </v-btn>
                </div>
            </div>
        </v-container>
    </v-app-bar>
</template>

<script>
export default {
    name: 'BMenu',
    data() {
        return {
            mainMenu: [
                {
                    name: 'Категории',
                    to: { name: 'index' },
                },
                {
                    name: 'Каталог',
                    to: { name: 'catalog' },
                },
            ],
            authMenu: [
                {
                    name: 'Профиль',
                    to: { name: 'index' },
                },
                {
                    name: 'Выход',
                    to: { name: 'index' },
                },
            ],
        };
    },
};
</script>

<style scoped lang="scss">
.menu {
    &::v-deep .v-toolbar__content {
        padding: 0;
    }
    &__item {
        &.v-btn--active::before {
            opacity: 0;
        }
        &:not(.v-btn--active) {
            //background-color: $color-background-secondary !important;
            &::before {
                opacity: 0.05;
            }
        }
    }
}
</style>
