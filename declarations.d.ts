declare global {
    namespace NodeJS {
      interface ProcessEnv {
        BACKEND_URL: "http://localhost:8080"
      }
    }
  }