<template>
    <div class="settings d-flex flex-column">
        <h2 class="caption font-weight-medium settings__subtitle">Настройки</h2>
        <div class="settings__role mt-4">
            <span class="font-weight-medium">Роль пользователя:</span>
            <span class="d-inline-block ml-4">{{ userRole }}</span>
        </div>
        <div class="user__main mt-4">
            <template>
                <v-text-field
                    v-model="user.name"
                    :label="user.isCompany ? 'Название компании' : 'ФИО'"
                    outlined
                    hide-details
                    class="mt-5"
                />
                <v-text-field
                    v-model="user.email"
                    label="Email"
                    outlined
                    hide-details
                    class="mt-5"
                />
                <v-text-field
                    v-model="user.phone"
                    label="Телефон"
                    outlined
                    hide-details
                    class="mt-5"
                />
            </template>
        </div>
        <div v-if="user.isCompany" class="user__company">
            <div class="company__title mt-4">
                <span class="font-weight-medium">Данные о компании:</span>
            </div>
            <v-text-field v-model="company.ogrn" label="ОГРН" outlined hide-details class="mt-5" />
            <v-select
                v-model="company.ownership"
                outlined
                hide-details
                class="mt-5"
                label="Форма собственности"
                :items="company.forms"
            />
            <v-text-field
                v-model="company.okved"
                label="ОКВЭД"
                outlined
                hide-details
                class="mt-5"
            />
            <v-text-field
                v-model="company.address"
                label="Адрес"
                outlined
                hide-details
                class="mt-5"
            />
            <v-text-field
                v-model="company.certificate"
                label="Свидетельство о регистрации"
                outlined
                hide-details
                class="mt-5"
            />
        </div>
        <div class="user__password mt-4 d-flex flex-column align-center">
            <div class="user__password-label font-weight-medium">Сменить пароль</div>
            <v-btn
                href="/user/password"
                :color="$vuetify.theme.currentTheme.info"
                dark
                class="rounded-lg mt-4"
                depressed
                :ripple="false"
            >
                Сменить пароль
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProfileFinancesPage',
    metaInfo() {
        return {
            title: 'Профиль | servey',
        };
    },
    data() {
        return {
            user: {
                isCompany: true,
                isPerson: true,
                name: '',
                email: '',
                phone: '',
            },
            company: {
                ogrn: '',
                okved: '',
                address: '',
                certificate: '',
                ownership: '',
                forms: ['Частная собсвенность', 'Федеральная собсвенность'],
            },
        };
    },
    computed: {
        userRole() {
            let role = [];
            if (this.user.isCompany) {
                role.push('Компания');
            }
            if (this.user.isPerson) {
                role.push('Частное лицо');
            }
            return role.join(', ');
        },
    },
};
</script>

<style scoped lang="scss">
.settings {
    &__subtitle {
        font-size: 16px !important;
    }
    &__role {
        font-size: 16px;
    }
}
.user {
    &__main {
    }
    &__password {
    }
    &__password-label {
    }
}
</style>
