const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiFetch = async (url: string, options: RequestInit = {}) => {
  const auth = localStorage.getItem("auth");
  const token = auth ? JSON.parse(auth)?.token : null;

  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: token }),
    },
  });

  return res.json();
};
