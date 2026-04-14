"use client";

import { useState, useEffect, useRef } from "react";
import { useModal } from "@/app/Context/ModalContext";

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
interface UploadFile {
  file: File;
  progress: number;
  preview?: string;
}

interface Draft {
  id: string;
  subject: string;
  content: string;
  selectedEmails: string[];
  savedAt: string;
}

interface SendProgress {
  total: number;
  sent: number;
  failed: number;
  current: string;
  status: "idle" | "running" | "done" | "error";
}

/* ─────────────────────────────────────────
   Constants
───────────────────────────────────────── */
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_TOTAL_SIZE = 15 * 1024 * 1024;

/* ─────────────────────────────────────────
   Email Templates
───────────────────────────────────────── */
const TEMPLATES = [
  {
    id: "none",
    label: "No Template",
    description: "Start with a blank canvas",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect
          x="4"
          y="4"
          width="20"
          height="20"
          rx="2"
          stroke="#666"
          strokeWidth="1.5"
          strokeDasharray="3 2"
        />
        <line x1="14" y1="9" x2="14" y2="19" stroke="#666" strokeWidth="1.5" />
        <line x1="9" y1="14" x2="19" y2="14" stroke="#666" strokeWidth="1.5" />
      </svg>
    ),
    html: "",
  },
  {
    id: "newsletter",
    label: "Newsletter",
    description: "Product update with stats & CTA",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect
          x="3"
          y="3"
          width="22"
          height="22"
          rx="2"
          fill="#1a1a1a"
          stroke="#D4A017"
          strokeWidth="1"
        />
        <rect
          x="6"
          y="6"
          width="16"
          height="5"
          rx="1"
          fill="#D4A017"
          opacity="0.9"
        />
        <rect x="6" y="13" width="10" height="1.5" rx="0.75" fill="#888" />
        <rect x="6" y="16" width="7" height="1.5" rx="0.75" fill="#888" />
        <rect
          x="6"
          y="19"
          width="9"
          height="2"
          rx="1"
          fill="#D4A017"
          opacity="0.6"
        />
      </svg>
    ),
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<style>
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:#f4f4f0;font-family:Arial,sans-serif;color:#1a1a1a;}
  .wrap{max-width:600px;margin:32px auto;background:#fff;border:1px solid #e0ded8;}
  .hdr{background:#0a0a0a;padding:24px 36px;border-bottom:3px solid #D4A017;display:flex;align-items:center;justify-content:space-between;}
  .logo{color:#fff;font-size:17px;font-weight:700;letter-spacing:-0.3px;}
  .logo span{display:block;font-size:9px;font-weight:400;color:#D4A017;letter-spacing:2px;text-transform:uppercase;margin-top:2px;}
  .tag{background:#D4A017;color:#0a0a0a;font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:4px 10px;}
  .hero{background:#111;padding:44px 36px;}
  .hero-label{display:inline-block;background:#D4A017;color:#0a0a0a;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:4px 10px;margin-bottom:16px;}
  .hero h1{color:#fff;font-size:28px;font-weight:700;line-height:1.25;margin-bottom:12px;}
  .hero h1 em{font-style:normal;color:#D4A017;}
  .hero p{color:#999;font-size:14px;line-height:1.7;margin-bottom:28px;}
  .btn-gold{display:inline-block;background:#D4A017;color:#0a0a0a;font-size:12px;font-weight:700;text-decoration:none;padding:12px 24px;text-transform:uppercase;letter-spacing:0.5px;}
  .btn-ghost{display:inline-block;background:transparent;color:#fff;font-size:12px;text-decoration:none;padding:12px 20px;border:1px solid #444;margin-left:10px;}
  .stats{background:#D4A017;padding:20px 36px;display:table;width:100%;table-layout:fixed;}
  .sc{display:table-cell;text-align:center;border-right:1px solid rgba(10,10,10,0.15);}
  .sc:last-child{border-right:none;}
  .sn{font-size:22px;font-weight:700;color:#0a0a0a;display:block;line-height:1;}
  .sl{font-size:9px;font-weight:600;color:rgba(10,10,10,0.6);text-transform:uppercase;letter-spacing:1.2px;display:block;margin-top:3px;}
  .body{padding:36px;}
  .sec-label{font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D4A017;margin-bottom:6px;}
  .sec-title{font-size:20px;font-weight:700;color:#0a0a0a;margin-bottom:10px;}
  .sec-body{font-size:13px;color:#555;line-height:1.75;margin-bottom:24px;}
  .divider{border:none;border-top:1px solid #eee;margin:28px 0;}
  .dark-box{background:#0a0a0a;padding:28px;margin-bottom:28px;border-left:4px solid #D4A017;}
  .dark-box h3{color:#fff;font-size:16px;font-weight:700;margin-bottom:8px;}
  .dark-box p{color:#999;font-size:13px;line-height:1.7;margin-bottom:16px;}
  .testimonial{background:#faf8f2;border:1px solid #e8e6e0;padding:24px 28px;margin-bottom:28px;}
  .stars{color:#D4A017;letter-spacing:2px;margin-bottom:8px;}
  .quote{font-size:14px;color:#222;line-height:1.75;font-style:italic;margin-bottom:12px;}
  .author{font-size:12px;font-weight:700;color:#0a0a0a;}
  .company{font-size:11px;color:#999;}
  .cta{background:#0a0a0a;padding:32px 36px;text-align:center;border-top:3px solid #D4A017;}
  .cta h2{color:#fff;font-size:20px;font-weight:700;margin-bottom:8px;}
  .cta p{color:#888;font-size:13px;margin-bottom:20px;line-height:1.6;}
  .ftr{background:#f9f7f1;padding:24px 36px;border-top:1px solid #e8e6e0;text-align:center;}
  .ftr-links{margin-bottom:12px;}
  .ftr-links a{font-size:11px;color:#888;text-decoration:none;margin:0 8px;}
  .ftr-addr{font-size:10px;color:#aaa;line-height:1.8;margin-bottom:10px;}
  .ftr-unsub{font-size:10px;color:#bbb;}
  .ftr-unsub a{color:#D4A017;text-decoration:none;}
</style>
</head>
<body>
<div class="wrap">
  <div class="hdr">
    <div class="logo">Global Technologies<span>Est. India</span></div>
    <div class="tag">Newsletter</div>
  </div>
  <div class="hero">
    <div class="hero-label">Product Update — 2026</div>
    <h1>Elevate Your <em>Operations</em> with Certified Spare Parts</h1>
    <p>Premium elevator components engineered for safety, durability, and performance — trusted by 500+ B2B clients across India.</p>
    <a href="https://www.globaltechnologiesindia.com/products" class="btn-gold">View Catalogue</a>
    <a href="https://www.globaltechnologiesindia.com/contact" class="btn-ghost">Get a Quote</a>
  </div>
  <div class="stats">
    <div class="sc"><span class="sn">15+</span><span class="sl">Years Exp.</span></div>
    <div class="sc"><span class="sn">500+</span><span class="sl">B2B Clients</span></div>
    <div class="sc"><span class="sn">1000+</span><span class="sl">Products</span></div>
    <div class="sc"><span class="sn">50+</span><span class="sl">Cities</span></div>
  </div>
  <div class="body">
    <div class="sec-label">What's New</div>
    <div class="sec-title">Latest from Our Catalogue</div>
    <p class="sec-body">From advanced control systems to heavy-duty traction machines — we stock genuine, certified components from globally trusted brands like ARKEL, APSON MOTOR, SHARP ENGINEERS, and more.</p>
    <div class="dark-box">
      <h3>Authorized Distributor for Global Brands</h3>
      <p>We are the authorized stockist for ARKEL, APSON MOTOR, SHARP ENGINEERS, NBSL, and MARAZZI — ensuring genuine parts and dedicated technical support.</p>
      <a href="https://www.globaltechnologiesindia.com/about" class="btn-gold">Learn More</a>
    </div>
    <hr class="divider"/>
    <div class="testimonial">
      <div class="stars">★★★★★</div>
      <div class="quote">"We trust Global Technologies for all our elevator component requirements. Consistent quality and timely delivery every time."</div>
      <div class="author">Neeraj Gupta</div>
      <div class="company">Prime Elevators</div>
    </div>
  </div>
  <div class="cta">
    <h2>Ready to Place an Order?</h2>
    <p>Share your requirement and our team will respond within 24 hours.</p>
    <a href="https://www.globaltechnologiesindia.com/contact" class="btn-gold">Submit Requirement</a>
  </div>
  <div class="ftr">
    <div class="ftr-links">
      <a href="https://www.globaltechnologiesindia.com/">Home</a>
      <a href="https://www.globaltechnologiesindia.com/products">Products</a>
      <a href="https://www.globaltechnologiesindia.com/about">About</a>
      <a href="https://www.globaltechnologiesindia.com/contact">Contact</a>
    </div>
    <div class="ftr-addr">Global Technologies | Elevator Spare Parts Manufacturer & Supplier<br/>Mon–Sat | 10 AM – 6 PM | support@globaltechnologiesindia.com</div>
    <div class="ftr-unsub">You're receiving this because you subscribed at globaltechnologiesindia.com.<br/><a href="https://www.globaltechnologiesindia.com/unsubscribe">Unsubscribe</a> | <a href="https://www.globaltechnologiesindia.com/privacy-policy">Privacy Policy</a></div>
  </div>
</div>
</body>
</html>`,
  },
  {
    id: "promo",
    label: "Promotional",
    description: "Bold offer announcement with urgency",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect
          x="3"
          y="3"
          width="22"
          height="22"
          rx="2"
          fill="#1a1a1a"
          stroke="#f59e0b"
          strokeWidth="1"
        />
        <polygon
          points="14,6 17,12 24,12 18.5,16.5 20.5,23 14,19 7.5,23 9.5,16.5 4,12 11,12"
          fill="#f59e0b"
          opacity="0.9"
        />
      </svg>
    ),
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<style>
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:#f0ede8;font-family:Arial,sans-serif;color:#1a1a1a;}
  .wrap{max-width:600px;margin:32px auto;background:#fff;border:1px solid #ddd;}
  .top-bar{background:#D4A017;padding:10px 36px;text-align:center;}
  .top-bar p{font-size:11px;font-weight:700;color:#0a0a0a;letter-spacing:1.5px;text-transform:uppercase;}
  .hdr{background:#0a0a0a;padding:22px 36px;display:flex;align-items:center;justify-content:space-between;}
  .logo{color:#fff;font-size:17px;font-weight:700;}
  .logo span{display:block;font-size:9px;color:#D4A017;letter-spacing:2px;text-transform:uppercase;margin-top:2px;}
  .hero{background:linear-gradient(135deg,#0a0a0a 60%,#1a1208 100%);padding:52px 36px;text-align:center;position:relative;overflow:hidden;}
  .badge{display:inline-block;background:#D4A017;color:#0a0a0a;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:5px 14px;margin-bottom:18px;}
  .hero h1{color:#fff;font-size:34px;font-weight:700;line-height:1.2;margin-bottom:8px;}
  .hero h1 strong{color:#D4A017;}
  .hero-sub{color:#999;font-size:14px;line-height:1.6;margin-bottom:12px;}
  .hero-valid{color:#D4A017;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:28px;}
  .btn-gold{display:inline-block;background:#D4A017;color:#0a0a0a;font-size:13px;font-weight:700;text-decoration:none;padding:14px 32px;text-transform:uppercase;letter-spacing:0.5px;}
  .features{padding:36px;background:#fff;}
  .feat-title{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D4A017;margin-bottom:16px;text-align:center;}
  .feat-grid{display:table;width:100%;table-layout:fixed;}
  .feat-cell{display:table-cell;padding:16px 12px;text-align:center;border:1px solid #eee;vertical-align:top;}
  .feat-icon{font-size:22px;margin-bottom:8px;}
  .feat-name{font-size:12px;font-weight:700;color:#0a0a0a;margin-bottom:4px;}
  .feat-desc{font-size:11px;color:#888;line-height:1.5;}
  .offer-strip{background:#f9f6ee;border-top:2px solid #D4A017;border-bottom:2px solid #D4A017;padding:24px 36px;margin:0;}
  .offer-strip h2{font-size:18px;font-weight:700;color:#0a0a0a;margin-bottom:6px;}
  .offer-strip p{font-size:13px;color:#666;line-height:1.65;}
  .brands{padding:28px 36px;text-align:center;background:#fff;}
  .brands-label{font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#999;margin-bottom:14px;}
  .brand-pills{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;}
  .brand-pill{background:#f5f3ed;border:1px solid #e0ded8;font-size:11px;font-weight:600;color:#444;padding:5px 14px;}
  .cta{background:#D4A017;padding:36px;text-align:center;}
  .cta h2{color:#0a0a0a;font-size:22px;font-weight:700;margin-bottom:8px;}
  .cta p{color:rgba(10,10,10,0.65);font-size:13px;margin-bottom:20px;line-height:1.6;}
  .btn-dark{display:inline-block;background:#0a0a0a;color:#fff;font-size:13px;font-weight:700;text-decoration:none;padding:13px 28px;text-transform:uppercase;}
  .ftr{background:#0a0a0a;padding:24px 36px;text-align:center;}
  .ftr-links{margin-bottom:12px;}
  .ftr-links a{font-size:11px;color:#666;text-decoration:none;margin:0 8px;}
  .ftr-addr{font-size:10px;color:#555;line-height:1.8;margin-bottom:10px;}
  .ftr-unsub{font-size:10px;color:#444;}
  .ftr-unsub a{color:#D4A017;text-decoration:none;}
</style>
</head>
<body>
<div class="wrap">
  <div class="top-bar"><p>🔔 Limited Time Offer — Contact Us Today</p></div>
  <div class="hdr">
    <div class="logo">Global Technologies<span>Est. India</span></div>
  </div>
  <div class="hero">
    <div class="badge">Exclusive Offer</div>
    <h1>Premium Parts.<br/><strong>Unbeatable Prices.</strong></h1>
    <p class="hero-sub">Genuine elevator components from India's most trusted distributor — now with faster delivery across 50+ cities.</p>
    <p class="hero-valid">Valid for a limited period only</p>
    <a href="https://www.globaltechnologiesindia.com/contact" class="btn-gold">Claim Your Quote Now</a>
  </div>
  <div class="features">
    <div class="feat-title">Why Choose Us</div>
    <table class="feat-grid" cellpadding="0" cellspacing="0">
      <tr>
        <td class="feat-cell">
          <div class="feat-icon">✅</div>
          <div class="feat-name">100% Genuine</div>
          <div class="feat-desc">Certified authentic parts from authorized brands</div>
        </td>
        <td class="feat-cell">
          <div class="feat-icon">🚚</div>
          <div class="feat-name">Pan-India Delivery</div>
          <div class="feat-desc">Fast dispatch to 50+ cities across India</div>
        </td>
        <td class="feat-cell">
          <div class="feat-icon">🔧</div>
          <div class="feat-name">Tech Support</div>
          <div class="feat-desc">Dedicated support from our expert team</div>
        </td>
      </tr>
    </table>
  </div>
  <div class="offer-strip">
    <h2>Bulk Orders Welcome</h2>
    <p>We work with OEMs, builders, and elevator service companies. Share your bulk requirement and get a competitive quote within 24 hours.</p>
  </div>
  <div class="brands">
    <div class="brands-label">Authorized Distributor For</div>
    <div class="brand-pills">
      <span class="brand-pill">ARKEL</span>
      <span class="brand-pill">APSON MOTOR</span>
      <span class="brand-pill">SHARP ENGINEERS</span>
      <span class="brand-pill">NBSL</span>
      <span class="brand-pill">MARAZZI</span>
    </div>
  </div>
  <div class="cta">
    <h2>Ready to Order?</h2>
    <p>Call us or submit your requirement online — our team responds within 24 hours.</p>
    <a href="https://www.globaltechnologiesindia.com/contact" class="btn-dark">Submit Requirement</a>
  </div>
  <div class="ftr">
    <div class="ftr-links">
      <a href="https://www.globaltechnologiesindia.com/">Home</a>
      <a href="https://www.globaltechnologiesindia.com/products">Products</a>
      <a href="https://www.globaltechnologiesindia.com/contact">Contact</a>
    </div>
    <div class="ftr-addr">Global Technologies | support@globaltechnologiesindia.com | +91 72900 79120</div>
    <div class="ftr-unsub">You're receiving this because you subscribed at globaltechnologiesindia.com.<br/><a href="https://www.globaltechnologiesindia.com/unsubscribe">Unsubscribe</a> | <a href="https://www.globaltechnologiesindia.com/privacy-policy">Privacy Policy</a></div>
  </div>
</div>
</body>
</html>`,
  },
];

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
export default function SendEmailPage() {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const [attachments, setAttachments] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState(false);

  const [selectedTemplate, setSelectedTemplate] = useState("none");
  const [showTemplates, setShowTemplates] = useState(false);

  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [showDrafts, setShowDrafts] = useState(false);

  const [sendProgress, setSendProgress] = useState<SendProgress>({
    total: 0,
    sent: 0,
    failed: 0,
    current: "",
    status: "idle",
  });

  const dropdownRef = useRef<HTMLDivElement>(null);
  const { showModal } = useModal();

  /* ── Fetch Subscribers ── */
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URI}/api/newsletter/all`,
        );
        const data = await res.json();
        const activeUsers =
          data.data?.filter((u: any) => u.status === "active") || [];
        setSubscribers(activeUsers);
      } catch {
        showModal("error", "Error", "Failed to load subscribers");
      }
    };
    fetchSubscribers();
  }, []);

  /* ── Close dropdown outside click ── */
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setOpenDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ─────────────────────────────────────────
     File Handling
  ───────────────────────────────────────── */
  const addFiles = (files: FileList) => {
    let totalSize = attachments.reduce((acc, f) => acc + f.file.size, 0);
    const newFiles: UploadFile[] = [];
    Array.from(files).forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        showModal("error", "File Too Large", `${file.name} exceeds 10MB`);
        return;
      }
      totalSize += file.size;
      if (totalSize > MAX_TOTAL_SIZE) {
        showModal("error", "Total Size Exceeded", "Max total 15MB allowed");
        return;
      }
      const preview =
        file.type.startsWith("image/") || file.type === "application/pdf"
          ? URL.createObjectURL(file)
          : undefined;
      newFiles.push({ file, progress: 0, preview });
    });
    setAttachments((prev) => [...prev, ...newFiles]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
  };

  const getFileIcon = (file: File) => {
    if (file.type.includes("pdf")) return "📄";
    if (file.type.includes("word")) return "📝";
    if (file.type.includes("excel")) return "📊";
    if (file.type.includes("zip")) return "🗜️";
    if (file.type.startsWith("image/")) return "🖼️";
    return "📎";
  };

  const removeAttachment = (index: number) =>
    setAttachments((prev) => prev.filter((_, i) => i !== index));

  /* ─────────────────────────────────────────
     Template Selection
  ───────────────────────────────────────── */
  const applyTemplate = (templateId: string) => {
    const tpl = TEMPLATES.find((t) => t.id === templateId);
    if (!tpl) return;
    setSelectedTemplate(templateId);
    if (tpl.html) setContent(tpl.html);
    else setContent("");
    setShowTemplates(false);
  };

  /* ─────────────────────────────────────────
     Draft Management (session only)
  ───────────────────────────────────────── */
  const saveDraft = () => {
    if (!subject && !content) {
      showModal(
        "error",
        "Empty Draft",
        "Nothing to save — add a subject or content first.",
      );
      return;
    }
    const draft: Draft = {
      id: Date.now().toString(),
      subject,
      content,
      selectedEmails,
      savedAt: new Date().toLocaleTimeString(),
    };
    setDrafts((prev) => [draft, ...prev]);
    showModal(
      "success",
      "Draft Saved",
      `Draft "${subject || "Untitled"}" saved for this session.`,
    );
  };

  const loadDraft = (draft: Draft) => {
    setSubject(draft.subject);
    setContent(draft.content);
    setSelectedEmails(draft.selectedEmails);
    setShowDrafts(false);
  };

  const deleteDraft = (id: string) =>
    setDrafts((prev) => prev.filter((d) => d.id !== id));

  /* ─────────────────────────────────────────
     Subscriber Selection
  ───────────────────────────────────────── */
  const toggleEmail = (email: string) =>
    setSelectedEmails((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email],
    );

  const selectAll = () => setSelectedEmails(subscribers.map((u) => u.email));
  const clearSelection = () => setSelectedEmails([]);

  /* ─────────────────────────────────────────
     Send Email with Live Progress
  ───────────────────────────────────────── */
  const sendBulkEmail = async (e: any) => {
    e.preventDefault();

    if (selectedEmails.length === 0) {
      return showModal(
        "error",
        "No Recipients",
        "Please select at least one email.",
      );
    }

    setLoading(true);
    setSendProgress({
      total: selectedEmails.length,
      sent: 0,
      failed: 0,
      current: "",
      status: "running",
    });

    try {
      /* ── Build FormData ── */
      const formData = new FormData();
      formData.append("subject", subject);
      formData.append("content", content);
      formData.append("emails", JSON.stringify(selectedEmails));
      attachments.forEach((item) => formData.append("attachments", item.file));

      /* ── XHR with upload progress for attachment tracking ── */
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(
          "POST",
          `${process.env.NEXT_PUBLIC_BASE_URI}/api/newsletter/send`,
        );

        /* Simulate per-email progress via upload progress events */
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const uploadPercent = event.loaded / event.total;
            const estimatedSent = Math.floor(
              uploadPercent * selectedEmails.length,
            );
            const currentEmail =
              selectedEmails[
                Math.min(estimatedSent, selectedEmails.length - 1)
              ] || "";

            setSendProgress((prev) => ({
              ...prev,
              sent: estimatedSent,
              current: currentEmail,
            }));

            setAttachments((prev) =>
              prev.map((f) => ({
                ...f,
                progress: Math.round(uploadPercent * 100),
              })),
            );
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            setSendProgress((prev) => ({
              ...prev,
              sent: selectedEmails.length,
              current: "",
              status: "done",
            }));
            resolve();
          } else {
            setSendProgress((prev) => ({ ...prev, status: "error" }));
            reject(new Error("Server error: " + xhr.statusText));
          }
        };

        xhr.onerror = () => {
          setSendProgress((prev) => ({ ...prev, status: "error" }));
          reject(new Error("Network error"));
        };

        xhr.send(formData);
      });

      showModal(
        "success",
        "Email Sent",
        `Newsletter sent to ${selectedEmails.length} subscribers.`,
      );
      setSubject("");
      setContent("");
      setAttachments([]);
      setSelectedEmails([]);
      setSelectedTemplate("none");
      setTimeout(
        () =>
          setSendProgress({
            total: 0,
            sent: 0,
            failed: 0,
            current: "",
            status: "idle",
          }),
        3000,
      );
    } catch (err: any) {
      showModal("error", "Failed", err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ─────────────────────────────────────────
     Derived
  ───────────────────────────────────────── */
  const progressPercent =
    sendProgress.total > 0
      ? Math.round((sendProgress.sent / sendProgress.total) * 100)
      : 0;

  const activeTemplate = TEMPLATES.find((t) => t.id === selectedTemplate);

  /* ─────────────────────────────────────────
     Render
  ───────────────────────────────────────── */
  return (
    <div className="p-10 max-w-5xl mx-auto space-y-8 text-white">
      {/* ── Page Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Send Newsletter</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Compose and send bulk emails to active subscribers
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Drafts Button */}
          <button
            type="button"
            onClick={() => setShowDrafts(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-700 text-sm text-neutral-300 hover:border-amber-400 hover:text-amber-400 transition cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 2h8l2 2v8H2V2z"
                stroke="currentColor"
                strokeWidth="1.2"
                fill="none"
              />
              <path d="M9 2v3H5V2" stroke="currentColor" strokeWidth="1.2" />
              <line
                x1="4"
                y1="8"
                x2="10"
                y2="8"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <line
                x1="4"
                y1="10.5"
                x2="8"
                y2="10.5"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
            Drafts
            {drafts.length > 0 && (
              <span className="bg-amber-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center leading-none">
                {drafts.length}
              </span>
            )}
          </button>

          {/* Save Draft Button */}
          <button
            type="button"
            onClick={saveDraft}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-700 text-sm text-neutral-300 hover:border-amber-400 hover:text-amber-400 transition cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 2h8l2 2v8H2V2z"
                stroke="currentColor"
                strokeWidth="1.2"
                fill="none"
              />
              <circle
                cx="7"
                cy="8"
                r="1.5"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
            Save Draft
          </button>
        </div>
      </div>

      {/* ── Template Picker ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-neutral-300">
            Email Template
          </label>
          {selectedTemplate !== "none" && (
            <button
              type="button"
              onClick={() => applyTemplate("none")}
              className="text-xs text-neutral-500 hover:text-red-400 transition cursor-pointer"
            >
              Clear template
            </button>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3">
          {TEMPLATES.map((tpl) => (
            <button
              key={tpl.id}
              type="button"
              onClick={() => applyTemplate(tpl.id)}
              className={`flex flex-col gap-3 p-4 rounded-xl border text-left transition cursor-pointer ${
                selectedTemplate === tpl.id
                  ? "border-amber-400 bg-amber-400/5"
                  : "border-neutral-700 bg-[#111111] hover:border-neutral-500"
              }`}
            >
              <div className="flex items-center justify-between">
                {tpl.icon}
                {selectedTemplate === tpl.id && (
                  <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">
                    Active
                  </span>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{tpl.label}</p>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {tpl.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Subscriber Dropdown ── */}
      <div className="relative" ref={dropdownRef}>
        <label className="block mb-2 text-sm font-medium text-neutral-300">
          Select Active Subscribers
        </label>

        <div
          onClick={() => setOpenDropdown(!openDropdown)}
          className="border border-neutral-700 bg-[#111111] p-4 rounded-xl cursor-pointer flex items-center justify-between hover:border-neutral-500 transition"
        >
          <span
            className={
              selectedEmails.length === 0 ? "text-neutral-500" : "text-white"
            }
          >
            {selectedEmails.length === 0
              ? "Select subscribers..."
              : `${selectedEmails.length} of ${subscribers.length} selected`}
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className={`transition-transform ${openDropdown ? "rotate-180" : ""}`}
          >
            <path
              d="M4 6l4 4 4-4"
              stroke="#888"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {openDropdown && (
          <div className="absolute z-50 mt-2 w-full bg-[#111111] border border-neutral-700 rounded-xl shadow-2xl max-h-64 overflow-y-auto p-4 space-y-2">
            <div className="flex justify-between mb-3 pb-3 border-b border-neutral-800">
              <button
                type="button"
                onClick={selectAll}
                className="text-sm text-green-400 hover:text-green-300 transition cursor-pointer font-medium"
              >
                Select All ({subscribers.length})
              </button>
              <button
                type="button"
                onClick={clearSelection}
                className="text-sm text-red-400 hover:text-red-300 transition cursor-pointer font-medium"
              >
                Clear
              </button>
            </div>
            {subscribers.length === 0 ? (
              <p className="text-sm text-neutral-500 text-center py-4">
                No active subscribers found
              </p>
            ) : (
              subscribers.map((user) => (
                <label
                  key={user._id}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={selectedEmails.includes(user.email)}
                    onChange={() => toggleEmail(user.email)}
                    className="accent-amber-400"
                  />
                  <span className="text-sm text-neutral-300 group-hover:text-white transition">
                    {user.email}
                  </span>
                </label>
              ))
            )}
          </div>
        )}
      </div>

      {/* ── Form ── */}
      <form onSubmit={sendBulkEmail} className="space-y-5">
        {/* Subject */}
        <div>
          <label className="block mb-2 text-sm font-medium text-neutral-300">
            Subject Line
          </label>
          <input
            type="text"
            placeholder="e.g. New Arrivals — Premium Elevator Components"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-4 border border-neutral-700 bg-[#111111] rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 transition"
            required
          />
        </div>

        {/* Content Editor */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-neutral-300">
              Email Content{" "}
              {selectedTemplate !== "none" && (
                <span className="text-amber-400 text-xs ml-2">
                  ({activeTemplate?.label} template applied — edit as needed)
                </span>
              )}
            </label>
            {content && (
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="text-xs text-neutral-400 hover:text-amber-400 transition cursor-pointer flex items-center gap-1"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle
                    cx="6"
                    cy="6"
                    r="4.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <circle cx="6" cy="6" r="1.5" fill="currentColor" />
                </svg>
                Preview
              </button>
            )}
          </div>
          <textarea
            placeholder={
              selectedTemplate === "none"
                ? "Paste your HTML email content here, or pick a template above..."
                : "Template loaded — edit the HTML below to customise..."
            }
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            className="w-full p-4 border border-neutral-700 bg-[#111111] rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 transition font-mono text-xs leading-relaxed"
            required
          />
          <p className="text-xs text-neutral-600 mt-1.5">
            {content.length.toLocaleString()} characters
          </p>
        </div>

        {/* Drag & Drop */}
        <div>
          <label className="block mb-2 text-sm font-medium text-neutral-300">
            Attachments (optional)
          </label>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-neutral-700 rounded-xl p-6 text-center bg-[#111111] hover:border-amber-400 transition cursor-pointer"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="mx-auto mb-2 text-neutral-600"
            >
              <path
                d="M12 3v12M8 7l4-4 4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M5 17v2a2 2 0 002 2h10a2 2 0 002-2v-2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <p className="text-sm text-neutral-500">
              Drag & drop files here or{" "}
              <label className="text-amber-400 cursor-pointer underline hover:text-amber-300">
                browse
                <input
                  type="file"
                  multiple
                  hidden
                  onChange={(e) => {
                    if (e.target.files) addFiles(e.target.files);
                  }}
                />
              </label>
            </p>
            <p className="text-xs text-neutral-600 mt-1">
              Max 10MB per file · 15MB total
            </p>
          </div>
        </div>

        {/* File List */}
        {attachments.length > 0 && (
          <div className="space-y-3">
            {attachments.map((item, index) => (
              <div
                key={index}
                className="bg-[#111111] border border-neutral-800 p-4 rounded-xl"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    {item.file.type.startsWith("image/") && item.preview && (
                      <img
                        src={item.preview}
                        className="w-12 h-12 object-cover rounded-lg"
                        alt=""
                      />
                    )}
                    {item.file.type === "application/pdf" && item.preview && (
                      <iframe
                        src={item.preview}
                        className="w-14 h-14 rounded border border-neutral-700"
                        title="pdf preview"
                      />
                    )}
                    <div>
                      <p className="text-sm font-medium">
                        {getFileIcon(item.file)} {item.file.name}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {(item.file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAttachment(index)}
                    className="text-xs text-red-500 hover:text-red-400 transition cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
                {item.progress > 0 && (
                  <div className="mt-3 w-full bg-neutral-800 rounded-full h-1.5">
                    <div
                      className="bg-amber-400 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── Send Progress ── */}
        {sendProgress.status !== "idle" && (
          <div className="border border-neutral-700 bg-[#0d0d0d] rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {sendProgress.status === "running" && (
                  <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
                )}
                {sendProgress.status === "done" && (
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                )}
                {sendProgress.status === "error" && (
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                )}
                <span className="text-sm font-medium text-white">
                  {sendProgress.status === "running" && "Sending emails..."}
                  {sendProgress.status === "done" && "All emails sent!"}
                  {sendProgress.status === "error" && "Sending failed"}
                </span>
              </div>
              <span className="text-sm font-bold text-amber-400">
                {progressPercent}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-neutral-800 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  sendProgress.status === "done"
                    ? "bg-green-400"
                    : sendProgress.status === "error"
                      ? "bg-red-400"
                      : "bg-amber-400"
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-6 text-xs text-neutral-400">
              <span>
                <span className="text-white font-semibold">
                  {sendProgress.sent}
                </span>{" "}
                sent
              </span>
              <span>
                <span className="text-white font-semibold">
                  {sendProgress.total}
                </span>{" "}
                total
              </span>
              {sendProgress.failed > 0 && (
                <span>
                  <span className="text-red-400 font-semibold">
                    {sendProgress.failed}
                  </span>{" "}
                  failed
                </span>
              )}
              {sendProgress.current && sendProgress.status === "running" && (
                <span className="text-neutral-500 truncate max-w-xs">
                  → {sendProgress.current}
                </span>
              )}
            </div>
          </div>
        )}

        {/* ── Action Buttons ── */}
        <div className="flex items-center gap-3 pt-2">
          <button
            disabled={loading}
            type="submit"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 text-black font-semibold hover:bg-amber-300 transition disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="animate-spin"
                >
                  <circle
                    cx="7"
                    cy="7"
                    r="5.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="8 8"
                  />
                </svg>
                Sending...
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 1l12 6-12 6V8.5l8-1.5-8-1.5V1z"
                    fill="currentColor"
                  />
                </svg>
                Send to {selectedEmails.length} Selected
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setShowPreview(true)}
            disabled={!content}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-neutral-600 text-sm hover:border-amber-400 hover:text-amber-400 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle
                cx="7"
                cy="7"
                r="5.5"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <circle cx="7" cy="7" r="2" fill="currentColor" />
            </svg>
            Preview Email
          </button>

          <button
            type="button"
            onClick={saveDraft}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-neutral-600 text-sm hover:border-amber-400 hover:text-amber-400 transition cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 2h8l2 2v8H2V2z"
                stroke="currentColor"
                strokeWidth="1.2"
                fill="none"
              />
              <circle
                cx="7"
                cy="8.5"
                r="1.5"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
            Save Draft
          </button>
        </div>
      </form>

      {/* ═══════════════════════════════════════
          PREVIEW MODAL
      ═══════════════════════════════════════ */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6 backdrop-blur-sm">
          <div className="bg-white text-black rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                  Preview
                </p>
                <h2 className="text-base font-bold text-gray-900">
                  {subject || "(No subject)"}
                </h2>
              </div>
              <button
                onClick={() => setShowPreview(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M1 1l10 10M11 1L1 11"
                    stroke="#333"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto flex-1">
              <iframe
                srcDoc={content}
                className="w-full h-full"
                style={{ minHeight: "600px", border: "none" }}
                title="Email Preview"
              />
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════
          DRAFTS PANEL
      ═══════════════════════════════════════ */}
      {showDrafts && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6 backdrop-blur-sm">
          <div className="bg-[#111111] border border-neutral-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
              <div>
                <h2 className="text-base font-bold text-white">Saved Drafts</h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Session only — cleared on page refresh
                </p>
              </div>
              <button
                onClick={() => setShowDrafts(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-neutral-800 hover:bg-neutral-700 transition cursor-pointer"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M1 1l10 10M11 1L1 11"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="p-4 max-h-96 overflow-y-auto">
              {drafts.length === 0 ? (
                <div className="text-center py-12">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    className="mx-auto mb-3 text-neutral-700"
                  >
                    <rect
                      x="8"
                      y="8"
                      width="24"
                      height="24"
                      rx="3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />
                    <line
                      x1="20"
                      y1="14"
                      x2="20"
                      y2="26"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <line
                      x1="14"
                      y1="20"
                      x2="26"
                      y2="20"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <p className="text-sm text-neutral-500">
                    No drafts saved yet
                  </p>
                  <p className="text-xs text-neutral-600 mt-1">
                    Click "Save Draft" while composing to save here
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {drafts.map((draft) => (
                    <div
                      key={draft.id}
                      className="bg-[#0d0d0d] border border-neutral-800 rounded-xl p-4 hover:border-neutral-600 transition group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-white truncate">
                            {draft.subject || "Untitled Draft"}
                          </p>
                          <p className="text-xs text-neutral-500 mt-0.5">
                            {draft.selectedEmails.length} recipients · Saved at{" "}
                            {draft.savedAt}
                          </p>
                          <p className="text-xs text-neutral-600 mt-1 truncate">
                            {draft.content
                              .substring(0, 80)
                              .replace(/<[^>]+>/g, "")}
                            ...
                          </p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => loadDraft(draft)}
                            className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition cursor-pointer px-3 py-1.5 rounded-lg border border-amber-400/30 hover:border-amber-400/60"
                          >
                            Load
                          </button>
                          <button
                            onClick={() => deleteDraft(draft.id)}
                            className="text-xs text-red-500 hover:text-red-400 transition cursor-pointer px-3 py-1.5 rounded-lg border border-red-500/30 hover:border-red-500/60"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
