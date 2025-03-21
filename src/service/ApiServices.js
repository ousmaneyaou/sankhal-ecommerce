// ApiService pour centralise toutes les interactions avec l'API backend

import axios from "axios";

export default class ApiService {
  static BASE_URL = "http://localhost:8070";

  static getHeader() {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }
  // Authentification et Gestion des Utilisateurs
  static async registerUser(registration) {
    const response = await axios.post(
      `${this.BASE_URL}/auth/register`,
      registration
    );
    return response.data;
  }

  static async loginUser(loginDetails) {
    const response = await axios.post(
      `${this.BASE_URL}/auth/login`,
      loginDetails
    );
    return response.data;
  }

  static async userInfos() {
    const response = await axios.get(`${this.BASE_URL}/user/my-info`, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  /**PRODUCT ENDPOINT */

  static async addProduct(formData) {
    const response = await axios.post(
      `${this.BASE_URL}/product/create`,
      formData,
      {
        headers: {
          ...this.getHeader(),
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  static async updateProduct(formData) {
    const response = await axios.put(
      `${this.BASE_URL}/product/update`,
      formData,
      {
        headers: {
          ...this.getHeader(),
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  static async getAllProducts() {
    const response = await axios.get(`${this.BASE_URL}/product/get-all`);
    return response.data;
  }

  static async searchProducts(searchValue) {
    const response = await axios.get(`${this.BASE_URL}/product/search`, {
      params: { searchValue },
    });
    return response.data;
  }

  static async getAllProductsByCategoryId(categoryId) {
    const response = await axios.get(
      `${this.BASE_URL}/product/get-by-category-id/${categoryId}`
    );
    return response.data;
  }

  static async getProductById(productId) {
    const response = await axios.get(
      `${this.BASE_URL}/product/get-by-product-id/${productId}`
    );
    return response.data;
  }

  static async deleteProduct(productId) {
    const response = await axios.delete(
      `${this.BASE_URL}/product/delete/${productId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  /**CATEGORY */
  static async createCategory(body) {
    const response = await axios.post(
      `${this.BASE_URL}/category/create`,
      body,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async getAllCategory() {
    const response = await axios.get(`${this.BASE_URL}/category/get-all`);
    return response.data;
  }

  static async getCategoryById(categoryId) {
    const response = await axios.get(
      `${this.BASE_URL}/category/get-category-by-id/${categoryId}`
    );
    return response.data;
  }

  static async updateCategory(categoryId, body) {
    const response = await axios.put(
      `${this.BASE_URL}/category/update/${categoryId}`,
      body,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async deleteCategory(categoryId) {
    const response = await axios.delete(
      `${this.BASE_URL}/category/delete/${categoryId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  /**ORDEDR */
  static async createOrder(body) {
    const response = await axios.post(`${this.BASE_URL}/order/create`, body, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  static async getAllOrders() {
    const response = await axios.get(`${this.BASE_URL}/order/filter`, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  static async getOrderItemById(itemId) {
    const response = await axios.get(`${this.BASE_URL}/order/filter`, {
      headers: this.getHeader(),
      params: { itemId },
    });
    return response.data;
  }

  static async getAllOrderItemsByStatus(status) {
    const response = await axios.get(`${this.BASE_URL}/order/filter`, {
      headers: this.getHeader(),
      params: { status },
    });
    return response.data;
  }

  static async updateOrderitemStatus(orderItemId, status) {
    const response = await axios.put(
      `${this.BASE_URL}/order/update-item-status/${orderItemId}`,
      {},
      {
        headers: this.getHeader(),
        params: { status },
      }
    );
    return response.data;
  }

  //Gestion des Adresses
  static async saveAddress(body) {
    const response = await axios.post(`${this.BASE_URL}/address/save`, body, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  /***Vérification de l'Authentification */

  // Déconnectez l'utilisateur en supprimant le token et le rôle du localStorage.
  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  // Vérifiez si un utilisateur est connecté ( truesi le token existe, sinon false).

  static isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  // Vérifiez si l'utilisateur a un rôle ADMIN .

  static isAdmin() {
    const role = localStorage.getItem("role");
    return role === "ADMIN";
  }
}
