import { Product } from "@prisma/client";
import Link from "next/link";

interface ProductsProps {
    products: Product[]
}

const Products = ({products}: ProductsProps) => {
    return ( 
        <div className="space-y-3">
            {products.map(product => (
                <Link href="/" className="flex items-center justify-between gap-10 py3">
                </Link>
            ))}
        </div>
    );
}
 
export default Products;