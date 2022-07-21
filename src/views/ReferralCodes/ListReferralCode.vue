<template>
    <div>
        <!-- Loading -->
        <loading :active.sync="isLoading" :is-full-page="fullPage"></loading>
            <div class="container px-16 max-w-8xl">
                <!----------------->
                <!-- Header Page -->
                <!----------------->
                <h1 class="text-gray-700 font-semibold flex items-start text-2xl mb-3">Referral Code List</h1>
                <div class="flex items-center justify-between mb-6">
                    <div class="lg:w-1/2 w-full">
                        <input v-model="search" @input="tableInputSearchHandler($event)" type="text" class="border border-gray-400 px-3 py-2 text-sm rounded-md lg:w-1/2 w-full flex" placeholder="Search By Referral Code.." />
                    </div>
                    <button @click="addReferralToggle = true" class="ml-auto bg-green-600 hover:bg-green-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none flex items-center transition duration-300 ease-in">
                        <svg class="w-3.5 h-3.5 mr-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="transform:;-ms-filter:">
                            <path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10c5.514,0,10-4.486,10-10S17.514,2,12,2z M17,13h-4v4h-2v-4H7v-2h4V7h2v4h4V13z"></path>
                        </svg>
                        <h4 class="font-semibold">Add Referral Code</h4>
                    </button>
                </div>
                <!----------------------->
                <!-- / End Header Page -->
                <!----------------------->

                <!---------------->
                <!-- Data Table -->
                <!---------------->
                <ZTable
                    :data="data.data"
                    :columns="columns"
                    :PageNavHandler="pageNavHandler"
                    :TableInputSearchHandler="tableInputSearchHandler"
                    :meta="data.meta"
                    ref="referralcodes"
                >
                    <!-- Custom Field -->
                    <template slot="createdAt" slot-scope="props">
                        {{ dateFormat(props.item.createdAt) }}
                    </template>
                    <template slot="parent" slot-scope="props">
                        {{ props.item.parent ? props.item.parent.name : '-' }}
                    </template>
                    <template slot="sort" slot-scope="props">
                        {{ props.item.sort ? props.item.sort : '-' }}
                    </template>
                    <template slot="action" slot-scope="props">
                        <button
                        
                            @click="dataSelected = props.item._id; getReferralCodeById();"
                            class="relative inline-flex items-center bg-gray-800 px-3 py-2 shadow text-xs leading-5 font-medium rounded-md text-white hover:bg-gray-700 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 mr-2"
                        >
                            <svg xmlns='http://www.w3.org/2000/svg' class='fill-current w-4 h-4 ionicon' viewBox='0 0 512 512'><title>Create</title><path d='M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/><path d='M459.94 53.25a16.06 16.06 0 00-23.22-.56L424.35 65a8 8 0 000 11.31l11.34 11.32a8 8 0 0011.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90L218.82 270.2a9 9 0 00-2.31 3.93L208.16 299a3.91 3.91 0 004.86 4.86l24.85-8.35a9 9 0 003.93-2.31L422 112.66a9 9 0 000-12.66l-9.95-10a9 9 0 00-12.71 0z'/></svg>
                            <span class="ml-1">Edit</span>
                        </button>
                        <button
                           @click="dataSelected = props.item._id; deleteConfirmModal = true"
                            class="relative inline-flex items-center bg-red-800 px-3 py-2 shadow text-xs leading-5 font-medium rounded-md text-white hover:bg-red-700 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 mr-2"
                        >
                            <svg xmlns='http://www.w3.org/2000/svg' class='fill-current w-4 h-4 ionicon' viewBox='0 0 512 512'><title>Trash</title><path d='M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/><path stroke='currentColor' stroke-linecap='round' stroke-miterlimit='10' stroke-width='32' d='M80 112h352'/><path d='M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>
                            <span class="ml-1">Hapus</span>
                        </button>
                    </template>
                    <!-- / End Custom Field -->
                </ZTable>
                <!---------------------->
                <!-- / End Data Table -->
                <!---------------------->
            </div>

            <ZModal 
                v-show="addReferralToggle"
                title="Add Referral Code"
                @close="addReferralToggle = false;"
            >      
                <div class="p-6">
                    <div class="flex items-center justify-between mb-6">
                        <div class="lg:w-1/1 w-full">
                            <h4 class="text-sm text-gray-900 -mt-1 mb-1">Referral Code</h4>
                            <input v-model="referral_code" class="bg-white text-sm rounded border-2 border-gray-400 focus:outline-none focus:border-orange-500 px-3 py-2 w-full mb-5" placeholder="Please Input" type="text">
                            <h4 class="text-sm text-gray-900 -mt-1 mb-1">Type</h4>
                            <input v-model="type" class="bg-white text-sm rounded border-2 border-gray-400 focus:outline-none focus:border-orange-500 px-3 py-2 w-full mb-5" placeholder="Please Input" type="text">
                            <h4 class="text-sm text-gray-900 -mt-1 mb-1">Description</h4>
                            <input v-model="description" class="bg-white text-sm rounded border-2 border-gray-400 focus:outline-none focus:border-orange-500 px-3 py-2 w-full mb-5" placeholder="Please Input" type="text">
                            
                        </div>
                        
                    </div>
                    <div class="float-right mb-6">
                    <div> </div>
                            <button @click="addReferralToggle = false;" class="mr-2 text-white bg-yellow-600 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-700 rounded text-sm  font-semibold">Cancel</button>
                            <button @click="createReferral" class="text-white bg-blue-600 border-0 py-2 px-6 focus:outline-none hover:bg-blue-700 rounded text-sm  font-semibold">Submit</button>
                        
                    </div>
                </div>
            </ZModal>

            <ZModalEdit 
                v-show="editReferralToggle"
                title="Add Referral Code"
                @close="editReferralToggle = false;"
            >      
                <div class="p-6">
                    <div class="flex items-center justify-between mb-6">
                        <div class="lg:w-1/1 w-full">
                            <h4 class="text-sm text-gray-900 -mt-1 mb-1">Referral Code</h4>
                            <input v-model="referral_code" class="bg-white text-sm rounded border-2 border-gray-400 focus:outline-none focus:border-orange-500 px-3 py-2 w-full mb-5" placeholder="Please Input" type="text">
                            <h4 class="text-sm text-gray-900 -mt-1 mb-1">Type</h4>
                            <input v-model="type" class="bg-white text-sm rounded border-2 border-gray-400 focus:outline-none focus:border-orange-500 px-3 py-2 w-full mb-5" placeholder="Please Input" type="text">
                            <h4 class="text-sm text-gray-900 -mt-1 mb-1">Description</h4>
                            <input v-model="description" class="bg-white text-sm rounded border-2 border-gray-400 focus:outline-none focus:border-orange-500 px-3 py-2 w-full mb-5" placeholder="Please Input" type="text">
                            
                        </div>
                        
                    </div>
                    <div class="float-right mb-6">
                    <div> </div>
                            <button @click="editReferralToggle = false;" class="mr-2 text-white bg-yellow-600 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-700 rounded text-sm  font-semibold">Cancel</button>
                            <button @click="updateReferralCode" class="text-white bg-blue-600 border-0 py-2 px-6 focus:outline-none hover:bg-blue-700 rounded text-sm  font-semibold">Update</button>
                        
                    </div>
                </div>
            </ZModalEdit>

             <ZDeleteModal 
                v-show="deleteConfirmModal"
                title="Delete This Referral Code?"
                message=""
                @close="deleteConfirmModal = false; dataSelected = null"
                @confirm="deleteReferralCode()"
            ></ZDeleteModal>
    </div>
</template>

<script>
import { API_URL } from '@/config.js' // Import API URL
import ZTable from '../../components/ZTable.vue'
import ZModal from '@/components/ZModal'
import ZModalEdit from '@/components/ZModalEdit'
import ZDeleteModal from '@/components/ZDeleteModal';
import { dateFormat } from '../../utils/dateFormat'
import axios from 'axios'

// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    components: { ZTable, ZModal, ZModalEdit, ZDeleteModal, Loading },
    data () {
        return {
            /* Core Data */
            data: [],
            referral_code: '',
            description: '',
            type: '',
            addReferralToggle: false,
            editReferralToggle: false,
            /* Column Options */
            columns: [
                // {
                //     id: 1,
                //     field: '_id',
                //     label: 'ID',
                //     visibility: false,
                // },
                {
                    id: 2,
                    field: 'referralCode',
                    label: 'Referral Code',
                    visibility: true,
                },
                {
                    id: 3,
                    field: 'description',
                    label: 'Description',
                    visibility: true,
                },
                {
                    id: 4,
                    field: 'type',
                    label: 'Type',
                    visibility: true,
                },
                {
                    id: 5,
                    field: 'createdBy',
                    label: 'Added By',
                    visibility: true,
                },
                {
                    id: 6,
                    field: 'createdOn',
                    label: 'Created At',
                    visibility: true,
                },
                {
                    id: 7,
                    field: 'action',
                    label: 'Action',
                    visibility: true,
                },
            ],
            /* Pagination */
            page: 1,
            limit: 10,
            /* Filter */
            search: '',
            /* Extra */
            isLoading: false,
            fullPage: true,
            deleteConfirmModal: false,
            dataSelected: null
        }
    },
    async created () {
        this.getListData(this.page, this.limit);
    },
    methods: {
        async getListData(page, limit) {
            const params = [
                'page='+page,
                'limit='+limit,
                'pagination='+'true',
                'search='+this.search
            ].join('&');

            try {
                const response = await axios.get(API_URL + '/api/referral_code/admin/list?' + params, {
                    headers: {
                    }
                });
                console.log(response);
                this.data = response.data;

                this.isLoading = false;
            } catch (error) {
                console.error(error);
            }
        },
        /*
         * Pagination Handler Function
         */
        pageNavHandler (type) {
            switch (type) {
                case 'previous':
                    this.page -= 1;
                    this.getListData(this.page, this.limit);
                break;
                case 'next':
                    this.page += 1;
                    this.getListData(this.page, this.limit);
                break;
            }
        },
        /*
         * Search Function
         */
        tableInputSearchHandler(event) {
            const value = event.target.value; 

            if (value === '') {
                this.search = ''; 
                this.getListData(this.page, this.limit);
            } else {
                this.search = value;
                this.getListData(1, this.limit); 
                 }
        },
        /*
         * Create ReferralCode with Pagination & Filter Search
         */
            async createReferral () {
            this.isLoading = true;

            let data = {
                referralCode: this.referral_code,
                type: this.type,
                description: this.description,
                createdBy: 'Aexsa Alfyano'
            }
            try {
                await axios.post(API_URL + '/api/referral_code/add', data, {
                    headers: {
                        // 'Authorization': this.$store.state.auth.token
                    }
                });

                this.isLoading = false;
                this.addReferralToggle = false;
                this.getListData(this.page, this.limit);

                this.referral_code = '';
                this.description = '';
                this.type = '';

            } catch (error) {
                console.log(error)
            }
        },

         /*
         * Get ReferralCode By ID
         */
        async getReferralCodeById() {
            try {
                const response = await axios.get(API_URL + '/api/referral_code/' + this.dataSelected, {
                    headers: {
                    }
                });

                // /* Store Data */
                this.data = response.data.referral_code;
                
                this.getListData(this.page, this.limit);
                this.editReferralToggle = true;

                /* Set Value */
                this.referral_code = this.data.referralCode;
                this.type = this.data.type;
                this.description = this.data.description;

            } catch (error) {
                console.error(error);
            }
        },
        /*
         * Update ReferralCode By ID
         */
        async updateReferralCode () {
            this.isLoading = true;

            let data = {
                referral_code: {
                    referralCode: this.referral_code,
                    type: this.type,
                    description: this.description,
                    createdBy: 'Aexsa Alfyano'
                }
            }

            try {
                await axios.put(API_URL + '/api/referral_code/' + this.dataSelected, data, {
                    headers: {
                    }
                });

                this.editReferralToggle = false;
                this.getListData(this.page, this.limit);
                this.isLoading = false;
            } catch (error) {
                console.log(error)
            }

        },
        /*
         * Delete All ReferralCode with Pagination & Filter Search
         */
        async deleteReferralCode() {
            try {
                await axios.delete(API_URL + '/api/referral_code/delete/' + this.dataSelected, {
                    headers: {
                    }
                });

                this.dataSelected = [];
                this.data = [];
                this.getListData(this.page, this.limit);
                this.deleteConfirmModal = false;
            } catch (error) {
                console.error(error);
            }
        },
        
        /*
         * Other Helpers
         */
        dateFormat
    }
}
</script>

<style scoped>
</style>