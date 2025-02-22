"use client"

import { Prisma } from "@prisma/client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface RestaurantCategoriesProps {
    restaurant: Prisma.RestaurantGetPayload<{
        include: {
            menuCategories: true;
            } ;   
        }>;
    }   

type MenuCategoryWithProducts = Prisma.MenuCategoryGetPayload<{
    include: { produts: true; };
}>;

const RestaurantCatagories = ({restaurant}: RestaurantCategoriesProps) => {
        const [selectedCategory, setSelectedCategory] = useState<MenuCategoryWithProducts>(restaurant.menuCategories[0]);

        
       
        const handleCategoryclick = (category: MenuCategoryWithProducts) => {
            setSelectedCategory(category);
        }
        const getCategoryButtonVariant = (category: MenuCategoryWithProducts) => {
            return selectedCategory.id === category.id ? "default" : "secondary"
        }
    return ( 
        <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl border bg-white">
            <div className="p-5">
            <div className="flex items-center gap-3 ">
                <Image src={"/logo.jpg"} alt={restaurant.name} height={45} width={45}/>
                <div>
                    <h2 className="font-semibold text-lg">{restaurant.name}</h2>
                    <p className="text-xs opacity-55">{restaurant.description}</p>
                </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-green-500 mt-3">
                    <ClockIcon size={12} />
                    <p>Aberto!</p>
                </div>
            </div>
                <ScrollArea className="w-full">
                    <div className="flex w-max space-x-4 p-4 pt-0">
                        {restaurant.menuCategories.map(category => (
                            
                            <Button onClick={() => handleCategoryclick(category)} key={category.id} variant={
                                getCategoryButtonVariant(category)
                            } size={"sm"} className="rounded-full">
                                {category.name}
                            </Button>
                        ))}
                    </div>

                    <ScrollBar orientation="horizontal" />

                </ScrollArea>
        </div>
     );
}
 
export default RestaurantCatagories;