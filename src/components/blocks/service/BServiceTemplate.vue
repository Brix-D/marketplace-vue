<template>
    <v-row class="service" dense>
        <v-col v-if="!!$slots.sidebar && $vuetify.breakpoint.mdAndUp" md="2" class="d-flex">
            <aside class="service__sidebar wrapper pa-3 rounded-lg flex-grow-1">
                <slot name="sidebar" />
            </aside>
        </v-col>
        <v-col :md="!!$slots.sidebar ? 10 : 12" xs="12" class="d-flex">
            <div class="service__wrapper wrapper pa-3 rounded-lg d-flex flex-column flex-grow-1">
                <div class="service__header">
                    <v-tabs
                        v-model="activeTab"
                        hide-slider
                        :color="$vuetify.theme.currentTheme.info"
                        :background-color="$vuetify.theme.currentTheme.secondaryLight"
                    >
                        <v-tab :ripple="false">Обертка</v-tab>
                        <v-tab :ripple="false">Техкарта</v-tab>
                        <v-tab :ripple="false">Финансы</v-tab>
                    </v-tabs>
                </div>
                <div class="service__body d-flex flex-column flex-grow-1">
                    <v-tabs-items v-model="activeTab" touchless>
                        <v-tab-item :transition="false">
                            <slot name="wrapper" />
                        </v-tab-item>
                        <v-tab-item :transition="false">
                            <slot name="tech" />
                        </v-tab-item>
                        <v-tab-item :transition="false">
                            <slot name="finance" />
                        </v-tab-item>
                    </v-tabs-items>
                </div>
            </div>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'BServiceTemplate',
    data() {
        return {
            activeTab: 0,
        };
    },
};
</script>

<style scoped lang="scss">
.service {
    min-height: calc(100vh - 124px);
    &__sidebar {
    }
    &__header {
        width: min-content;
        & .v-tab--active {
            background-color: #fff;
            border-radius: 8px 8px 0 0;
        }
    }
    &__body {
        background-color: #fff;
    }
}
</style>
