<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
const store = useStore();
store.dispatch("positions/loadPositions");
const positions = computed(() => store.getters["positions/getPositions"]);
watch(
    () => positions.value,
    (newPositions) => {
        Object.values(newPositions).forEach((position) => {
            store.dispatch("currencyRates/saveCurrencyAndAmount", [
                position.currency,
                position.amount,
            ]);
        });

        store.dispatch("currencyRates/loadCurrencyRates");
    }
);
const totalAmount = computed(() => store.getters["currencyRates/getTotal"]);
</script>

<template>
    <div
        class="mt-10 bg-blue-background w-[93%] ml-[3%] mr-[3%] flex h-20 items-center justify-center rounded-[4px] border-blue-title border-[1px]"
    >
        <h2 class="text-blue-title text-[20px] font-semibold font-mono">
            TOTAL AMOUNT : {{ totalAmount }} €
        </h2>
    </div>
</template>
