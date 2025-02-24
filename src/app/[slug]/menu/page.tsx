import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import RestaurantHeader from "./components/header";
import RestaurantCatagories from "./components/categories";

interface RestaurantMenuPageProps {
    params: Promise<{slug: string}>;
    searchParams: Promise<{consumptionMethod: string}>;
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
    return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
}

const RestaurantMenuPage =async({params, searchParams}: RestaurantMenuPageProps) => {
    const {slug} = await params;
    const {consumptionMethod} = await searchParams;
    if (!isConsumptionMethodValid(consumptionMethod.toUpperCase())) {
        return notFound();
    }
    const restaurant = await db.restaurant.findUnique({ 
        where: { slug }, 
        include: {
            menuCategories: {
                include: {produts: true},        
        },
     }
    });
    if (!restaurant) {
        return notFound();
    }
    return (
     <div>
        <RestaurantHeader restaurant={restaurant} />
        <RestaurantCatagories restaurant={restaurant} />
    </div> );
}
 
export default RestaurantMenuPage;
