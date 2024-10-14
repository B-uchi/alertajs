export default {
  setupFilesAfterEnv: ["<rootDir>/tests/setupTests.ts"],
  preset: "ts-jest",
  roots: ["<rootDir>/tests"],
  testMatch: ["**/?(*.)+(test).[tj]s?(x)"],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"],
  moduleNameMapper: {
    "\\.(css)$": "identity-obj-proxy",
  },
};
