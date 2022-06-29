export default fetchData = async (accessToken) =>
  fetch("http://svcy3.myclass.vn/api/Users/getProfile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  }).then((data) => data.json());
