interface Props {
  subscribers: any[];
}

export default function NewsletterStats({ subscribers }: Props) {
  const active = subscribers.filter((s) => s.status === "active").length;
  const inactive = subscribers.filter((s) => s.status === "inactive").length;

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="p-6 bg-white rounded-xl shadow text-amber-600">
        <p className="text-sm">Total Subscribers</p>
        <h2 className="text-2xl font-bold">{subscribers.length}</h2>
      </div>

      <div className="p-6 bg-green-100 rounded-xl text-black">
        <p className="text-sm">Active</p>
        <h2 className="text-2xl font-bold">{active}</h2>
      </div>

      <div className="p-6 bg-red-100 rounded-xl text-indigo-700">
        <p className="text-sm">Inactive</p>
        <h2 className="text-2xl font-bold">{inactive}</h2>
      </div>
    </div>
  );
}
