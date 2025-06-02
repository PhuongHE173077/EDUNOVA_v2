'use client'

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchLessonById } from "@/apis/lession.apis";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Pencil, Trash2, RefreshCw } from "lucide-react";

const ContentSes = ({ lesson, setLesson }: any) => {

  const [statusFilter, setStatusFilter] = useState<string>("all");



  const filterQuestions = (questions: any[]) => {
    if (statusFilter === "all") return questions;
    return questions.filter(q => q.status?.toString() === statusFilter);
  };

  return (
    <div className=" mx-auto p-4 bg-muted/40 rounded-xl shadow-sm">
      <div className="mb-4 w-40">
        <Label htmlFor="status-filter" className="text-sm font-medium text-muted-foreground">
          Status Filter
        </Label>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger id="status-filter" className="mt-1">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="0">Not Started</SelectItem>
            <SelectItem value="1">In Progress</SelectItem>
            <SelectItem value="2">Finished</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filterQuestions(lesson?.questions || []).map((item: any, index: number) => (
        <Card key={index} className="mb-3 hover:bg-muted transition-colors cursor-pointer">
          <CardContent className="flex items-start gap-4 py-4 px-5">
            <div className="mt-1 text-orange-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M3 8h18M4 6h16M5 4h14" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-base font-semibold text-foreground">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
              <span className="text-xs font-medium text-green-600">
                {item.status === 0 ? "Not Started" : item.status === 1 ? "In Progress" : "Finished"}
              </span>
            </div>
            <div className="flex gap-1 items-center">
              <Button size="sm" variant="outline" className="text-xs px-2 py-1 h-auto">
                <RefreshCw className="w-3 h-3 mr-1" />
                Restart
              </Button>
              <Button size="icon" variant="ghost">
                <Pencil className="w-4 h-4 text-blue-500" />
              </Button>
              <Button size="icon" variant="ghost">
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ContentSes;
