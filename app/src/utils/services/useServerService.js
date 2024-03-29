// import useAuth from './useAuth.js';

function useServerService() {

  // const { currentUserValue, logout } = useAuth();

  const getQueryFromObject = (dataObj) => {
    // console.log(dataObj);

    let query = "";
    Object.keys(dataObj).forEach(key => {
      if (!!dataObj[key] || dataObj[key] === 0)
        query += `${key}=${dataObj[key]}&`;
    });
    return query
  }

  async function request(method, url, data) {
    url = `${process.env.REACT_APP_SERVER_URL}${url}`;
    let headers = {
      'Access-Control-Allow-Origin': '*',
    }

    try {
      const response = await fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers
      })
        .catch(error => {
          console.error(error);
          throw error;
        })
        .then(async (res) => {
          console.log('1 response service', res)
          if (res.ok) {
            return res.json();
          } else {
            const resp = await res.json()
            console.log('error data', resp)
            // throw Error(resp.error_message, { cause: resp });
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
