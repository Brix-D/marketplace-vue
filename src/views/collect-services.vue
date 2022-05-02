<template>
    <div>
        <v-row dense>
            <v-col cols="12">
                <h1 class="h2">Разместите ваши товары, услуги и предложения</h1>
                <div class="mt-4 contact__wrapper pa-4 rounded-lg d-flex justify-space-between">
                    <div
                        class="contact__info"
                        :class="{ 'contact__info--limited': !$vuetify.breakpoint.mobile }"
                    >
                        <!--                    <v-select-->
                        <!--                        v-model="type"-->
                        <!--                        label="Тип услуги"-->
                        <!--                        outlined-->
                        <!--                        :items="types"-->
                        <!--                        item-text="name"-->
                        <!--                        item-value="value"-->
                        <!--                        return-object-->
                        <!--                    />-->
                        <v-text-field
                            v-model="company"
                            label="Название компании"
                            outlined
                            hide-details
                        />
                        <v-text-field v-model="email" label="Email" outlined hide-details />
                        <v-text-field v-model="phone" label="Телефон" outlined hide-details />
                    </div>
                    <div v-if="!LOGGED" class="contact__login">
                        <p class="subtitle-1 my-0">
                            Для размещения объявлений необходимо зарегистрироватся
                        </p>
                        <v-btn
                            :color="$vuetify.theme.currentTheme.info"
                            dark
                            large
                            class="rounded-lg"
                            outlined
                            href="/user/login"
                        >
                            Вход
                        </v-btn>
                        <v-btn
                            :color="$vuetify.theme.currentTheme.info"
                            dark
                            large
                            class="rounded-lg"
                            outlined
                            href="/user/register"
                        >
                            Регистрация
                        </v-btn>
                    </div>
                </div>
                <div class="tabs__header rounded-lg mt-4">
                    <v-tabs
                        v-model="activeTab"
                        class="rounded-lg"
                        hide-slider
                        :color="$vuetify.theme.currentTheme.info"
                        :background-color="$vuetify.theme.currentTheme.secondaryLight"
                    >
                        <v-tab v-for="(tab, index) in bundles" :key="index" :ripple="false">
                            {{ tab.name }}
                        </v-tab>
                    </v-tabs>
                </div>
                <div class="tabs__body">
                    <v-tabs-items v-model="activeTab">
                        <v-tab-item
                            v-for="(tab, index) in bundles"
                            :key="index"
                            :transition="false"
                        >
                            <div
                                class="services d-flex justify-space-between mt-4"
                                :class="{ 'flex-column': $vuetify.breakpoint.mobile }"
                            >
                                <NewServiceList
                                    v-for="type in typeData"
                                    :key="type.value"
                                    :items="CURRENT(tab.value, type.value)"
                                    :type="type.value"
                                    :bundle="tab.value"
                                    :title="type.title"
                                    class="services__list"
                                    :class="{
                                        'services__list--limited': !$vuetify.breakpoint.mobile,
                                    }"
                                    :existing-items="SUGGESTION(tab.value, type.value)"
                                    :disabled="!LOGGED"
                                />
                            </div>
                        </v-tab-item>
                    </v-tabs-items>
                </div>
                <div class="services__save mt-4 d-flex justify-end">
                    <v-btn
                        :color="$vuetify.theme.currentTheme.info"
                        :dark="LOGGED"
                        x-large
                        class="rounded-lg"
                        :class="{ 'px-10': !$vuetify.breakpoint.mobile }"
                        :block="$vuetify.breakpoint.mobile"
                        :disabled="!LOGGED"
                        @click="onSave"
                    >
                        Сохранить
                    </v-btn>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import NewServiceList from '@/components/blocks/service/NewServiceList';

export default {
    name: 'CollectServices',
    components: { NewServiceList },
    data() {
        return {
            company: '',
            email: '',
            phone: '',
            activeTab: 0,
            bundles: [
                {
                    name: 'Товары',
                    value: 'goods',
                },
                {
                    name: 'Услуги',
                    value: 'service',
                },
            ],
            typeData: [
                {
                    value: 'demand',
                    verbose: 'Потребность',
                    title: 'По этим потребностям вам прийдет уведомление',
                },
                {
                    value: 'offer',
                    verbose: 'Предложение',
                    title: 'Эти предложения будут видны всем пользователям',
                },
            ],
        };
    },
    computed: {
        ...mapState({
            USER_INFO: (state) => state.users.user,
        }),
        ...mapGetters({
            LOGGED: 'users/LOGGED',
            SUGGESTION: 'newServices/SUGGESTION',
            CURRENT: 'newServices/CURRENT',
        }),
    },
    async created() {
        await this.getSuggestionServices();
    },
    methods: {
        ...mapMutations({
            UPDATE_SERVICE_ID: 'newServices/UPDATE_SERVICE_ID',
        }),
        ...mapActions({
            GET_SUGGESTION_SERVICES: 'newServices/GET_SUGGESTION_SERVICES',
            CREATE_SERVICE: 'newServices/CREATE_SERVICE',
            CREATE_CONTACT_DATA: 'newServices/CREATE_CONTACT_DATA',
            CREATE_SERVICE_VARIATION: 'newServices/CREATE_SERVICE_VARIATION',
        }),

        isServiceExists(catalog, service) {
            return catalog.some((existingService) => {
                return existingService.id === service.id;
            });
        },

        async onSave() {
            for (let bundle of this.bundles) {
                for (let type of this.typeData) {
                    for (let [index, item] of Object.entries(
                        this.CURRENT(bundle.value, type.value)
                    )) {
                        if (
                            !this.isServiceExists(this.SUGGESTION(bundle.value, type.value), item)
                        ) {
                            const id = await this.CREATE_SERVICE({
                                bundle: bundle.value,
                                title: item.title,
                                description: item.description,
                                price: item.price,
                                categoryId: item.categoryId,
                                type: type.verbose,
                            });
                            if (!!id) {
                                this.UPDATE_SERVICE_ID({
                                    bundle: bundle.value,
                                    listName: type.value,
                                    index,
                                    id,
                                });
                                await this.CREATE_SERVICE_VARIATION({
                                    bundle: bundle.value,
                                    article: performance.now().toFixed(0),
                                    title: item.title,
                                    productId: id,
                                    price: item.price,
                                });
                            }
                        }
                    }
                }
            }

            await this.CREATE_CONTACT_DATA({
                company: this.company,
                email: this.email,
                phone: this.phone,
            });

            await this.$router.push({ name: 'catalog' });
        },
        async getSuggestionServices() {
            this.bundles.forEach((bundle) => {
                this.typeData.forEach(async (type) => {
                    await this.GET_SUGGESTION_SERVICES({
                        typeCatalog: type.value,
                        typeBundle: bundle.value,
                    });
                });
            });
        },
    },
};
</script>

<style scoped lang="scss">
.contact {
    &__wrapper {
        border: 1px solid $color-info;
    }
    &__info {
        display: grid;
        row-gap: 16px;
        width: 100%;
        &--limited {
            width: 32%;
        }
    }
    &__login {
        align-self: center;
        width: 32%;
        display: grid;
        row-gap: 16px;
        justify-content: end;
    }
}
.services {
    &__list {
        width: 100%;
        @media screen and (max-width: 960px) {
            & + & {
                margin-top: 16px;
            }
        }
        &--limited {
            width: calc(32% + 8px);
        }
    }
    &__save {
    }
}
.tabs {
    &__header {
        & .v-tab--active {
            background-color: #fff;
            border-radius: 8px 8px 0 0;
        }
    }
}
</style>
