import axios from "axios";
import { ref } from "vue";
const APIURL = "http://localhost:3000/api/";

export const getCurrencyRate = async (currency) => {
    try {
        const currencyRates = ref();
        const response = await axios.get(new URL(APIURL + currency));
        if (response.status >= 200 && response.status < 300) {
            currencyRates.value = response.data.rate;
            return currencyRates.value;
        } else {
            console.log(response.status);
        }
    } catch (error) {
        console.log(error);
    }
};
