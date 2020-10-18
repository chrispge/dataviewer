function formatterDateAndTimeTwoLine(refDate) {
  const lineOne = new Date(refDate).toLocaleString("default", {
    day: "2-digit",
    month: "short",
  });
  const lineTwo = new Date(refDate).toLocaleString("default", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return lineOne.concat("\n", lineTwo);
}

function formatterDDMMM(refDate) {
  return new Date(refDate).toLocaleString("default", {
    day: "2-digit",
    month: "short",
  });
}

function getXFormatter(xFormat) {
  const funcs = {
    "two-line": formatterDateAndTimeTwoLine,
    "dd-mmm": formatterDDMMM,
  };
  return funcs[xFormat];
}

export default getXFormatter;
