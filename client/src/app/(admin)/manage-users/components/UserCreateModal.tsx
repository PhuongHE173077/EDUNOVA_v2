"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<User> & { username: string }) => Promise<any>;
}

const roles = ["admin", "student", "lecturer"];

export default function UserCreateModal({ open, onClose, onSubmit }: Props) {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");
  const [isActive, setIsActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await onSubmit({
        username,
        displayName,
        email,
        role,
        isActive,
      });
      // reset form
      setUsername("");
      setDisplayName("");
      setEmail("");
      setRole("student");
      setIsActive(true);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tạo người dùng mới</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1 font-medium">Tên đăng nhập (username)</label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={submitting}
              placeholder="Nhập username"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">Tên hiển thị</label>
            <Input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              disabled={submitting}
              placeholder="Nhập tên hiển thị"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting}
              placeholder="Nhập email"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">Vai trò</label>
            <Select value={role} onValueChange={setRole} disabled={submitting}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn vai trò" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Đang hoạt động</span>
            <Switch checked={isActive} onCheckedChange={setIsActive} disabled={submitting} />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose} disabled={submitting}>
              Huỷ
            </Button>
            <Button onClick={handleSubmit} disabled={submitting || !username || !email || !displayName}>
              Tạo mới
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
