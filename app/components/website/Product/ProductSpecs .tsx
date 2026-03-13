"use client";

interface Props {
  extraDetails: Record<string, string>;
}

export default function ProductSpecs({ extraDetails }: Props) {
  const entries = Object.entries(extraDetails);

  if (!entries.length) return null;

  return (
    <div>
      <p className="text-xs font-medium text-muted uppercase tracking-widest mb-4">
        Technical Specifications
      </p>

      <div
        className="grid gap-px bg-border rounded-xl overflow-hidden border border-border"
        style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
      >
        {entries.map(([key, value]) => (
          <div key={key} className="bg-card px-5 py-4">
            <p className="text-xs text-muted mb-1">{key}</p>
            <p className="text-sm font-medium">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
