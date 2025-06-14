import Category from "@/types/category";


 async function getCategory(): Promise<Category[]> {
  try {
    const res = await fetch("http://localhost:3000/api/categories", {
      method: "GET",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    return [];
  }
}

export { getCategory };
