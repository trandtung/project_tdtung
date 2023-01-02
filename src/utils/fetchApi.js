import { ApiClient } from "../request/request";

export const loginApi = async (user) => {
  // console.log(user)
  return await ApiClient.post("/user/auth/login", user)
    .then((response) => response.data.data)
    .catch((error) => {
      return error;
    });
};
// api mới

// edit user

// client
export const saveClientPredictApi = async (data) => {
  return await ApiClient.post(`/client/add`, data)
    .then((response) => response)
    .catch((error) => {
      return error.response;
    });
};

export const saveManyImageApi = async (data) => {
  return await ApiClient.post(`/image`, data)
    .then((response) => response)
    .catch((error) => {
      return error.response;
    });
};

export const getListImageApi = async (data) => {
  return await ApiClient.post(`/image/list`, data)
    .then((response) => response)
    .catch((error) => {
      return error.response;
    });
};

export const getClientsApi = async () => {
  return await ApiClient.get(`/client`)
    .then((response) => response)
    .catch((error) => {
      return error.response;
    });
};

export const getClientDetailApi = async (id) => {
  return await ApiClient.get(`/client/${id}`)
    .then((response) => response)
    .catch((error) => {
      return error.response;
    });
};

export const deleteClientApi = async (id) => {
  return await ApiClient.delete(`/client/delete/${id}`)
    .then((response) => response)
    .catch((error) => {
      return error.response;
    });
};

export const changeInfomationUserApi = async (data) => {
  return await ApiClient.patch(`user/${data.id}/edit`, data.data)
    .then((response) => response)
    .catch((error) => {
      return error.response;
    });
};

export const getUserApi = async (id) => {
  return await ApiClient.get(`user/${id}`)
    .then((response) => response)
    .catch((error) => {
      return error.response;
    });
};

export const addFeedBackApi = async (data) => {
  return await ApiClient.post(`/historyFb/add`, data)
    .then((response) => response)
    .catch((error) => {
      return error.response;
    });
};

export const getFeedBackApi = async () => {
  return await ApiClient.get(`/historyFb/limit`)
    .then((response) => response)
    .catch((error) => {
      return error.response;
    });
};

export const getNumberClientDayApi = async (date) => {
  return await ApiClient.post(`client/countclient/day`, { date: date })
    .then((response) => response)
    .catch((error) => {
      return error.response;
    });
};

export const getTotalClientApi = async () => {
  return await ApiClient.get(`client/total`)
    .then((response) => response)
    .catch((error) => {
      return error.response;
    });
};

export const updateClientApi = async (data) => {
  return await ApiClient.patch(`client/${data.id}/edit`, data.data)
    .then((response) => response)
    .catch((error) => {
      return error.response;
    });
};

export const getTotalImgApi = async () => {
  return await ApiClient.get(`image/total`)
    .then((response) => response)
    .catch((error) => {
      return error.response;
    });
};

export const updatePasswordApi = async (user) => {
  return await ApiClient.patch(`/user/${user.id}/changepw`, {
    currentPw: user.currentPw,
    newPw: user.newPw,
  })
    .then((response) => response)
    .catch((error) => {
      return error.response;
    });
};
// api cũ

export const registerUser = async (user) => {
  return await ApiClient.post("/auth/register", user)
    .then((response) => response)
    .catch((error) => {
      return error.response;
    });
};

export const getUserByIdApi = async (id) => {
  return await ApiClient.get(`/api/users/${id}`)
    .then((response) => response.data.data)
    .catch((error) => {
      return error;
    });
};

export const getCategoriesApi = async () => {
  return await ApiClient.get("/api/categories")
    .then((response) => response)
    .catch((error) => {
      return error;
    });
};

export const getTasksApi = async (params) => {
  return await ApiClient.get("/api/tasks", { params: params })
    .then((response) => response)
    .catch((error) => {
      return error;
    });
};

export const addTaskApi = async (task) => {
  return await ApiClient.post("/api/tasks", task)
    .then((response) => response)
    .catch((error) => {
      return error;
    });
};

// export const removeTaskApi = async (idtask) => {
//   return await ApiClient.delete(`/api/tasks/${idtask}`)
//     .then((response) => response)
//     .catch((error) => {
//       return error;
//     });
// };

// export const updateTaskApi = async (data) => {
//   return await ApiClient.patch(`/api/tasks/${data.id}`, data.datatask)
//     .then((response) => response)
//     .catch((error) => {
//       return error;
//     });
// };
