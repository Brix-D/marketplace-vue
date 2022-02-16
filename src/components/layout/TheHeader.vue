<template>
    <div>
        <v-container fluid class="pa-0">
            <v-row align="center">
                <v-col cols="12">
                    <div class="header__slider" />
                </v-col>
            </v-row>
        </v-container>
        <v-app-bar flat :color="$vuetify.theme.currentTheme.primary" class="mt-2 menu">
            <v-container fluid class="pa-0">
                <div class="d-flex">
                    <div class="d-flex">
                        <v-btn
                            v-for="item in mainMenu"
                            :key="item.name"
                            :to="item.to"
                            tile
                            :color="$vuetify.theme.currentTheme.primary"
                            dark
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
                            min-height="64px"
                            class="menu__item"
                            exact
                        >
                            {{ item.name }}
                        </v-btn>
                    </div>
                </div>
                <!--                <v-row align="center">-->
                <!--                    <v-col cols="3">-->
                <!--                        <NuxtLink :to="{ name: 'index' }">-->
                <!--                            <h1-->
                <!--                                :style="{ color: $vuetify.theme.currentTheme.info }"-->
                <!--                                class="text-h3 font-italic font-weight-bold"-->
                <!--                            >-->
                <!--                                Servey-->
                <!--                            </h1>-->
                <!--                        </NuxtLink>-->
                <!--                    </v-col>-->
                <!--                    <v-col cols="6">-->
                <!--                        <v-text-field-->
                <!--                            v-model="searchValue"-->
                <!--                            prepend-inner-icon="mdi-magnify"-->
                <!--                            hide-details-->
                <!--                            outlined-->
                <!--                            label="Найти..."-->
                <!--                            clearable-->
                <!--                            :color="$vuetify.theme.currentTheme.info"-->
                <!--                        />-->
                <!--                    </v-col>-->
                <!--                    <v-col cols="3">s</v-col>-->
                <!--                </v-row>-->
            </v-container>
        </v-app-bar>
    </div>
</template>

<script>
export default {
    name: 'TheHeader',
    data() {
        return {
            searchValue: '',
            mainMenu: [
                {
                    name: 'Компания',
                    to: { name: 'index' },
                },
                {
                    name: 'Сотрудники',
                    to: { name: 'index' },
                },
                {
                    name: 'Каталог',
                    to: { name: 'catalog' },
                },
                {
                    name: 'Статистика',
                    to: { name: 'index' },
                },
                {
                    name: 'Настройки',
                    to: { name: 'index' },
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
.header {
    &__slider {
        background-color: $color-secondary;
        min-height: 120px;
    }
}
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
