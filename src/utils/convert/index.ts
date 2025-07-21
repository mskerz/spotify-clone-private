

function thaiToEnglish(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // ลบ accent
    .replace(/[^\u0000-\u007E]/g, "") // ตัดอักษรนอกอังกฤษ
    .replace(/\s+/g, " ");
}

export { thaiToEnglish };



