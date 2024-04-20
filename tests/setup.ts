import "@testing-library/jest-dom";

import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "../src/mocks/Server";

// Establish API mocking before all tests.
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
