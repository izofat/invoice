import { getCurrencyRate } from "../../service/getCurrencyRates";

const state = {
    total: 0,
    currencyAndAmount: [],
    //*every array's first index is currency second is amount
};

const getters = {
    getTotal(state) {
        return state.total;
    },
};

const mutations = {
    SAVE_TOTAL(state, total) {
        state.total += total;
    },
    SAVE_CURRENCY_AND_AMOUNT(state, currencyAndAmount) {
        state.currencyAndAmount.push(currencyAndAmount);
    },
};

const actions = {
    async loadCurrencyRates({ commit,state },) {
        let totalSum = 0;
        state.total = 0;
        state.currencyAndAmount.forEach(async (position) => {
            const totalPosition = await getCurrencyRate(position[0]);
            totalSum = totalPosition * position[1];
            commit("SAVE_TOTAL", totalSum);
        });
        state.currencyAndAmount = [];
    },
    saveCurrencyAndAmount({ commit }, currencyAndAmount) {
        commit("SAVE_CURRENCY_AND_AMOUNT", currencyAndAmount);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
