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
  return await ApiClient.patch(`user/${data.id}/edit`,data.data)
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



// api cũ
export const updatePasswordApi = async (user) => {
  return await ApiClient.patch(`/api/users/${user.id}`, {
    username: user.username,
    newPassword: user.newPassword,
  })
    .then((response) => response)
    .catch((error) => {
      return error.response;
    });
};

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
