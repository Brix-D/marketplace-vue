<template>
    <div>
        <v-row dense>
            <v-col cols="12">
                <h1 class="h2">Разместите ваши услуги и предложения</h1>
                <div class="mt-4">
                    <v-text-field v-model="title" label="Название услуги" outlined />
                    <v-textarea v-model="description" label="Описание услуги" outlined />
                    <v-select
                        v-model="type"
                        label="Тип услуги"
                        outlined
                        :items="types"
                        item-text="name"
                        item-value="value"
                        return-object
                    />
                    <v-btn :color="$vuetify.theme.currentTheme.info" dark @click="onSave">
                        Сохранить
                    </v-btn>
                </div>
                <div class="services d-flex justify-space-between">
                    <div class="services__demand">
                        <h3 class="h4">По этим потребностям вам прийдет уведомление</h3>
                        <v-list two-line>
                            <v-list-item
                                v-for="service in DEMAND"
                                :key="service.product_id[0].value"
                            >
                                <!--                                <v-list-item-avatar>-->
                                <!--                                    <v-img :src="service.field_photo" />-->
                                <!--                                </v-list-item-avatar>-->
                                <v-list-item-content>
                                    <v-list-item-title v-text="service.title[0].value" />

                                    <v-list-item-subtitle v-text="service.body[0].value" />
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </div>
                    <div class="services__offer">
                        <h3 class="h4">Эти предложения будут видны всем пользователям</h3>
                        <v-list two-line>
                            <v-list-item
                                v-for="service in OFFER"
                                :key="service.product_id[0].value"
                            >
                                <!--                                <v-list-item-avatar>-->
                                <!--                                    <v-img :src="service.field_photo" />-->
                                <!--                                </v-list-item-avatar>-->
                                <v-list-item-content>
                                    <v-list-item-title v-text="service.title[0].value" />

                                    <v-list-item-subtitle v-text="service.body[0].value" />
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </div>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'CollectServices',
    data() {
        return {
            title: '',
            description: '',
            type: {},
            types: [
                { name: 'Потребность', value: 'Потребность' },
                { name: 'Предложение', value: 'Предложение' },
            ],
        };
    },
    computed: {
        ...mapState({
            OFFER: (state) => state.catalog.offer,
            DEMAND: (state) => state.catalog.demand,
        }),
    },
    async created() {
        await this.getServices();
    },
    methods: {
        ...mapActions({
            GET_SERVICES: 'catalog/GET_SERVICES',
            CREATE_SERVICE: 'catalog/CREATE_SERVICE',
        }),
        async onSave() {
            await this.CREATE_SERVICE({
                title: this.title,
                description: this.description,
                type: this.type.value,
            });
            await this.getServices();
        },
        async getServices() {
            await this.GET_SERVICES();
        },
    },
};
</script>

<style scoped lang="scss"></style>
