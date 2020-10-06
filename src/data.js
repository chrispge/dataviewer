async function getData() {
  let url = "http://localhost:3001/GenByUnit?fuel=nuclear&unit=tricastin%201";
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

export default getData;
