"use client";

import { Calendar } from "lucide-react";

interface DateFilterProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export default function DateFilter({ selectedDate, onDateChange }: DateFilterProps) {
  return (
    <div className="relative">
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
        placeholder="dd-mm-yyyy"
        className="bg-black border border-white/20 text-white text-sm rounded-lg focus:ring-0 focus:border-[#c5a37e] block w-40 p-2 outline-none transition-all placeholder:text-gray-500"
        style={{ colorScheme: "dark" }}
      />
    </div>
  );
}
