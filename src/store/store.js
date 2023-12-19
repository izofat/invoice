import { createStore } from "vuex";
import currencyRates from "./modules/currencyRates";
import accounts from "./modules/accounts";
import positions from "./modules/positions";

const store = createStore({
  modules: {
    currencyRates,
    accounts,
    positions,
  },
});

export default store;
