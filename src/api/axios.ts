import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터: 모든 요청 헤더에 액세스 토큰을 추가합니다.
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 401 에러 발생 시 토큰을 갱신하고 재요청합니다.
instance.interceptors.response.use(
  // 성공적인 응답은 그대로 반환
  (response) => response,
  // 에러 처리
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고, 아직 재시도하지 않은 요청일 경우
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 재시도 플래그를 설정하여 무한 루프 방지

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          // 리프레시 토큰이 없으면 로그인 페이지로
          window.location.href = "/login";
          return Promise.reject(error);
        }

        // 새로운 액세스 토큰을 요청합니다. (엔드포인트는 백엔드에 맞게 수정 필요)
        const { data } = await axios.post(
          "http://localhost:8080/api/token/refresh",
          {
            refreshToken,
          }
        );

        // 새로운 액세스 토큰을 로컬 스토리지에 저장
        localStorage.setItem("accessToken", data.accessToken);

        // 실패했던 원래 요청의 헤더에 새로운 토큰을 넣어 재요청
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return instance(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰마저 만료되거나 유효하지 않으면, 모든 토큰을 지우고 로그인 페이지로 이동
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
