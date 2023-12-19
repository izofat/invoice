import { savePosition } from "../../service/savePositions";
import { getPositions } from "../../service/getPositions";
import { deletePosition } from "../../service/deletePosition";
import { updatePosition } from "../../service/updatePosition";

const state = {
    positions: [],
};

const getters = {
    getPositions(state) {
        return state.positions;
    },
};

const mutations = {
    SAVE_POSITIONS(state, positions) {
        state.positions = positions;
    },

};

const actions = {
    loadPositions({ commit }) {
        const positions = getPositions();
        commit("SAVE_POSITIONS", positions);
    },
    setPositions({ dispatch }, data) {
        savePosition(data);
        dispatch("loadPositions", { root: true });
    },
    deletePosition({ dispatch }, indexPosition) {
        state.positions.splice(indexPosition, 1);
        deletePosition(state.positions);
        dispatch("loadPositions", { root: true });
    },
    updatePosition({ dispatch }, data) {
        // data[0] represents index data[1] respresents position
        state.positions[data[0]] = data[1];
        updatePosition(state.positions);
        dispatch('loadPositions',{root : true});
    },

};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
