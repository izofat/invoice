export const updatePosition = (positions) => {
  try {
    localStorage.setItem("positions", JSON.stringify(positions));
  } catch (error) {
    console.log(error);
  }
};
