import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // ให้ระบุ path โฟลเดอร์ Next.js app ของคุณ
  dir: "./",
});

// config Jest ที่จะส่งต่อไปให้ next/jest
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  clearMocks: true, // ล้าง mock ทุกครั้งก่อนเทสใหม่
  collectCoverage: true, // รวบรวม coverage
  coverageDirectory: "coverage", // โฟลเดอร์เก็บรายงาน coverage
  collectCoverageFrom: [
    "src/**/*.{ts,tsx,js,jsx}",
    "!src/**/*.d.ts",
    "!**/node_modules/**",
    "!**/.next/**",
  ],
  moduleNameMapper: {
    // ตรงกับ alias ใน tsconfig.json (ถ้ามี)
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
// npm test
// export config ผ่าน next/jest
export default createJestConfig(config);
