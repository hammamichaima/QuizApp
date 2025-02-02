import { API_BASE_URL, QUIZ_ENDPOINT } from "./config";

import { fetchQuizData } from "./api";

export const fetchQuizData = async () => {
  try {
    console.log("🔄 Fetching quiz data...");
    const response = await fetch(`${API_BASE_URL}${QUIZ_ENDPOINT}`);
    const data = await response.json();
    console.log("✅ Fetched Quiz Data:", data);
    return data;
  } catch (error) {
    console.error("❌ Fetch Error:", error);
    return null;
  }
};
