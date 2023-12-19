<script setup>
const props = defineProps({
    inputData: Number,
    isNew: Boolean,
    index: Number,
});

import { useStore } from "vuex";
import { computed, ref, watch, onMounted, onUnmounted } from "vue";
import bus from "../service/bus";
const store = useStore();
const isMenuOpened = ref(false);

const accountNumber = ref(props.inputData);

function makeNumeric() {
    accountNumber.value = accountNumber.value.replace(/[^0-9.]/g, "");
}

store.dispatch("accounts/loadAccounts");
const accounts = computed(() => store.getters["accounts/getAccounts"]);


function accountClicked(number) {
    accountNumber.value = number;
}

const emit = defineEmits();
const isThisEmpty = ref(false);
bus.on("sendDataToRootComponent", sendDataToRootComponent);
function sendDataToRootComponent(positionIndex) {
    if (props.index == positionIndex) {
        if (accountNumber.value != "" && accountNumber.value != undefined) {
            const objectDataName = "accountNumber";
            emit("writeData", {
                prop: objectDataName,
                valueComponent: accountNumber.value,
            });
            isThisEmpty.value = false;
        } else {
            isThisEmpty.value = true;
        }
    }
}

if (props.isNew) {
    bus.on("clearInputs", clearInputs);
}
function clearInputs() {
    accountNumber.value = "";
}

let isEdited = false;
if (!props.isNew) {
    watch(
        () => accountNumber.value,
        (newData) => {
            if (newData != props.inputData && !isEdited) {
                bus.emit("oldPropEditted", props.index);
                isEdited = true;
            } else if (newData == props.inputData && isEdited) {
                bus.emit("oldPropUnEditted", props.index);
                isEdited = false;
            }
        }
    );
}

function enterPressed() {
    bus.emit("enterPressed", props.index);
}
function spacePressed(){
    isMenuOpened.value = false;
}
let indexAccount = -1;
function selectAccountUnder() {
    if (isMenuOpened.value && indexAccount < accounts.value.length - 1) {
        indexAccount++;
        document.getElementById("inputDiv" + props.index).value =
            accounts.value[indexAccount].number;
        document.getElementById("accountsDiv" + props.index).childNodes[
            indexAccount + 1
        ].style.color = "white";
        document.getElementById("accountsDiv" + props.index).childNodes[
            indexAccount + 1
        ].style.backgroundColor = "rgb(59,96,246)";
        accountNumber.value = accounts.value[indexAccount].number;
        if (indexAccount != 0) {
            document.getElementById("accountsDiv" + props.index).childNodes[
                indexAccount
            ].style.color = "black";
            document.getElementById("accountsDiv" + props.index).childNodes[
                indexAccount
            ].style.backgroundColor = "white";
        }
    }
}
function selectAccountUpper() {
    if (isMenuOpened.value && indexAccount > 0) {
        indexAccount--;
        document.getElementById("inputDiv" + props.index).value =
            accounts.value[indexAccount].number;
        document.getElementById("accountsDiv" + props.index).childNodes[
            indexAccount + 1
        ].style.color = "white";
        document.getElementById("accountsDiv" + props.index).childNodes[
            indexAccount + 1
        ].style.backgroundColor = "rgb(59,96,246)";
        accountNumber.value = accounts.value[indexAccount].number;
        if (indexAccount != accounts.value - 1) {
            document.getElementById("accountsDiv" + props.index).childNodes[
                indexAccount + 2
            ].style.color = "black";
            document.getElementById("accountsDiv" + props.index).childNodes[
                indexAccount + 2
            ].style.backgroundColor = "white";
        }
    }
}
let focusTypeInput = false;
function openMenuWithTab() {
    isMenuOpened.value = true;
    focusTypeInput = true;
}
function closeMenuWithTab() {
    isMenuOpened.value = false;
    focusTypeInput = false;
}
onUnmounted(() => {
    bus.off("sendDataToRootComponent", sendDataToRootComponent);
});
onMounted(() => {
    document.addEventListener('click' , check);
})
function check(event){
    if(event.target.id != 'inputDiv' + props.index ){
        isMenuOpened.value = false
    }
}
</script>

<template>
    <div
        class="flex flex-col relative"
        @keydown.enter="enterPressed"
        @keydown.down="selectAccountUnder"
        @keydown.space="spacePressed"
        @keydown.up="selectAccountUpper"
        @keydown.esc="isMenuOpened = !isMenuOpened"
    >
        <h4
            class="font-medium text-xs"
            :class="{
                'text-warning': isThisEmpty,
                'text-blue-theme': focusTypeInput,
            }"
        >
            Account Number
        </h4>
        <div class="relative">
            <input
                @focus="openMenuWithTab"
                @keydown.tab="closeMenuWithTab"
                autocomplete="off"
                @input="makeNumeric"
                inputmode="decimal"
                pattern="[0-9]*[.,]?[0-9]*"
                :id="'inputDiv' + props.index"
                type="text"
                :class="{
                    'border-warning': isThisEmpty,
                }"
                class="w-account-number h-14 border-2 rounded z-0  border-gray-theme focus:outline-blue-theme"
                v-model="accountNumber"
            />
            <i class="fa-solid fa-angle-down fa-xs absolute top-7 right-3"></i>
        </div>
        <div
            :id="'accountsDiv' + props.index"
            class="absolute bg-white top-[72px] w-[320px] border-2 rounded-xl z-10 overflow-auto"
            :class="{ hidden: !isMenuOpened }"
        >
            <div
                class="h-8 bg-white hover:bg-blue-hover hover:text-white text-[16px] font-sans cursor-pointer border-b-2"
                :id="
                    'account' + accounts.indexOf(account) + 'from' + props.index
                "
                v-for="account in accounts"
                @click="accountClicked(account.number)"
            >
                <span class="pl-3"
                    >{{ account.number }} {{ account.owner }}</span
                >
            </div>
        </div>
    </div>
</template>
