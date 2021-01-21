const mmm = {
  1: "Jan", 
  2: "Feb", 
  3: "Mar",  
  4: "Apr", 
  5: "May", 
  6: "Jun", 
  7: "Jul", 
  8: "Aug", 
  9: "Sep", 
  10: "Oct", 
  11: "Nov", 
  12: "Dec", 
} 

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

function formatterMMM(monthNum) { 
  return mmm[monthNum]
}

function formatterNull(refDate) {
  return refDate
}

function getXFormatter(xFormat) {
  const funcs = {
    "two-line": formatterDateAndTimeTwoLine,
    "dd-mmm": formatterDDMMM,
    "mmm": formatterMMM,
    null: formatterNull, 
  };
  return funcs[xFormat];
}

export default getXFormatter;
