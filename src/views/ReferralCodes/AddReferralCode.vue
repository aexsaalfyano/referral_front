<template>
    <div>
        <!-- Loading -->
        <loading :active.sync="isLoading" :is-full-page="fullPage"></loading>
        <!-- <SidebarNavigation> -->
            <div class="container px-8 max-w-7xl">
                <div class="flex py-4">
                    <button @click="$router.push('/referral')" class="focus:outline-none"><i class="bx bx-arrow-back text-2xl mr-3 text-gray-600 font-semibold"></i></button>
                    <h4 class="text-2xl font-semibold text-gray-600">Tambah Kategori</h4>
                </div>
                <div class="flex flex-wrap mx-auto">
                    <!-- Main -->
                    <div class="py-4 md:w-2/3 w-full h-auto">
                        <!-- Informasi Utama -->
                        <div class="bg-white px-5 py-5 rounded-lg shadow mb-5">
                            <div class="w-full">
                                <!-- <h4 class="text-sm text-gray-900 -mt-1 mb-1">Nama Kategori</h4>
                                <input v-model="referral_name" class="bg-white text-sm rounded border-2 border-gray-400 focus:outline-none focus:border-orange-500 px-3 py-2 w-full mb-5" placeholder="Contoh: Produk Umum" type="text">
                                <h4 class="text-sm text-gray-900 -mt-1 mb-1">Gambar (URL)</h4>
                                <input v-model="image" class="bg-white text-sm rounded border-2 border-gray-400 focus:outline-none focus:border-orange-500 px-3 py-2 w-full mb-5" placeholder="Contoh: https://domain.com/image.png" type="text">
                                <h4 class="text-sm text-gray-900 -mt-1 mb-1">Kategori Induk</h4>
                                <z-select class="mb-5" v-model="referral_parent" :data="referralOptions" placeholder="Pilih Kategori Induk">
                                </z-select>
                                <select class="bg-white text-sm rounded border-2 border-gray-400 focus:outline-none focus:border-orange-500 px-3 py-2 w-full mb-5" v-model="sort" placeholder="Pilih Urutan">
                                    <option :value="null">Pilih Urutan</option>
                                    <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                                </select>
                                <h4 class="text-sm text-gray-900 -mt-1 mb-1">Deskripsi</h4>
                                <textarea v-model="description" rows="8" class="bg-white text-sm rounded border-2 border-gray-400 focus:outline-none focus:border-orange-500 px-3 py-2 w-full mb-5"></textarea> -->
                                <button @click="createReferral" class="text-white bg-yellow-600 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-700 rounded text-sm w-full font-semibold">Simpan Kategori</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <!-- </SidebarNavigation> -->
    </div>
</template>

<script>
import { API_URL } from '@/config.js' // Import API URL
// import SidebarNavigation from '../../components/Wrapper/SidebarNavigation.vue'
// import ZNavigation from '../../components/ZNavigationStandart'
import axios from 'axios'
// import ZSelect from '../../components/ZSelect'

// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    // components: { SidebarNavigation, Loading, ZSelect },
    components: { Loading },
    data () {
        return {
            /* Field Data Referral */
            referral_code: '',
            description: '',
            image: '',
            referral_parent: '',
            sort: null,
            /* Kategori Options */
            referralData: '',
            referralOptions: [],
        }
    },
    async created() {
        /* AUTH - Jika Belum Login arahkan ke Halaman Login */
        // try {
        //     await axios.get(`${API_URL}/api/auth/check-auth?email=${this.$store.state.auth.user.email}&role=${this.$store.state.auth.user.role}`, {
        //         headers: {
        //             'Authorization': this.$store.state.auth.token
        //         }
        //     });
        // } catch (error) {
        //     this.$store.dispatch('auth/logout').then(() => {
        //         this.$router.push('/login');
        //     });
        // }

    },
    methods: {
        /*
         * Create Referral
         */
        async createReferral () {
            this.isLoading = true;

            let data = {
                referralCode: this.referral_name,
                parent: this.referral_parent.value,
                sort: this.sort,
                image: this.image,
                description: this.description,
                isActive: true
            }

            try {
                await axios.post(API_URL + '/api/referral_code/add', data, {
                    headers: {
                        // 'Authorization': this.$store.state.auth.token
                    }
                });

                this.isLoading = false;
                this.$router.push('/referral');
            } catch (error) {
                console.log(error)
            }
        },
    }
}
</script>

<style scoped>
</style>