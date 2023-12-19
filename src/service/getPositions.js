import { ref } from "vue";

export const getPositions = () => {
  try {
    const positions = ref(JSON.parse(localStorage.getItem("positions")));
    return positions.value;
  } catch (error) {
    console.log(error);
  }
};
