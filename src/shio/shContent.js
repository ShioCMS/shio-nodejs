'use strict'

import { request } from 'graphql-request'

const query = `{
    articles(where: {_furl: "new-feature"}) {
      id
      _furl
      text
      
    }
  }
  `

request('https://shio.viglet.net/graphql', query).then(data =>
    console.log(data.articles[0].id)
)

exports.getContent = function () {
    return {
        system: {
            "id": "id",
        }
    }
}