import Category from "@/types/category";
import api from "@/libs/axios";
import { BASE_URL } from "@/constant/api";

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
