const API = "http://localhost:8000"; // apna backend URL

export const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// PRODUCTS
export const getProducts = () =>
  fetch(`${API}/products`).then(res => res.json());

export const createProduct = (data) =>
  fetch(`${API}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(data),
  });

// ORDERS (ADMIN)
export const getAllOrders = () =>
  fetch(`${API}/orders/all`, { headers: authHeader() }).then(res => res.json());

export const updateOrderStatus = (id, status) =>
  fetch(`${API}/orders/admin/update-status/${id}?new_status=${status}`, {
    method: "PUT",
    headers: authHeader(),
  });

// RETURNS
export const getReturns = () =>
  fetch(`${API}/returns`, { headers: authHeader() }).then(res => res.json());

export const approveReturn = (id) =>
  fetch(`${API}/returns/admin/approve/${id}`, {
    method: "PUT",
    headers: authHeader(),
  });

export const rejectReturn = (id) =>
  fetch(`${API}/returns/admin/reject/${id}`, {
    method: "PUT",
    headers: authHeader(),
  });

// REVIEWS
export const getPendingReviews = () =>
  fetch(`${API}/reviews/pending`, { headers: authHeader() }).then(res => res.json());

export const approveReview = (id) =>
  fetch(`${API}/reviews/${id}/approve`, {
    method: "PUT",
    headers: authHeader(),
  });

export const rejectReview = (id) =>
  fetch(`${API}/reviews/${id}/reject`, {
    method: "PUT",
    headers: authHeader(),
  });

// COUPON
export const createCoupon = (data) =>
  fetch(`${API}/coupons/admin/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(data),
  });