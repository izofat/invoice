export const savePosition = (positionData) => {
  try {
    const savedPositions = JSON.parse(localStorage.getItem("positions"));
    savedPositions.push(positionData);
    localStorage.setItem("positions", JSON.stringify(savedPositions));
  } catch (error) {
    console.log(error);
  }
};
