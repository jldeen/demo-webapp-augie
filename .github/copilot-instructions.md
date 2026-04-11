# Copilot Instructions

This is a Node.js Express web application. When generating code:

- Use ES6+ syntax (const/let, arrow functions, template literals)
- Follow the existing Express router pattern in `src/routes/`
- Always include input validation for POST/PUT endpoints
- Use descriptive error messages in JSON format: `{ "error": "message" }`
- Add JSDoc comments for exported functions
- Write tests using Jest and Supertest
- Keep middleware in `src/middleware/` directory
- Use environment variables for configuration (via dotenv)
