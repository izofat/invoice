import { getAccounts } from "../../service/getAccounts";

const state = {
  accounts: [],
};

const getters = {
  getAccounts(state) {
    return state.accounts;
  },
};

const mutations = {
  SAVE_ACCOUNTS(state, accounts) {
    state.accounts = accounts;
  },
};

const actions = {
  async loadAccounts({ commit }) {
    const accounts = getAccounts();
    commit("SAVE_ACCOUNTS", accounts);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
