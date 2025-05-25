"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  onClose: () => void;
  initial?: User;
  onSubmit: (data: Partial<User>) => Promise<any>; // onSubmit trả về Promise
}

const roles = ["admin", "student", "lecturer"];

export default function UserFormModal({ open, onClose, initial, onSubmit }: Props) {
  const [displayName, setDisplayName] = useState(initial?.displayName || "");
  const [email, setEmail] = useState(initial?.email || "");
  const [role, setRole] = useState(initial?.role || "student");
  const [isActive, setIsActive] = useState(initial?.isActive ?? true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initial) {
      setDisplayName(initial.displayName);
      setEmail(initial.email);
      setRole(initial.role);
      setIsActive(initial.isActive);
    }
  }, [initial]);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await onSubmit({
        email,
        displayName,
        role,
        isActive,
      });
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
          <DialogTitle>{initial ? "Chỉnh sửa người dùng" : "Tạo người dùng mới"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1 font-medium">Tên hiển thị</label>
            <Input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">Email</label>
            <Input
              value={email}
              readOnly
              disabled
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
            <Button onClick={handleSubmit} disabled={submitting}>
              {initial ? "Cập nhật" : "Tạo mới"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
