# Personal Expense Tracker

Personal expense tracker is designed to help users manage their expenses efficiently. It consists of a backend built with Spring Boot and a frontend built with React. Authentication and authorization are implemented using Spring Security.

<!-- ## -->

<!-- ### Screenshots -->

### Project dir. structure

```java
expense-tracker/
.
├── backend
│   ├── HELP.md
│   ├── mvnw
│   ├── mvnw.cmd
│   ├── pom.xml
│   ├── src
│   │   ├── main
│   │   │   ├── java
│   │   │   │   └── com
│   │   │   │       └── example
│   │   │   │           └── backend
│   │   │   │               ├── BackendApplication.java
│   │   │   │               ├── ServletInitializer.java
│   │   │   │               ├── controller
│   │   │   │               │   ├── AuthController.java
│   │   │   │               │   └── HomeController.java
│   │   │   │               ├── dto
│   │   │   │               │   ├── AuthResponse.java
│   │   │   │               │   ├── LoginRequest.java
│   │   │   │               │   └── SignUpRequest.java
│   │   │   │               ├── exception
│   │   │   │               ├── model
│   │   │   │               │   └── User.java
│   │   │   │               ├── repository
│   │   │   │               │   └── UserRepository.java
│   │   │   │               ├── security
│   │   │   │               │   ├── CorsConfig.java
│   │   │   │               │   └── SecurityConfig.java
│   │   │   │               └── service
│   │   │   │                   └── CustomUserDetailsService.java
│   │   │   └── resources
│   │   │       ├── application.properties
│   │   │       ├── static
│   │   │       └── templates
│   │   └── test
│   └── target
│       ├── classes       
│       └── generated-sources
│           └── annotations
├── frontend
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   └── index.html
│   ├── readme.md
│   ├── src
│   │   ├── App.js
│   │   ├── components
│   │   │   ├── LoginForm.jsx
│   │   │   ├── Logout.js
│   │   │   └── RegisterForm.jsx
│   │   └── index.js
│   ├── styles
│   │   └── index.css
│   └── webpack.config.js
└── readme.md

1731 directories, 12296 files
```

Creating this app involves several steps, including setting up the backend and frontend, implementing the necessary features, and connecting them. Here's a high-level overview of the process:

### Steps to Set Up the Application

1. **Set Up Backend with Spring Boot:**
   - Initialize a Spring Boot project with necessary dependencies.
   - Configure Spring Security OAuth2 for authentication.
   - Create RESTful APIs for CRUD operations on expenses.

2. **Set Up Frontend with React:**
   - Initialize a React project and install dependencies.
   - Create components for managing expenses.
   - Integrate Axios for API requests and styled-components for styling.

3. **Connect Backend and Frontend:**
   - Implement API integration using Fetch/Axios to communicate with the backend.
   - Integrate OAuth2 authentication flow in the frontend.

4. **Authentication Flow:**
   - Users authenticate through the frontend, which sends requests to the backend.
   - Backend verifies credentials and issues access tokens for authenticated users.

### Issues Faced and Resolutions

- **Redirect Issue**: After connecting to the React login endpoint, I encountered too many redirects because I was using `formLogin()` in Spring Security, which is intended for Thymeleaf or other Spring views, not for React.
- **CORS Configuration**: Addressed by configuring CORS settings in the backend to allow requests from the frontend.
- **SQL Reserved Keyword**: Was named an entity as "user" but found that it's a reserved keyword in SQL. Avoided using reserved keywords like "user" for entity names to prevent conflicts.
- **React Redirect Issue**: `react-router-dom` requires proper configuration in webpack. You need to set `historyApiFallback: true` in the dev-server to enable routing functionality correctly. It redirects all requests to the root URL (e.g., /) so that React Router can handle them.

### Authentication flow in details

- User enters credentials in the React frontend and submits the login form.
- The frontend sends a POST request to a login endpoint in the Spring Boot backend.
- The backend validates the credentials and generates a JWT token.
- The backend sends the JWT token back to the frontend.
- The frontend stores the JWT token securely.
- Subsequent requests from the frontend to secured endpoints include the JWT token in the request headers for authentication.
- The backend verifies the JWT token for each secured request.
