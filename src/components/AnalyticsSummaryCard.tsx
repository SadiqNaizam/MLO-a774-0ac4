import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react'; // Type for icon components

interface AnalyticsSummaryCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon; // Optional icon component from lucide-react
  iconBgColor?: string; // Tailwind CSS background color class for icon container
}

const AnalyticsSummaryCard: React.FC<AnalyticsSummaryCardProps> = ({
  title,
  value,
  description,
  icon: IconComponent,
  iconBgColor = 'bg-green-100',
}) => {
  console.log("Rendering AnalyticsSummaryCard:", title);
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {IconComponent && (
          <div className={`p-2 rounded-md ${iconBgColor}`}>
            <IconComponent className="h-5 w-5 text-green-600" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </CardContent>
    </Card>
  );
};

export default AnalyticsSummaryCard;