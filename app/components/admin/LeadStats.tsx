interface Props {
  lead: any[];
}

export default function Leads({ lead }: Props) {
  const verified = lead.filter((s) => s.isVerified === true).length;
  const unverified = lead.filter((s) => s.isVerified === false).length;

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="p-6 bg-white rounded-xl shadow text-amber-600">
        <p className="text-sm">Total Leads</p>
        <h2 className="text-2xl font-bold">{lead.length}</h2>
      </div>

      <div className="p-6 bg-green-100 rounded-xl text-black">
        <p className="text-sm">Verified leads</p>
        <h2 className="text-2xl font-bold">{verified}</h2>
      </div>

      <div className="p-6 bg-red-100 rounded-xl text-indigo-700">
        <p className="text-sm">Unverified Leads</p>
        <h2 className="text-2xl font-bold">{unverified}</h2>
      </div>
    </div>
  );
}
