module.exports = {
    roots: [
      "<rootDir>/modules",
      "<rootDir>/components"
    ],
    testEnvironment: "node",
    globals: {
      "ts-jest": {
        diagnostics: {
          warnOnly: true
        }
      }
    },  
    testMatch: [
      "**/__tests__/**/*.+(ts|tsx|js)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
       // Setup Enzyme
   snapshotSerializers: ["enzyme-to-json/serializer"],
   setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

   moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
  }