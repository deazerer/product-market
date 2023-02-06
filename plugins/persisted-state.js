import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import cookie from 'cookie'

export default ({ store, isDev, req }) => {
  createPersistedState({
    key: 'cart',
    paths: ['cart'],
    storage: {
      getItem: (key) => {
        if (process.server) {
          const parsedCookies = cookie.parse(req.headers.cookie ?? '')
          return parsedCookies[key]
        } else {
          return Cookies.get(key)
        }
      },
      setItem: (key, value) => {
        Cookies.set(key, value, { expires: 365, secure: !isDev })
      },
      removeItem: (key) => Cookies.remove(key),
    },
  })(store)
}
