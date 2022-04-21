<template>
    <div>
        <v-row dense>
            <v-col cols="12">
                <h1 class="h2">Разместите ваши услуги и предложения</h1>
                <div class="mt-4 contact__wrapper pa-4 rounded-lg d-flex justify-space-between">
                    <div class="contact__info">
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
                            Для размещения услуг необходимо зарегистрироватся
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
                <div class="services d-flex justify-space-between mt-4">
                    <NewServiceList
                        :items="NEW_DEMAND"
                        type="newDemand"
                        title="По этим потребностям вам прийдет уведомление"
                        class="services__list"
                        :existing-items="EXISTING_DEMAND"
                        :disabled="!LOGGED"
                    />
                    <NewServiceList
                        :items="NEW_OFFER"
                        type="newOffer"
                        title="Эти предложения будут видны всем пользователям"
                        class="services__list"
                        :existing-items="EXISTING_OFFER"
                        :disabled="!LOGGED"
                    />
                    <!--                    @select="onSelectService($event, 'newDemand')"
                        @delete="onDeleteService($event, 'newDemand')"
                        @add="onAddService('newDemand')"
                        @edit="onEditService($event, 'newDemand')"
                        @select="onSelectService($event, 'newOffer')"
                        @delete="onDeleteService($event, 'newOffer')"
                        @add="onAddService('newOffer')"
                        @edit="onEditService($event, 'newOffer')"-->
                </div>
                <div class="services__save mt-4 d-flex justify-end">
                    <v-btn
                        :color="$vuetify.theme.currentTheme.info"
                        :dark="LOGGED"
                        x-large
                        class="rounded-lg px-10"
                        :disabled="!LOGGED"
                        @click="onSave"
                    >
                        Сохранить услуги
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
            // title: '',
            // description: '',

            // type: {},
            // types: [
            //     { name: 'Потребность', value: 'Потребность' },
            //     { name: 'Предложение', value: 'Предложение' },
            // ],
        };
    },
    computed: {
        ...mapState({
            EXISTING_OFFER: (state) => state['newServices'].existingOffer,
            EXISTING_DEMAND: (state) => state['newServices'].existingDemand,
            NEW_OFFER: (state) => state['newServices'].newOffer,
            NEW_DEMAND: (state) => state['newServices'].newDemand,
            USER_INFO: (state) => state.users.user,
        }),
        ...mapGetters({
            LOGGED: 'users/LOGGED',
        }),
    },
    async created() {
        await this.getServices();
    },
    methods: {
        ...mapMutations({
            UPDATE_SERVICE_ID: 'newServices/UPDATE_SERVICE_ID',
        }),
        ...mapActions({
            GET_SERVICES: 'newServices/GET_SERVICES',
            CREATE_SERVICE: 'newServices/CREATE_SERVICE',
            CREATE_CONTACT_DATA: 'newServices/CREATE_CONTACT_DATA',
        }),

        isServiceExists(catalog, service) {
            return catalog.some((existingService) => {
                return existingService.id === service.id;
            });
        },

        async onSave() {
            for (let [index, newService] of Object.entries(this.NEW_DEMAND)) {
                if (!this.isServiceExists(this.EXISTING_DEMAND, newService)) {
                    const id = await this.CREATE_SERVICE({
                        title: newService.title,
                        description: newService.description,
                        type: 'Потребность',
                    });
                    if (!!id) {
                        this.UPDATE_SERVICE_ID({
                            listName: 'newDemand',
                            index,
                            id,
                        });
                    }
                }
            }

            for (let [index, newService] of Object.entries(this.NEW_OFFER)) {
                if (!this.isServiceExists(this.EXISTING_OFFER, newService)) {
                    const id = await this.CREATE_SERVICE({
                        title: newService.title,
                        description: newService.description,
                        type: 'Предложение',
                    });
                    if (!!id) {
                        this.UPDATE_SERVICE_ID({
                            listName: 'newOffer',
                            index,
                            id,
                        });
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
        async getServices() {
            await this.GET_SERVICES();
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
        width: 30%;
    }
    &__login {
        align-self: center;
        width: 30%;
        display: grid;
        row-gap: 16px;
        justify-content: end;
    }
}
.services {
    &__list {
        width: calc(30% + 8px);
    }
    &__save {
    }
}
</style>
