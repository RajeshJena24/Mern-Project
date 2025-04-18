import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import React from "react";
// https://vitejs.dev/config/
export default defineConfig({
	build: {
	  rollupOptions: {
		output: {
		  manualChunks(id) {
			if (id.includes('node_modules')) {
			  return 'vendor';
			}
		  }
		}
	  },
	  chunkSizeWarningLimit: 1024, // Increase limit
	}
  });