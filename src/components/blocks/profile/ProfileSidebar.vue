<template>
    <aside>
        <h3 class="sidebar__title">Меню</h3>
        <v-list dense color="transparent">
            <v-list-item
                v-for="item in sidebarMenu"
                :key="item.name"
                :to="item.to"
                exact
                min-height="64px"
                :ripple="false"
                :color="$vuetify.theme.currentTheme.info"
                class="sidebar-item"
            >
                <v-list-item-content>
                    <v-list-item-title class="subtitle-1 font-weight-regular sidebar-item__title">
                        {{ item.name }}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </aside>
</template>

<script>
export default {
    name: 'ProfileSidebar',
    data() {
        return {
            sidebarMenu: [
                {
                    name: 'Настройки',
                    to: { name: 'profileSettings' },
                },
                {
                    name: 'Финансы',
                    to: { name: 'profileFinances' },
                },
                {
                    name: 'Мои объявления',
                    to: { name: 'collectServices' },
                },
            ],
        };
    },
};
</script>

<style lang="scss" scoped>
.sidebar {
    &__title {
        font-size: 18px;
        line-height: 1.2;
        font-weight: 400;
    }
}
.sidebar-item {
    &::before {
        border-radius: 8px !important;
    }

    &__title {
        color: $color-info;
    }
}
</style>
