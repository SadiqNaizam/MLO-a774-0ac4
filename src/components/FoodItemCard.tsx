import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Edit3, Trash2, Utensils } from 'lucide-react'; // Example icons
import { format, differenceInDays, isPast } from 'date-fns'; // For date handling

export type ExpiryStatus = 'fresh' | 'nearing-expiry' | 'expired' | 'unknown';

interface FoodItemCardProps {
  id: string | number;
  name: string;
  quantity: number | string;
  purchaseDate?: Date | string;
  expiryDate?: Date | string;
  category?: string;
  imageUrl?: string; // Optional image URL
  notes?: string;
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
}

const getExpiryStatus = (expiryDate?: Date | string): ExpiryStatus => {
  if (!expiryDate) return 'unknown';
  const date = typeof expiryDate === 'string' ? new Date(expiryDate) : expiryDate;
  if (isPast(date)) return 'expired';
  const daysUntilExpiry = differenceInDays(date, new Date());
  if (daysUntilExpiry <= 3) return 'nearing-expiry'; // Example: 3 days or less
  return 'fresh';
};

const FoodItemCard: React.FC<FoodItemCardProps> = ({
  id,
  name,
  quantity,
  purchaseDate,
  expiryDate,
  category,
  imageUrl,
  notes,
  onEdit,
  onDelete,
}) => {
  console.log("Rendering FoodItemCard:", name, "ID:", id);

  const status = getExpiryStatus(expiryDate);
  let badgeVariant: "default" | "secondary" | "destructive" | "outline" = "default";
  let badgeText = "Fresh";

  switch (status) {
    case 'fresh':
      badgeVariant = 'default'; // Tailwind green-ish by default if not customized
      badgeText = 'Fresh';
      break;
    case 'nearing-expiry':
      badgeVariant = 'secondary'; // Tailwind yellow-ish
      badgeText = 'Nearing Expiry';
      break;
    case 'expired':
      badgeVariant = 'destructive'; // Tailwind red-ish
      badgeText = 'Expired';
      break;
    case 'unknown':
        badgeVariant = 'outline';
        badgeText = 'No Expiry';
        break;
  }

  const formattedPurchaseDate = purchaseDate ? format(new Date(purchaseDate), 'MMM dd, yyyy') : 'N/A';
  const formattedExpiryDate = expiryDate ? format(new Date(expiryDate), 'MMM dd, yyyy') : 'N/A';

  return (
    <Card className="w-full flex flex-col">
      {imageUrl ? (
        <div className="aspect-video w-full overflow-hidden rounded-t-lg">
          <img src={imageUrl} alt={name} className="object-cover w-full h-full" onError={(e) => (e.currentTarget.style.display = 'none')} />
        </div>
      ) : (
        <div className="aspect-video w-full bg-gray-100 flex items-center justify-center rounded-t-lg">
             <Utensils className="h-12 w-12 text-gray-300" />
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{name}</CardTitle>
            <Badge variant={badgeVariant}>{badgeText}</Badge>
        </div>
        {category && <CardDescription className="text-xs">{category}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-2 text-sm flex-grow">
        <p><strong>Quantity:</strong> {quantity}</p>
        <div className="flex items-center text-xs text-muted-foreground">
            <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
            Purchased: {formattedPurchaseDate}
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
            <CalendarDays className="mr-1.5 h-3.5 w-3.5 text-red-500" />
            Expires: {formattedExpiryDate}
        </div>
        {notes && <p className="text-xs italic mt-1 line-clamp-2">Notes: {notes}</p>}
      </CardContent>
      {(onEdit || onDelete) && (
        <CardFooter className="pt-2 border-t mt-auto">
          <div className="flex w-full justify-end space-x-2">
            {onEdit && (
              <Button variant="outline" size="sm" onClick={() => onEdit(id)}>
                <Edit3 className="mr-1 h-4 w-4" /> Edit
              </Button>
            )}
            {onDelete && (
              <Button variant="destructive" size="sm" onClick={() => onDelete(id)}>
                <Trash2 className="mr-1 h-4 w-4" /> Delete
              </Button>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default FoodItemCard;