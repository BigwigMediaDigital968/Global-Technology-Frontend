interface Props {
  subscribers: any[];
}

export default function SubscriberTable({ subscribers }: Props) {
  return (
    <div className="rounded-xl shadow overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-amber-200/50 text-bg">
          <tr>
            <th className="p-4">Email</th>
            <th>Status</th>
            <th>Source</th>
            <th>Subscribed At</th>
          </tr>
        </thead>

        <tbody>
          {subscribers.map((user, i) => (
            <tr key={i} className="border-t">
              <td className="p-4">{user.email}</td>
              <td>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    user.status === "active"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td>{user.source}</td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
