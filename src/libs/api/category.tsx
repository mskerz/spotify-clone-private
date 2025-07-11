import Category from "@/types/category";
import api from "@/lib/api";
import { BASE_URL } from "@/constant";

 async function getCategory(): Promise<Category[]> {
  try {
    const res =await fetch(`${BASE_URL}/categories`, {
      method: "GET",
    })
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    return [];
  }
}

export { getCategory };
