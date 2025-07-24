"use client";
import { AdminUser } from "@/types/user";
import { columns } from "./colums";
import { DataTable } from "./data-table";
import {useSuperAdmin} from "@/hooks/auth/admin";
import { useEffect } from "react";

function Page() {
  const {admin_users,error, fetchAdminsData} = useSuperAdmin();
   
  useEffect(() => {
    fetchAdminsData();
  }, [fetchAdminsData]);
  
  return (
    <>
       {/* Additional content can be added here */}
            <div className="container mx-auto py-10">
              <DataTable columns={columns} data={admin_users} />
            </div>
    </>
  );
}
export default Page;
