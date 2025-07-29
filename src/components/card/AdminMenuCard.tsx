"use client";

import Link from "next/link";

import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

type AdminMenuCardProps = {
  link: string;
  name: string;
};
function AdminMenuCard({ link , name }: AdminMenuCardProps) {
  return (
    <Link href={link}>
      <Card className="   cursor-pointer hover:bg-secondary/50  transition-colors duration-300 ">
        <CardHeader>
          <CardTitle> {name}</CardTitle>
          <CardDescription className="text-sm  ">View</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
export default AdminMenuCard;
