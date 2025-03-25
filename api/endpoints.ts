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
    manager:{
      getAll:"/management/user/get-all"
    }
  },
};
