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
                                v-for="service in demand"
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
                                v-for="service in offer"
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
            offer: [],
            demand: [],
        };
    },
    async created() {
        await this.getServices();
    },
    methods: {
        async onSave() {
            const csrf = await this.$axios.get('/session/token', {
                withCredentials: true,
            });
            console.log(csrf);
            await this.$axios.post(
                '/entity/commerce_product',
                {
                    title: [
                        {
                            value: this.title,
                        },
                    ],
                    body: [
                        {
                            value: this.description,
                        },
                    ],
                    type: [{ target_id: 'uslugi' }],
                    variations: [
                        {
                            target_id: 0,
                        },
                    ],
                    stores: [
                        {
                            target_id: 0,
                        },
                    ],
                    default_variation: [{ target_id: null }],
                    field_tip: [
                        {
                            value: this.type.value,
                        },
                    ],
                    field_price: [{ number: 0, currency_code: 'RUB' }],
                    field_deficit: [{ value: true }],
                    field_category: [{ value: 'нет' }],
                },
                {
                    withCredentials: true,
                    headers: {
                        'X-CSRF-Token': csrf.data,
                    },
                }
            );
        },
        async getServices() {
            this.offer = [];
            this.demand = [];
            const response = await this.$axios.get('/products/list', {
                withCredentials: true,
            });
            console.log(response);
            response.data.forEach((service) => {
                if (!!service.field_tip) {
                    if (!!service.field_tip[0]) {
                        if (!!service.field_tip[0].value) {
                            if (service.field_tip[0].value === 'Потребность') {
                                this.demand.push(service);
                            }
                            if (service.field_tip[0].value === 'Предложение') {
                                this.offer.push(service);
                            }
                        }
                    }
                }
            });
        },
    },
};
</script>

<style scoped lang="scss"></style>
