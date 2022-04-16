<template>
    <div>
        <v-row dense>
            <v-col cols="12">
                <h1 class="h2">Разместите ваши услуги и предложения</h1>
                <div class="mt-4 contact__wrapper pa-4 rounded-lg">
                    <div class="contact__info">
                        <!--                    <v-text-field v-model="title" label="Название услуги" outlined />-->
                        <!--                    <v-textarea v-model="description" label="Описание услуги" outlined />-->
                        <!--                    <v-select-->
                        <!--                        v-model="type"-->
                        <!--                        label="Тип услуги"-->
                        <!--                        outlined-->
                        <!--                        :items="types"-->
                        <!--                        item-text="name"-->
                        <!--                        item-value="value"-->
                        <!--                        return-object-->
                        <!--                    />-->
                        <!--                    <v-btn :color="$vuetify.theme.currentTheme.info" dark @click="onSave">-->
                        <!--                        Сохранить-->
                        <!--                    </v-btn>-->
                        <v-text-field
                            v-model="company"
                            label="Название компании"
                            outlined
                            hide-details
                        />
                        <v-text-field v-model="email" label="Email" outlined hide-details />
                        <v-text-field v-model="phone" label="Телефон" outlined hide-details />
                    </div>
                </div>
                <div class="services d-flex justify-space-between mt-4">
                    <NewServiceList
                        :items="NEW_DEMAND"
                        title="По этим потребностям вам прийдет уведомление"
                        :existing-items="EXISTING_DEMAND"
                        @select="onSelectService($event, 'newDemand')"
                        @delete="onDeleteService($event, 'newDemand')"
                    />
                    <NewServiceList
                        :items="NEW_OFFER"
                        title="Эти предложения будут видны всем пользователям"
                        :existing-items="EXISTING_OFFER"
                        @select="onSelectService($event, 'newOffer')"
                        @delete="onDeleteService($event, 'newOffer')"
                    />
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import NewServiceList from '@/components/blocks/service/NewServiceList';

export default {
    name: 'CollectServices',
    components: { NewServiceList },
    data() {
        return {
            company: '',
            email: '',
            phone: '',
            title: '',
            description: '',
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
        }),
    },
    async created() {
        await this.getServices();
    },
    methods: {
        ...mapMutations({
            ADD_SERVICE: 'newServices/ADD_SERVICE',
            DELETE_SERVICE: 'newServices/DELETE_SERVICE',
        }),
        ...mapActions({
            GET_SERVICES: 'newServices/GET_SERVICES',
            CREATE_SERVICE: 'newServices/CREATE_SERVICE',
        }),
        onSelectService(event, type) {
            console.log('service', event, 'typeCatalog', type);
            this.ADD_SERVICE({ listName: type, service: event.value });
        },
        onDeleteService(index, type) {
            this.DELETE_SERVICE({ listName: type, index });
        },
        async onSave() {
            // await this.CREATE_SERVICE({
            //     title: this.title,
            //     description: this.description,
            //     type: this.type.value,
            // });
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
}
</style>
