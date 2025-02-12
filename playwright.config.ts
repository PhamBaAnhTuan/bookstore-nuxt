import { defineConfig } from "@playwright/test";

export default defineConfig({
	webServer: {
		command: "npm run dev", // Start Nuxt.js before running tests
		url: "http://localhost:3000", // Change if using a different port
		reuseExistingServer: !process.env.CI, // Reuse server in development
	},
	use: {
		baseURL: "http://localhost:3000",
		headless: true, // Set to false for debugging
		viewport: { width: 1280, height: 720 },
	},
});
