<script setup>
import { useStore } from "vuex";
import { ref } from "vue";
import bus from "../service/bus";
const props = defineProps({
    isNew: Boolean,
    positionType: String,
    indexPosition: Number,
});
const emit = defineEmits();
const store = useStore();
let notEditedCount = ref(5);
bus.on("enterPressed", saveActionFromEnter);
if (!props.isNew) {
    bus.on("oldPropEditted", editHappened);
    bus.on("oldPropUnEditted", unEditHappened);
}
function editHappened(positionIndex) {
    if (positionIndex == props.indexPosition) {
        notEditedCount.value--;
    }
}
function unEditHappened(positionIndex) {
    if (positionIndex == props.indexPosition) {
        notEditedCount.value++;
    }
}

function saveActionFromEnter(positionIndex) {
    if (props.indexPosition == positionIndex) {
        saveAction();
    }
}

function saveAction() {
    bus.emit("sendDataToRootComponent", props.indexPosition);
    if (props.positionType === "newPosition") {
        emit("saveData");
    } else if (notEditedCount.value != 5) {
        emit("updateData", props.indexPosition);
    }
}
function deletePosition() {
    store.dispatch("positions/deletePosition", props.indexPosition);
}

function buttonIconHoverTrashCan() {
    document.getElementById("trashCanIcon" + props.indexPosition).style.color =
        "rgba(74,144,226,1)";
}
function buttonIconUnHoverTrashCan() {
    document.getElementById("trashCanIcon" + props.indexPosition).style.color =
        "rgb(108, 108, 109)";
}
function buttonIconHoverSave() {
    if (props.isNew || notEditedCount.value != 5) {
        document.getElementById("saveIcon" + props.indexPosition).style.color =
            "rgba(74,144,226,1)";
    }
}
function buttonIconUnHoverSave() {
    if (props.isNew || notEditedCount.value != 5) {
        document.getElementById("saveIcon" + props.indexPosition).style.color =
            "rgb(108, 108, 109)";
    }
}
</script>

<template>
    <div class="flex gap-0 items-center justify-center mt-4 ml-6">
        <button
            @mouseover="buttonIconHoverTrashCan"
            @mouseleave="buttonIconUnHoverTrashCan"
            @click="deletePosition"
            :class="{
                hidden: props.positionType == 'newPosition',
            }"
            class="w-12 h-12 border-[2px] rounded border-r-0 rounded-r-none border-[rgb(237,238,241)] hover:bg-[#4A90E214]"
        >
            <i
                :id="'trashCanIcon' + props.indexPosition"
                style="color: rgb(108, 108, 109)"
                class="fa-solid fa-trash"
            ></i>
        </button>
        <button
            @click="saveAction"
            @mouseover="buttonIconHoverSave"
            @mouseleave="buttonIconUnHoverSave"
            :disabled="notEditedCount == 5 && props.positionType == 'oldPosition'"
            :class="{
                'hover:bg-[#4a90e214]': notEditedCount != 5 || isNew,
                'rounded-l-none': !isNew,
            }"
            class="w-12 h-12 border-[2px] rounded border-[rgb(237,238,241)]"
        >
            <i
                :id="'saveIcon' + props.indexPosition"
                :class="{
                    'text-[rgb(186,184,184)]': notEditedCount == 5 && !props.isNew,
                    'text-[rgb(108,108,109)]': notEditedCount != 5 || props.isNew,
                }"
                class="fa-solid fa-floppy-disk"
            ></i>
        </button>
    </div>
</template>
