export const endpoints = {
  user: {
    login: {
      getCaptcha: "/web/user/get-captcha",
      post: "/web/user/login",
      profile: "/web/user/profile",
    },
    register: {
      getCaptcha: "/web/user/get-captcha",
      post: "/web/user/register",
    },
    changePassword: "/web/user/change-password",
    changeKey: "/web/user/change-key",
  },
  key: {
    getRequest: "/key/request/get-history",
    getTransaction: "/key/transaction/get-history",
  },
  manager: {
    getAll: "/management/user/get-all",
    updateUser: "/management/user/update-user",
  },
};
