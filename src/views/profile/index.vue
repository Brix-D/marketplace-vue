<template>
    <div class="">
        <v-row dense class="profile">
            <v-col md="10" xs="12" class="d-flex flex-column">
                <div class="wrapper pa-3 rounded-lg d-flex flex-column flex-grow-1">
                    <div class="profile__wrapper pa-3 d-flex flex-column flex-grow-1">
                        <h1 class="profile__title">Личный кабинет</h1>
                        <router-view />
                    </div>
                </div>
            </v-col>
            <v-col md="2" class="d-flex flex-column">
                <ProfileSidebar class="wrapper pa-3 rounded-lg d-flex flex-column flex-grow-1" />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import ProfileSidebar from '@/components/blocks/profile/ProfileSidebar';

export default {
    name: 'ProfileSettingsPage',
    components: { ProfileSidebar },
    metaInfo() {
        return {
            title: 'Профиль | servey',
        };
    },
};
</script>

<style scoped lang="scss">
.profile {
    min-height: calc(100vh - 116px);
    &__wrapper {
        background-color: $color-white;
    }
    &__title {
        font-size: 18px;
        line-height: 1.2;
        font-weight: 600;
    }
}
</style>
