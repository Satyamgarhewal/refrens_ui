const baseUrl = process.env.REACT_APP_BASE_URL;

export const getData = async (path) => {
  const url = baseUrl + path;
  let dataResponse;
  await fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: new Headers({
      'Content-Type': 'application/json; charset=UTF-8',
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      dataResponse = response;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return dataResponse;
};
