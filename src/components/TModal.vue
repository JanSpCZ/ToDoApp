<template>
    <div class="modal-bg">
        <div class="modal-body" id="modal-body">
            <div class="modal-content">
                {{ msg }}
            </div>
            <div class="modal-footer">
                <button v-if="cancelBtn" @click.stop="$emit('cancel')" class="submit-button">{{ cancelLabel }}</button>
                <button v-if="confirmBtn" @click.stop="$emit('confirm')" class="submit-button">{{ confirmLabel }}</button>
            </div>
        </div>
    </div>

</template>


<script>



export default {
    name: "TModal",
    props: {
        msg: String,
        cancelBtn: {
            type: Boolean,
            default: false
        },
        confirmBtn: {
            type: Boolean,
            default: false
        },
        cancelLabel: {
            type: String,
            default: "Cancel"
        },
        confirmLabel: {
            type: String,
            default: "Confirm"
        }
    },
    mounted () {
        document.addEventListener("click", this.clickOutside)
    },
    unmounted () {
        document.removeEventListener("click", this.clickOutside)
    },
    methods: {
        clickOutside (e) {
            const el = document.getElementById("modal-body")
            if(!el.contains(e.target))
            this.$emit("close-me")
        }
    }
}
</script>

<style scoped>
.modal-bg {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, .4);
}

.modal-body {
    min-width: 300px;
    min-height: 100px;
    background: #fafafa;
    color: #000;
    border-radius: 5px;
    padding: .5rem;
    display: flex;
    flex-direction: column;
}

.modal-content {
    flex-grow: 1;
}

.modal-footer {
    flex-basis: 30px;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

</style>