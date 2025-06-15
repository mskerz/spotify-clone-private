"use client";

import {
  User,
  Pen,
  ShieldCheck,
  Lock,
  HelpCircle,
  FileText,
  Globe,
  Info,
  Mail,
  ShieldQuestion,
  SunMoon,
} from "lucide-react";
import { IoApps, IoImage } from "react-icons/io5";
import { SettingItem } from "../button/setting-menu";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { useRedux } from "@/hooks/redux";

function SettingMenu() {
  const { useSelector } = useRedux();
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <IoApps />
            System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SettingItem icon={<Info className="h-5 w-5" />} title="Theme" />
          <SettingItem
            icon={<ShieldQuestion className="h-5 w-5" />}
            title="Language"
          />
        </CardContent>
      </Card>
      {user && isLoggedIn && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <User />
                Account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SettingItem
                icon={<Pen className="h-5 w-5" />}
                title="แก้ไขข้อมูลส่วนตัว"
              />
              <SettingItem
                icon={<IoImage className="h-5 w-5" />}
                title="เปลี่ยนรูปโปรไฟล์"
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <ShieldCheck />
                Security & Privacy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SettingItem
                icon={<Lock className="h-5 w-5" />}
                title="Change Password"
              />

              <SettingItem
                icon={<Lock className="h-5 w-5" />}
                title="Two-Factor Auth"
                isDisabled
              />
            </CardContent>
          </Card>
        </>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <HelpCircle />
            Help & Info
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SettingItem
            icon={<Mail className="h-5 w-5" />}
            title="Contact Support"
          />
          <SettingItem
            icon={<ShieldQuestion className="h-5 w-5" />}
            title="Privacy Policy"
          />
          <SettingItem
            icon={<FileText className="h-5 w-5" />}
            title="Terms of Service"
          />
        </CardContent>
      </Card>
    </>
  );
}
export default SettingMenu;
