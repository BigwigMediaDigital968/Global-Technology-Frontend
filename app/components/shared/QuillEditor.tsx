"use client";

import { useLayoutEffect, useRef } from "react";
import Quill from "quill";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function QuillEditor({ value, onChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Prevent duplicate initialization
    if (quillRef.current) return;

    const editor = document.createElement("div");
    container.appendChild(editor);

    const quill = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: {
          container: [
            [{ font: [] }, { size: [] }],
            ["bold", "italic", "underline"],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
          ],
          handlers: {
            image: () => handleImageUpload(quill),
          },
        },
      },
    });

    // Sync changes
    quill.on("text-change", () => {
      const html = quill.root.innerHTML;
      const cleanHtml = html.replace(/class=".*?"/g, "");
      onChange(cleanHtml);
    });

    // Set initial content
    if (value) {
      quill.root.innerHTML = value;
    }

    quillRef.current = quill;

    return () => {
      // Proper destroy
      quill.off("text-change");
      container.innerHTML = "";
      quillRef.current = null;
    };
  }, []);

  /* ===========================
     LOCAL IMAGE UPLOAD HANDLER
  ============================ */
  const handleImageUpload = (quill: Quill) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result as string;
        const alt = prompt("Enter ALT text (recommended)") || "";
        const link = prompt("Enter image link (optional)") || "";

        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, "image", base64);

        setTimeout(() => {
          const imgs = containerRef.current?.querySelectorAll("img");
          if (!imgs) return;

          const lastImg = imgs[imgs.length - 1];
          if (!lastImg) return;

          lastImg.setAttribute("alt", alt);
          lastImg.style.maxWidth = "100%";
          lastImg.style.height = "auto";

          if (link) {
            const wrapper = document.createElement("a");
            wrapper.href = link;
            wrapper.target = "_blank";
            lastImg.parentNode?.insertBefore(wrapper, lastImg);
            wrapper.appendChild(lastImg);
          }
        }, 50);
      };

      reader.readAsDataURL(file);
    };
  };

  return (
    <div className="bg-[#0d0d0d] text-white rounded-2xl border border-neutral-800 overflow-hidden">
      <div ref={containerRef} />
    </div>
  );
}
