// import useAuth from './useAuth.js';

function useServerService() {

  // const { currentUserValue, logout } = useAuth();

  const getQueryFromObject = (dataObj) => {
    // console.log(dataObj);

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

    console.log('fetching ', url);
    
    // try {
    //   const response = await fetch(url, {
    //     method: method,
    //     body: JSON.stringify(data),
    //     headers
    //   })
    //     .catch(error => {
    //       console.error(error);
    //       throw error;
    //     })
    //     .then(async (res) => {
    //       // console.log('1 response service', res)
    //       if (res.ok) {
    //         return res.json();
    //       } else {
    //         const resp = await res.json()
    //         console.log('error data', resp)
    //         // throw Error(resp.error_message, { cause: resp });
    //         throw resp;
    //       }
    //     })
    //   return response;
    // } catch (err) {
    //   console.error('catch', err)
    //   throw err;
    // }

    return new Promise((resolve) => {
      resolve({
        items: [
          {
            "has_synonyms": true,
            "is_moderator_only": false,
            "is_required": false,
            "count": 2529023,
            "name": url
          },
          {
            "has_synonyms": true,
            "is_moderator_only": false,
            "is_required": false,
            "count": 2529023,
            "name": "javascript"
          },
          {
            "has_synonyms": true,
            "is_moderator_only": false,
            "is_required": false,
            "count": 2192458,
            "name": "python"
          },
          {
            "has_synonyms": true,
            "is_moderator_only": false,
            "is_required": false,
            "count": 1917429,
            "name": "java"
          },
          {
            "has_synonyms": true,
            "is_moderator_only": false,
            "is_required": false,
            "count": 1615050,
            "name": "c#"
          },
          {
            "collectives": [
              {
                "tags": [
                  "php"
                ],
                "external_links": [
                  {
                    "type": "support",
                    "link": "https://stackoverflow.com/contact?topic=15"
                  }
                ],
                "description": "A collective where developers working with PHP can learn and connect about the open source scripting language.",
                "link": "/collectives/php",
                "name": "PHP",
                "slug": "php"
              }
            ],
            "has_synonyms": true,
            "is_moderator_only": false,
            "is_required": false,
            "count": 1464508,
            "name": "php"
          },
          {
            "collectives": [
              {
                "tags": [
                  "android",
                  "ios"
                ],
                "external_links": [
                  {
                    "type": "support",
                    "link": "https://stackoverflow.com/contact?topic=15"
                  }
                ],
                "description": "A collective for developers who want to share their knowledge and learn more about mobile development practices and platforms",
                "link": "/collectives/mobile-dev",
                "name": "Mobile Development",
                "slug": "mobile-dev"
              }
            ],
            "has_synonyms": true,
            "is_moderator_only": false,
            "is_required": false,
            "count": 1417314,
            "name": "android"
          },
          {
            "has_synonyms": true,
            "is_moderator_only": false,
            "is_required": false,
            "count": 1187442,
            "name": "html"
          },
          {
            "has_synonyms": true,
            "is_moderator_only": false,
            "is_required": false,
            "count": 1034862,
            "name": "jquery"
          },
          {
            "has_synonyms": true,
            "is_moderator_only": false,
            "is_required": false,
            "count": 806776,
            "name": "c++"
          },
          {
            "has_synonyms": true,
            "is_moderator_only": false,
            "is_required": false,
            "count": 804286,
            "name": "css"
          },
          {
            "collectives": [
              {
                "tags": [
                  "android",
                  "ios"
                ],
                "external_links": [
                  {
                    "type": "support",
                    "link": "https://stackoverflow.com/contact?topic=15"
                  }
                ],
                "description": "A collective for developers who want to share their knowledge and learn more about mobile development practices and platforms",
                "link": "/collectives/mobile-dev",
                "name": "Mobile Development",
                "slug": "mobile-dev"
              }
            ],
            "has_synonyms": true,
            "is_moderator_only": false,
            "is_required": false,
            "count": 687280,
            "name": "ios"
          },
          {
            "has_synonyms": true,
            "is_moderator_only": false,
            "is_required": false,
            "count": 670775,
            "name": "sql"
          },
          {
            "has_synonyms": true,
            "is_moderator_only": false,
            "is_required": false,
            "count": 662058,
            "name": "mysql"
          },
          {
            "collectives": [
              {
                "tags": [
                  "shinydashboard",
                  "lubridate",
                  "tibble",
                  "zoo",
                  "forcats",
                  "stringr",
                  "r-package",
                  "rstudio",
                  "r-caret",
                  "rvest",
                  "data.table",
                  "dtplyr",
                  "shinyapps",
                  "tidyverse",
                  "readr",
                  "purrr",
                  "r-raster",
                  "dplyr",
                  "knitr",
                  "shiny-server",
                  "plyr",
                  "ggplot2",
                  "tidyr",
                  "rlang",
                  "r",
                  "shiny",
                  "quantmod"
                ],
                "external_links": [
                  {
                    "type": "support",
                    "link": "https://stackoverflow.com/contact?topic=15"
                  }
                ],
                "description": "A collective where data scientists and AI researchers gather to find, share, and learn about R and other subtags like knitr and dplyr.",
                "link": "/collectives/r-language",
                "name": "R Language",
                "slug": "r-language"
              }
            ],
            "has_synonyms": true,
            "is_moderator_only": false,
            "is_required": false,
            "count": 505609,
            "name": "r"
          },
          {
            "has_synonyms": true,
            "is_moderator_only": false,
            "is_required": false,
            "count": 476817,
            "name": "reactjs"
          },
          {
            "has_synonyms": true,
            "is_moderator_only": false,
            "is_required": false,
            "count": 472085,
            "name": "node.js"
          },
          {
            "has_synonyms": true,
            "is_moderator_only": false,
            "is_required": false,
            "count": 416703,
            "name": "arrays"
          },
          {
            "has_synonyms": false,
            "is_moderator_only": false,
            "is_required": false,
            "count": 403931,
            "name": "c"
          },
          {
            "has_synonyms": true,
            "is_moderator_only": false,
            "is_required": false,
            "count": 374635,
            "name": "asp.net"
          },
          {
            "has_synonyms": true,
            "is_moderator_only": false,
            "is_required": false,
            "count": 360366,
            "name": "json"
          },
          {
            "has_synonyms": true,
            "is_moderator_only": false,
            "is_required": false,
            "count": 343683,
            "name": "python-3.x"
          },
          {
            "has_synonyms": true,
            "is_moderator_only": false,
            "is_required": false,
            "count": 338059,
            "name": "ruby-on-rails"
          },
          {
            "has_synonyms": true,
            "is_moderator_only": false,
            "is_required": false,
            "count": 337895,
            "name": ".net"
          },
          {
            "has_synonyms": true,
            "is_moderator_only": false,
            "is_required": false,
            "count": 334538,
            "name": "sql-server"
          },
          {
            "has_synonyms": true,
            "is_moderator_only": false,
            "is_required": false,
            "count": 333386,
            "name": "swift"
          },
          {
            "has_synonyms": false,
            "is_moderator_only": false,
            "is_required": false,
            "count": 311839,
            "name": "django"
          },
          {
            "has_synonyms": true,
            "is_moderator_only": false,
            "is_required": false,
            "count": 304107,
            "name": "angular"
          },
          {
            "has_synonyms": true,
            "is_moderator_only": false,
            "is_required": false,
            "count": 292332,
            "name": "objective-c"
          },
          {
            "has_synonyms": true,
            "is_moderator_only": false,
            "is_required": false,
            "count": 286655,
            "name": "pandas"
          },
          {
            "has_synonyms": true,
            "is_moderator_only": false,
            "is_required": false,
            "count": 286528,
            "name": "excel"
          }
        ],
        has_more: true,
        quota_max: 300,
        quota_remaining: 118,
        total: 1000,
      });
    })
  }

  return { request, getQueryFromObject };
}

export default useServerService;
