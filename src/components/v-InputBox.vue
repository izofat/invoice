<script setup>
import { ref, watch, onUnmounted, onMounted } from "vue";
import bus from "../service/bus";
const props = defineProps({
    inputBoxName: String,
    inputData: String,
    isNew: Boolean,
    index: Number,
});

function makeNumeric(){
    data.value = data.value.replace(/[^0-9.]/g, '');
}

const emit = defineEmits();
const data = ref(props.inputData);

bus.on("sendDataToRootComponent", sendDataToRootComponent);
const isThisEmpty = ref(false);
function sendDataToRootComponent(positionIndex) {
    if (props.index == positionIndex) {
        if (data.value != "" && data.value != undefined) {
            let objectDataName = "";
            if (props.inputBoxName == "Amount") {
                objectDataName = "amount";
            } else {
                objectDataName = "description";
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
const isClicked = ref(false);

function enterPressed(){
    bus.emit('enterPressed',props.index)
}

onUnmounted(() => {
    bus.off("sendDataToRootComponent", sendDataToRootComponent);
});
</script>

<template>
    <div class="flex flex-col" @keydown.enter="enterPressed">
        <h4
            class="font-medium text-xs"
            :class="{
                'text-warning': isThisEmpty || isThisEmpty,
                'text-blue-theme' : isClicked,
            }"
        >
            {{ props.inputBoxName }}
        </h4>
        <input
            @input="props.inputBoxName === 'Amount' ? makeNumeric() : null"
            v-model="data"
            @focusin="isClicked = true"
            @focusout="isClicked = false"
            type="text"
            class="w-amount h-14 border-2 rounded text-lg text-center focus:outline-blue-theme"
            :class="{
                'w-description': props.inputBoxName == 'Description',
                'border-warning': isThisEmpty || isThisEmpty,
            }"
        />
    </div>
</template>
