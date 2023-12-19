import accountsJson from "../data/accounts.json";

export const getAccounts = () => {
  try {
    return accountsJson.accounts;
  } catch (error) {
    console.log(error);
  }
};
