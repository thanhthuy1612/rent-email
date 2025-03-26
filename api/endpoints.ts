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
    getNewEmail: "/key/request/get-new-email",
  },
  manager: {
    getService: "/management/service/get-all",
    updateService: "/management/service/update-service",
    getPartner: "/management/partner/get-all",
    updatePartner: "/management/partner/update-partner",
    getRequest: "/management/request/get-all",
    getTransaction: "/management/transaction/get-all",
    getDiscount: "/management/sytemconfig/get-topup-promotion-config",
    updateDiscount: "/management/sytemconfig/update-topup-promotion-config",
    getAll: "/management/user/get-all",
  },
};
