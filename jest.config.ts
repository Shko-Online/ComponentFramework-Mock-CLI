/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  coveragePathIgnorePatterns: ["/node_modules/"],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  coverageReporters: ["cobertura", "lcov", "text", "html"],

  preset: "ts-jest",

  testEnvironment: "node",

  testMatch: ["<rootDir>/__tests__/**/*.[jt]s?(x)"],
};

export default config;
