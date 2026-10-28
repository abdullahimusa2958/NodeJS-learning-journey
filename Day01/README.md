# Day 01: Introduction to Node.js and Express.js

## Overview

This is Day 1 of my Node.js learning journey. The goal was to understand what Node.js and Express.js are, how to start a Node.js project, and how to build a simple API.

I also learned how to install packages using npm, run a server with Nodemon, and use `.gitignore` to keep unnecessary files out of my GitHub repository.

## What I Learned

### 1. What is Node.js?

Node.js is a JavaScript runtime that allows us to run JavaScript outside a web browser. It makes it possible to use JavaScript for backend development, including building servers and APIs.

Learn more: [Official Node.js Website](https://nodejs.org/en)

### 2. What is Express.js?

Express.js is a web framework for Node.js that makes building web servers and APIs easier. It provides a simple way to define routes, handle requests, and send responses to clients.

Instead of writing all the server logic from scratch, Express provides tools that make the process simpler.

Learn more: [Express.js on npm](https://www.npmjs.com/package/express) | [Official Express.js Website](https://expressjs.com/)

### 3. Starting a Node.js Project

I learned how to initialize a Node.js project using npm.

```bash
npm init -y
```

This creates a `package.json` file containing information about the project, its scripts, and its dependencies.

### 4. Installing Packages

I installed Express.js and Nodemon for the project.

**Express.js**

```bash
npm install express
```

Express was used to create the server and define API routes.

Official reference: [Express.js on npm](https://www.npmjs.com/package/express)

**Nodemon**

```bash
npm install nodemon
```

Nodemon automatically restarts the Node.js application when it detects changes to the files being watched. This makes development easier because I do not have to restart the server manually after every change.

Official reference: [Nodemon on npm](https://www.npmjs.com/package/nodemon)

### 5. Understanding `package.json`

The `package.json` file contains important project information, including the project name, version, scripts, and installed packages.

In this project, I added the following scripts:

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "node": "node index.js",
  "dev:1": "nodemon Day01/index.js"
}
```

What the scripts do:

- `npm run node` runs `index.js` in the project root.
- `npm run dev:1` starts the Day 01 server using Nodemon.
- `npm test` runs the default test script, which currently indicates that no tests have been configured.

### 6. Understanding `.gitignore` and `node_modules`

When packages are installed, npm creates a `node_modules` folder containing the installed packages and their dependencies.

This folder can become large, so it is generally not committed to GitHub. Instead, Git can ignore it using a `.gitignore` file.

Example `.gitignore`:

```gitignore
node_modules/
.env
```

The `node_modules/` entry prevents Git from tracking the installed packages. The `.env` entry prevents environment files from being tracked if they are added later.

The `package.json` and `package-lock.json` files should normally be committed so that other developers can install the project's dependencies using:

```bash
npm install
```

Learn more: [Git Documentation](https://git-scm.com/doc)

---

## Project: Simple Products API

For the practical part of Day 01, I built a simple REST API using Express.js.

The API stores product information in an array and allows a client to retrieve, create, update, and delete products.

Each product contains:

- `id` — the product's identifier.
- `name` — the product's name.
- `price` — the product's price.
- `description` — a short description of the product.

### API Endpoints

The server runs on port `3000`.

Base URL: `http://localhost:3000`

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Returns a welcome message. |
| GET | `/products` | Retrieves all products. |
| GET | `/products/:id` | Retrieves a product by its ID. |
| POST | `/create` | Adds a new product. |
| PATCH | `/update-product/:id` | Updates selected fields of a product. |
| PUT | `/update-product/:id` | Updates a product's fields. |
| DELETE | `/delete/:id` | Deletes a product by its ID. |

### Understanding the HTTP Methods

- **GET:** Used to retrieve data from the server.
- **POST:** Used to create a new resource.
- **PATCH:** Used to update selected fields of an existing resource.
- **PUT:** Used to replace the resource's fields with the supplied values in this implementation.
- **DELETE:** Used to remove a resource.

### How the API Works

**1. Creating the Express application**

```javascript
const express = require('express');
const app = express();
const port = 3000;
```

This imports Express, creates an application, and sets the server's port.

**2. Reading JSON request bodies**

```javascript
app.use(express.json());
```

This middleware allows Express to read JSON data sent in a request body, such as the product details supplied when creating or updating a product.

**3. Handling route parameters**

For example:

```javascript
app.get('/products/:id', (req, res) => {
    const { id } = req.params;
});
```

The `:id` part is a route parameter. Express makes its value available through `req.params`.

**4. Sending responses**

```javascript
res.status(200).json({
    status: true,
    message: "All products fetched",
    data: allProducts
});
```

Here, `res.status(200)` sets the HTTP status code, while `.json()` sends a JSON response to the client.

**5. Handling missing products**

The API checks whether a product exists before retrieving, updating, or deleting it. If the product is not found, the server returns a `404 Not Found` response.

---

## How to Run the Project

### Prerequisites

- [Node.js](https://nodejs.org/en) installed on your computer.
- npm, which is included with Node.js.
- A code editor, such as Visual Studio Code.
- An API testing tool, such as [Postman](https://www.postman.com/) or [Thunder Client](https://www.thunderclient.com/).

### Step 1: Clone the repository

```bash
git clone https://github.com/abdullahimusa2958/nodejs-learning-journey.git
```

### Step 2: Open the project folder

```bash
cd nodejs-learning-journey
```

### Step 3: Install dependencies

```bash
npm install
```

### Step 4: Start the Day 01 server

```bash
npm run dev:1
```

You should see a message similar to:

```text
Server is running on http://localhost:3000
```

### Step 5: Test the API

Open `http://localhost:3000` in your browser to test the welcome route.

For the other endpoints, use Postman or Thunder Client. For POST, PATCH, and PUT requests, select JSON as the request body format where applicable.

Example JSON body for creating a product:

```json
{
  "name": "Mouse",
  "price": 8000,
  "description": "A wireless computer mouse."
}
```

Send this body to:

```text
POST http://localhost:3000/create
```

---

## Important Notes

- The products are stored in an array in memory, not in a database.
- Newly created, updated, or deleted products are not permanently saved. Restarting the server resets the products to their original values.
- Product IDs are used to locate products in the array in this beginner implementation.
- This is a learning project, not a production-ready API.

## Key Takeaway

Day 01 helped me understand the basics of Node.js, Express.js, npm, and Nodemon. I also gained practical experience creating a server, defining API routes, handling requests and responses, and performing basic CRUD operations.

This is the foundation for the next stages of my backend development journey, where I will continue learning about routing, middleware, databases, authentication, and more.

**Learning one step at a time.**
