<script setup>
import store from "../store/store";
import AccountNumberInput from "./AccountNumberInput.vue";
import vButtons from "./v-Buttons.vue";
import vInputBox from "./v-InputBox.vue";
import vSelectBox from "./v-SelectBox.vue";
import { ref, computed, watch } from "vue";
import bus from "../service/bus";
const allCurrency = ["EUR", "USD", "TRY", "BTC", "CHF", "DAI"];
const paymentMethods = ["Credit Card", "Cash", "Bank Transfer"];

const dataPosition = ref({
    currency: "",
    amount: "",
    accountNumber: "",
    paymentMethod: "",
    description: "",
});

function writeData(propAndValue) {
    const { prop, valueComponent } = propAndValue;
    dataPosition.value[prop] = valueComponent;
}

function saveData() {
    if (checkForEmpty()) {
        store.dispatch("positions/setPositions", dataPosition.value);
        bus.emit("clearInputs");
    }
    dataPosition.value = {
        currency: "",
        amount: "",
        accountNumber: "",
        paymentMethod: "",
        description: "",
    };
}

function updateData(positionIndex) {
    if (checkForEmpty()) {
        store.dispatch("positions/updatePosition", [
            positionIndex,
            dataPosition.value,
        ]);
    }
    dataPosition.value = {
        currency: "",
        amount: "",
        accountNumber: "",
        paymentMethod: "",
        description: "",
    };
}

function checkForEmpty() {
    let canPass = true;
    Object.values(dataPosition.value).forEach((dataPositionAlt) => {
        if (dataPositionAlt == undefined || dataPositionAlt == "") {
            canPass = false;
        }
    });
    return canPass;
}

store.dispatch("positions/loadPositions");
const oldPositions = computed(() => store.getters["positions/getPositions"]);
</script>

<template>
    <div
        class="mt-1 flex flex-col w-[93%] ml-[3%] mr-[3%]"
        :key="oldPosition"
        v-for="oldPosition in oldPositions"
    >
        <div
            class="flex flex-col justify-center h-36 border-b-2 border-gray-theme"
        >
            <div
                class="text-blue-theme font-sans text-base font-semibold"
            >
                POSITION {{ oldPositions.indexOf(oldPosition) + 1 }}
                <!--get this name from local store-->
            </div>
            <div class="flex gap-4 mt-4">
                <vSelectBox
                    selectBoxName="Currency"
                    :selectedData="oldPosition.currency"
                    :options="allCurrency"
                    :index="oldPositions.indexOf(oldPosition)"
                    :isNew="false"
                    @writeData="writeData"
                />
                <vInputBox
                    inputBoxName="Amount"
                    :isNew="false"
                    :index="oldPositions.indexOf(oldPosition)"
                    :inputData="oldPosition.amount"
                    @writeData="writeData"
                />
                <AccountNumberInput
                    :isNew="false"
                    :index="oldPositions.indexOf(oldPosition)"
                    :inputData="oldPosition.accountNumber"
                    @writeData="writeData"
                />
                <vSelectBox
                    selectBoxName="Payment Method"
                    :selectedData="oldPosition.paymentMethod"
                    :options="paymentMethods"
                    :index="oldPositions.indexOf(oldPosition)"
                    :isNew="false"
                    @writeData="writeData"
                />
                <vInputBox
                    inputBoxName="Description"
                    :isNew="false"
                    :index="oldPositions.indexOf(oldPosition)"
                    :inputData="oldPosition.description"
                    @writeData="writeData"
                />
                <div class="text-[48px] font-[100] text-gray-300">|</div>
                <vButtons
                    positionType="oldPosition"
                    :isThereAChange="false"
                    :isNew="false"
                    @updateData="updateData"
                    :indexPosition="oldPositions.indexOf(oldPosition)"
                />
            </div>
        </div>
    </div>
    <div class="mt-1 pb-40 flex flex-col w-[93%] ml-[3%] mr-[3%]">
        <div
            class="flex flex-col justify-center h-36 border-b-2 border-gray-theme"
        >
            <div
                class="text-blue-theme font-sans text-base font-semibold"
            >
                NEW POSITION
            </div>
            <div class="flex gap-4 mt-4">
                <vSelectBox
                    selectBoxName="Currency"
                    :options="allCurrency"
                    :isNew="true"
                    :index="oldPositions.length"
                    @writeData="writeData"
                />
                <vInputBox
                    inputBoxName="Amount"
                    :isNew="true"
                    :index="oldPositions.length"
                    @writeData="writeData"
                />
                <AccountNumberInput
                    :isNew="true"
                    :index="oldPositions.length"
                    @writeData="writeData"
                />
                <vSelectBox
                    selectBoxName="Payment Method"
                    :isNew="true"
                    :options="paymentMethods"
                    :index="oldPositions.length"
                    @writeData="writeData"
                />
                <vInputBox
                    inputBoxName="Description"
                    :isNew="true"
                    :index="oldPositions.length"
                    @writeData="writeData"
                />
                <div class="text-[48px] font-[100] text-gray-300">|</div>
                <vButtons
                    positionType="newPosition"
                    :isNew="true"
                    @saveData="saveData"
                    :indexPosition="oldPositions.length"
                />
            </div>
        </div>
    </div>
</template>
