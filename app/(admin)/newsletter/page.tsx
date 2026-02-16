"use client";

import { useEffect, useState } from "react";
import { useModal } from "@/app/Context/ModalContext";
import SubscriberTable from "../../components/admin/SubscriberTable";
import NewsletterStats from "../../components/admin/NewsletterStats";

export default function NewsletterAdmin() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { showModal } = useModal();

  const fetchSubscribers = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URI}/api/newsletter/all`,
      );

      const data = await res.json();
      setSubscribers(data.data || []);
    } catch (err: any) {
      showModal("error", "Failed", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Newsletter Management</h1>

      <NewsletterStats subscribers={subscribers} />

      {loading ? (
        <p>Loading subscribers...</p>
      ) : (
        <SubscriberTable subscribers={subscribers} />
      )}
    </div>
  );
}
