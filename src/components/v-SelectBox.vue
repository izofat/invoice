<script setup>
import store from "../store/store";
import { computed, ref, watch, onUnmounted } from "vue";
import bus from "../service/bus";
const props = defineProps({
    isNew: Boolean,
    selectBoxName: String,
    options: Array,
    selectedData: String,
    index: Number,
});
const data = ref(props.selectedData);
const emit = defineEmits();

const isThisEmpty = ref(false);

bus.on("sendDataToRootComponent", sendDataToRootComponent);
function sendDataToRootComponent(positionIndex) {
    if (props.index == positionIndex) {
        if (data.value != undefined && data.value != "") {
            let objectDataName = "";
            if (props.selectBoxName == "Currency") {
                objectDataName = "currency";
            } else {
                objectDataName = "paymentMethod";
            }
            emit("writeData", {
                prop: objectDataName,
                valueComponent: data.value,
            });
            isThisEmpty.value = false;
        } else {
            isThisEmpty.value = true;
        }
    }
}

const issavingstarted = computed(() => store.getters['positions/isSavingStarted']);


if (props.isNew) {
    bus.on("clearInputs", clearInputs);
}
function clearInputs() {
    data.value = "";
}
let isEdited = false;
if (!props.isNew) {
    watch(
        () => data.value,
        (newData) => {
            if (newData != props.selectedData && !isEdited) {
                bus.emit("oldPropEditted", props.index);
                isEdited = true;
            } else if (newData == props.selectedData && isEdited) {
                bus.emit("oldPropUnEditted", props.index);
                isEdited = false;
            }
        }
    );
}

function enterPressed() {
    bus.emit("enterPressed", props.index);
}

onUnmounted(() => {
    bus.off("sendDataToRootComponent", sendDataToRootComponent);
});

const isClicked = ref(false);
</script>

<template>
    <div class="flex flex-col flex-nowrap" @keydown.enter="enterPressed">
        <h4
            class="font-medium text-xs"
            :class="{
                'text-warning': isThisEmpty || isThisEmpty,
                'text-blue-theme': isClicked,
            }"
        >
            {{ props.selectBoxName }}
        </h4>

        <select
            v-model="data"
            @focusin="isClicked = true"
            @focusout="isClicked = false"
            :class="{
                'border-warning': isThisEmpty,
                'w-[175px]': selectBoxName == 'Payment Method',
            }"
            class="w-[135px] h-14 border-2 rounded-[4px] text-start focus:border-blue-theme focus-visible:outline-blue-theme"
        >
            <option :value="option" :key="option" v-for="option in options">
                {{ option }}
            </option>
        </select>
    </div>
</template>
