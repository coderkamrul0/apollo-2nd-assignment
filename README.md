# Express JS App - User and Order Management

This Node.js Express application provides API endpoints for managing users and orders, integrating MongoDB with Mongoose for data storage.

## Endpoints

### 1. Create a New User

**Endpoint:** `POST /api/users/`

**Description:** Create a new user with the provided details.

### 2. Get All Users

**Endpoint:** `GET /api/users/`

**Description:** Retrieve a list of all users with filtered fields.

### 3. Get a Single User by ID

**Endpoint:** `GET /api/users/:userId`

**Description:** Retrieve information about a specific user by ID.

### 4. Update User Information

**Endpoint:** `PUT /api/users/:userId`

**Description:** Update user information with the provided data.

### 5. Delete a User

**Endpoint:** `DELETE /api/users/:userId`

**Description:** Delete a user by ID.

### 6. Add New Product in Order

**Endpoint:** `PUT /api/users/:userId/orders`

**Description:** If the 'orders' property already exists for a user, append a new product to it. Otherwise, create an 'orders' array within the user object and then add the order data.

### 7. Get All Orders for a Specific User

**Endpoint:** `GET /api/users/:userId/orders`

**Description:** Retrieve all orders for a specific user.

### 8. Calculate Total Price of Orders for a Specific User

**Endpoint:** `GET /api/users/:userId/orders/total-price`

**Description:** Calculate the total price of all orders for a specific user.


# Project Structure

The project is organized using a modular folder structure to enhance maintainability and scalability. Each folder has a specific role in managing different aspects of the application.

## 1. `interface`

This folder contains TypeScript interfaces that define the data structures used in the application.

- `user.interface.ts`: Defines the structure for the user data.

## 2. `middleware`

Middleware functions that handle requests and perform specific tasks before passing control to the next function in the request-response cycle.


- `validation.middleware.ts`: Handles request validation using Joi/Zod.

## 3. `controller`

Controllers handle the interaction between the models and views, receiving user input and updating the model accordingly.

- `user.controller.ts`: Handles user-related actions.

## 4. `service`

Services contain business logic and perform operations on the data received from controllers.

- `user.service.ts`: Contains user-related business logic.

## 5. `routes`

Routes define the API endpoints and link them to the appropriate controllers.

- `user.routes.ts`: Defines routes for user-related actions.


## Usage

1. Install dependencies: `npm install`
2. Set up MongoDB database and configure connection in `.env` file.
3. Run the application: `npm start`
4. Access the API at `http://localhost:your-port/`

## Dependencies

- Node.js
- Express.js
- Mongoose
- TypeScript
- Zod
- Bcrypt
- Other dependencies (list them if any)

## Project Usage

1. Install dependencies: `npm install`
2. Configure MongoDB connection in `.env` file.
3. Run the application: `npm start`
4. Access the API at `http://localhost:your-port/`

## Validation

Incoming data is validated using Joi/Zod in the `validation.middleware.ts` to ensure data integrity.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request.

## Configuration

Ensure to set up the MongoDB connection details in the `.env` file.

```env
DB_CONNECTION_STRING=your-mongodb-connection-string
PORT=your-app-port
