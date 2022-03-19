<template>
    <v-app-bar flat :color="$vuetify.theme.currentTheme.secondaryLight" class="menu">
        <v-container fluid class="pa-0">
            <div class="d-flex">
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
        </v-container>
    </v-app-bar>
</template>

<script>
export default {
    name: 'BMenu',
    data() {
        return {
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
