# 📦 Project: Build APIs with Node.js and Express for ShoppyGlobe

- GitHub: https://github.com/yashagrawaltech/project_build_apis_with_nodejs

## 🛒 E-commerce API (250 marks)

### 🎯 Objective

Develop a robust backend API using Node.js, Express, and MongoDB to facilitate an e-commerce platform. This API will efficiently manage product listings, user authentication, and shopping cart functionalities, providing a seamless experience for users to browse products, manage their shopping carts, and securely handle user accounts.

---

## 🛠️ Requirements

### 1. Node.js and Express API Setup (60 marks)

-   Set up a Node.js application using **Express**. ✅
-   Create routes for the following:
    -   **GET** `/products`: Fetch a list of products from MongoDB. ✅
    -   **GET** `/products/:id`: Fetch details of a single product by its ID. ✅
    -   **POST** `/cart`: Add a product to the shopping cart. ✅
    -   **PUT** `/cart/:id`: Update the quantity of a product in the cart. ✅
    -   **DELETE** `/cart/:id`: Remove a product from the cart. ✅

### 2. MongoDB Integration (50 marks)

-   Use **MongoDB** to store product data and cart items. ✅
-   Set up collections for:
    -   **Products**: Each product should have fields like name, price, description, and stock quantity. ✅
    -   **Cart**: Store items added to the cart, including product IDs and quantities. ✅
-   Implement CRUD operations on MongoDB collections for products and cart items. ✅
-   Add screenshots from the MongoDB Database. ✅

### 3. API Error Handling and Validation (20 marks)

-   Implement error handling for all API routes. ✅
-   Validate input data (e.g., check if product ID exists before adding to the cart). ✅

### 4. Authentication & Authorization (60 marks)

-   Implement **JWT-based authentication**. ✅
-   Create routes for User Registration and User Login:
    -   **POST** `/register`: Register a new user. ✅
    -   **POST** `/login`: Authenticate user and return a JWT token. ✅
-   Protect cart routes, so only logged-in users can access them. ✅

### 5. Testing with ThunderClient (35 marks)

-   Use **ThunderClient** to test all API routes. ✅

---

## 📝 Submission Guidelines (25 marks)

-   Ensure the API runs without errors. (10 marks) ✅
-   Submit a GitHub link with code and documentation for all API testing screenshots. (5 marks) ✅
-   Include comments and proper documentation. (5 marks) ✅

---

## 📊 Marking Criteria Summary

| Task                                           | Marks   |
| :--------------------------------------------- | :------ |
| Node.js project setup and Express installation | 60      |
| API routes implementation                      | 60      |
| MongoDB integration                            | 50      |
| API error handling and validation              | 20      |
| Authentication & Authorization                 | 60      |
| Testing with ThunderClient                     | 35      |
| Submission guidelines                          | 25      |
| **Total**                                      | **250** |

---

## 🚀 Getting Started

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yashagrawaltech/project_build_apis_with_nodejs.git
    cd <repository-directory>
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Run the application**:

    ```bash
    npm start
    ```

4. **Test the API** using ThunderClient with the provided endpoints.
