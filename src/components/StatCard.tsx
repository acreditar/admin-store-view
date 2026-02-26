interface StatCardProps {
  label: string;
  value: string | number;
  description: string;
}

const StatCard = ({ label, value, description }: StatCardProps) => (
  <div className="bg-card rounded-lg border p-4">
    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
    <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
    <p className="mt-1 text-sm text-muted-foreground">{description}</p>
  </div>
);

export default StatCard;
