import Product from "./Product";

interface Props {
    products: Product[];
}

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
    countInStock?: number;
}

function ProductFeed({ products }: Props) {
    return (
        <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto pb-10">
            {/* First 4 products overlap banner */}
            {products.slice(0, 4).map(({ id, title, price, description, category, image, rating, countInStock }) => (
                <Product
                    key={id}
                    id={id}
                    title={title}
                    price={price}
                    description={description}
                    category={category}
                    image={image}
                    rating={rating.rate}
                    ratingCount={rating.count}
                    countInStock={countInStock}
                />
            ))}

            {/* Remaining products - No Ad Space now */}
            {products.slice(4, products.length).map(({ id, title, price, description, category, image, rating, countInStock }) => (
                <Product
                    key={id}
                    id={id}
                    title={title}
                    price={price}
                    description={description}
                    category={category}
                    image={image}
                    rating={rating.rate}
                    ratingCount={rating.count}
                    countInStock={countInStock}
                />
            ))}
        </div>
    );
}

export default ProductFeed;
