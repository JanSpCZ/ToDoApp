<template>
    <div v-if="!loading">
        <div v-if="persons.length">
            <ul>
                <li v-for="person in persons" :key="person.id">
                    <div class="person-container">
                        <div class="person-name" @click="$router.push('/newperson/' + person.id)">
                            {{ `${person.first} ${person.last}` }}
                        </div>
                        <div class="trash-icon" @click.stop="onDeleteClick(person.id)">
                            <font-awesome-icon :icon="['fas', 'trash']" />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        
        <div v-else>
            <p>No people to show</p>
        </div>
    </div>
    <TModal 
        v-if="showModal"
        :msg="modalMsg"
        cancelBtn
        :confirmBtn="modalConfirmBtn"
        :cancelLabel="cancelBtnLabel"
        @close-me="closeModal"
        @cancel="closeModal"
        @confirm="deletePerson"
    />
</template>

<script>

import db from "@/utils/db"
import TModal from "./TModal.vue"

export default {
    name: "TPersonsList",
    props: {
        persons: {
            type: Array,
            required: true,
            default: () => []
        }
    },
    data () {
        return {
            loading: true,
            showModal: false,
            modalMsg: "",
            modalCancelBtn: false,
            personIdToDelete: null,
            cancelBtnLabel: ""
        }
    },
    created () {
        this.loading = false
    },
    methods: {
        onDeleteClick(personId) {
            this.personIdToDelete = personId
            db.get("js6personstasks?personid=" + personId).then(data => {
                if(data.length) {
                    this.modalMsg = "This person is assigned to a task. Can not delete"
                    this.modalConfirmBtn = false
                    this.cancelBtnLabel = "OK"
                } else {
                    const person = this.persons.find(person => person.id === personId)
                    this.modalMsg = `Are you sure you want to delete ${person.first} ${person.last} ?`
                    this.modalConfirmBtn = true
                    this.cancelBtnLabel = "Cancel"
                }
                this.showModal = true
            })
        },
        closeModal() {
            this.showModal = false
            this.modalMsg = ""
            this.personIdToDelete = null
        },
        deletePerson () {
            db.delete("js6persons", { id: this.personIdToDelete }).then(() => {
                this.closeModal()
                this.loading = true
                this.$store.dispatch("fetchPersons").then(() => {
                    this.loading = false
                })
            })
        }
    },
    components: { TModal }
}
</script>

<style scoped>

li {
    margin: .5rem 0;
}
</style>
