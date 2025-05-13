"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  initial?: User;
  onSubmit: (data: Partial<User>) => void;
}

const roles = ["admin", "student", "lecturer"];

export default function UserFormModal({ open, onClose, initial, onSubmit }: Props) {
  const [displayName, setDisplayName] = useState(initial?.displayName || "");
  const [email, setEmail] = useState(initial?.email || "");
  const [role, setRole] = useState(initial?.role || "student");
  const [specialize, setSpecialize] = useState(initial?.specialize?.join(", ") || "");
  const [isActive, setIsActive] = useState(initial?.isActive ?? true);

  useEffect(() => {
    if (initial) {
      setDisplayName(initial.displayName);
      setEmail(initial.email);
      setRole(initial.role);
      setSpecialize(initial.specialize?.join(", ") || "");
      setIsActive(initial.isActive);
    }
  }, [initial]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{initial ? "Chỉnh sửa người dùng" : "Tạo người dùng mới"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1 font-medium">Tên hiển thị</label>
            <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">Vai trò</label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn vai trò" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((r) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">Chuyên môn (phân cách bằng dấu phẩy)</label>
            <Input value={specialize} onChange={(e) => setSpecialize(e.target.value)} />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Đang hoạt động</span>
            <Switch checked={isActive} onCheckedChange={setIsActive} />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>Huỷ</Button>
            <Button
              onClick={() => {
                onSubmit({
                  email,
                  displayName,
                  role,
                  specialize: specialize.split(",").map(s => s.trim()).filter(Boolean),
                  isActive,
                });
              }}
            >
              {initial ? "Cập nhật" : "Tạo mới"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
