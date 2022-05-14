import servicesAction from '@/views/service/services-action';
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';

export default {
    extends: servicesAction,
    metaInfo() {
        return {
            title: 'Редактировать продукты | servey',
        };
    },
    data() {
        return {};
    },
    computed: {
        ...mapGetters({
            CONTACT_DATA_ID: 'users/CONTACT_DATA_ID',
        }),
    },
    async created() {
        await this.GET_SERVICES({ contactDataId: this.CONTACT_DATA_ID });
    },
    methods: {
        ...mapMutations({
            UPDATE_SERVICE_ID: 'newServices/UPDATE_SERVICE_ID',
        }),
        ...mapActions({
            GET_SERVICES: 'newServices/GET_SERVICES',
            CREATE_SERVICE: 'newServices/CREATE_SERVICE',
            EDIT_CONTACT_DATA: 'newServices/EDIT_CONTACT_DATA',
            CREATE_SERVICE_VARIATION: 'newServices/CREATE_SERVICE_VARIATION',
        }),
        async onSave() {
            for (let bundle of this.bundles) {
                for (let type of this.typeData) {
                    for (let [index, item] of Object.entries(
                        this.CURRENT(bundle.value, type.value)
                    )) {
                        if (
                            !this.isServiceExists(
                                this.SUGGESTION(bundle.value, type.value),
                                item
                            ) ||
                            item.hasChanged
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

            await this.EDIT_CONTACT_DATA({
                contactDataId: this.CONTACT_DATA_ID,
                company: this.USER.name,
                email: this.USER.email,
                phone: this.USER.phone,
            });

            await this.$router.push({ name: 'profileSettings' });
        },
    },
};
