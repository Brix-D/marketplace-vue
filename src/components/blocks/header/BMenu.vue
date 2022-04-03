<template>
    <div>
        <v-app-bar flat :color="$vuetify.theme.currentTheme.secondaryLight" class="menu">
            <v-container fluid class="pa-0">
                <div v-if="!$vuetify.breakpoint.mobile" class="d-flex">
                    <div class="d-flex">
                        <v-btn
                            href="/"
                            tile
                            :color="$vuetify.theme.currentTheme.secondaryLight"
                            depressed
                            min-height="64px"
                            class="menu__item font-weight-regular"
                        >
                            Servey
                        </v-btn>
                    </div>
                    <div class="d-flex ml-auto">
                        <v-btn
                            v-for="item in mainMenu"
                            :key="item.name"
                            :to="item.to"
                            tile
                            :color="$vuetify.theme.currentTheme.secondaryLight"
                            depressed
                            min-height="64px"
                            class="menu__item font-weight-regular"
                            exact
                        >
                            {{ item.name }}
                        </v-btn>
                        <template v-if="isLogged">
                            <v-btn
                                key="profile"
                                :to="{ name: 'profileSettings' }"
                                tile
                                :color="$vuetify.theme.currentTheme.secondaryLight"
                                depressed
                                min-height="64px"
                                class="menu__item font-weight-regular"
                            >
                                Профиль
                            </v-btn>
                            <v-btn
                                key="logout"
                                href="/user/logout"
                                tile
                                :color="$vuetify.theme.currentTheme.secondaryLight"
                                depressed
                                min-height="64px"
                                class="menu__item font-weight-regular"
                                exact
                            >
                                Выход
                            </v-btn>
                        </template>
                        <template v-else>
                            <v-btn
                                v-for="item in authMenu"
                                :key="item.name"
                                :href="item.href"
                                tile
                                :color="$vuetify.theme.currentTheme.secondaryLight"
                                depressed
                                min-height="64px"
                                class="menu__item font-weight-regular"
                                exact
                            >
                                <!--                        -->
                                {{ item.name }}
                            </v-btn>
                        </template>
                    </div>
                </div>
                <div v-else class="d-flex justify-end">
                    <v-btn icon @click="menuIsOpen = !menuIsOpen">
                        <v-icon size="24">mdi-menu</v-icon>
                    </v-btn>
                </div>
            </v-container>
        </v-app-bar>
        <v-navigation-drawer v-if="$vuetify.breakpoint.mobile" v-model="menuIsOpen" absolute app>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title
                        class="text-h3 font-weight-regular blue--text text--darken-2"
                    >
                        Servey
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-divider />
            <v-list dense>
                <v-list-item
                    v-for="item in mainMenu"
                    :key="item.name"
                    :to="item.to"
                    exact
                    min-height="64px"
                >
                    <v-list-item-content>
                        <v-list-item-title class="subtitle-1 font-weight-regular">
                            {{ item.name }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <template v-if="isLogged">
                    <v-list-item
                        key="profile"
                        :to="{ name: 'profileSettings' }"
                        min-height="64px"
                        class="font-weight-regular"
                    >
                        <v-list-item-content>
                            <v-list-item-title class="subtitle-1 font-weight-regular">
                                Профиль
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                        key="logout"
                        href="/user/logout"
                        min-height="64px"
                        class="font-weight-regular"
                        exact
                    >
                        <v-list-item-content>
                            <v-list-item-title class="subtitle-1 font-weight-regular">
                                Выход
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
                <template v-else>
                    <v-list-item
                        v-for="item in authMenu"
                        :key="item.name"
                        :href="item.href"
                        min-height="64px"
                        class="font-weight-regular"
                        exact
                    >
                        <v-list-item-content>
                            <v-list-item-title class="subtitle-1 font-weight-regular">
                                {{ item.name }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    name: 'BMenu',
    data() {
        return {
            menuIsOpen: false,
            // TODO получить статус авторизации с бека
            isLogged: true,
            mainMenu: [
                {
                    name: 'Предложения',
                    to: { name: 'catalog' },
                },
                {
                    name: 'Запросы',
                    to: { name: 'catalogDemand' },
                },
                {
                    name: 'Заказы',
                    to: { name: 'index' },
                },
            ],
            authMenu: [
                {
                    name: 'Вход',
                    //to: { name: 'profileSettings' },
                    href: '/user/login',
                },
                {
                    name: 'Регистрация',
                    //to: { name: 'index' },
                    href: '/user/register',
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
            opacity: 0.1;
        }
        &:not(.v-btn--active) {
            //background-color: $color-background-secondary !important;
            &::before {
                opacity: 0;
            }
        }
    }
}
</style>
