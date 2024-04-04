function useServerService() {

  const getQueryFromObject = (dataObj) => {

    let query = "";
    Object.keys(dataObj).forEach(key => {
      query += `${key}=${dataObj[key]}&`;
    });
    return query;
  }

  async function request(method, url, data) {
    url = `${process.env.REACT_APP_SERVER_URL}${url}`;
    let headers = {
      'Access-Control-Allow-Origin': '*',
    }

    // console.log('fetching ', url);
    try {
      const response = await fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers
      })
        .catch(error => {
          throw error;
        })
        .then(async (res) => {
          if (res.ok) {
            return res.json();
          } else {
            const resp = await res.json()
            throw resp;
          }
        })
      return response;
    } catch (err) {
      console.error('catch', err)
      throw err;
    }
  }

  return { request, getQueryFromObject };
}

export default useServerService;
