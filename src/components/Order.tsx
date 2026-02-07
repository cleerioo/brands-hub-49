import Image from "next/image";

interface Props {
    id: string;
    amount: number;
    amountShipping: number;
    items: any[];
    timestamp: number;
    images: string[];
    shippingAddress?: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
    };
}

function Order({ id, amount, amountShipping, items, timestamp, images, shippingAddress }: Props) {
    return (
        <div className="relative border rounded-md">
            <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
                <div>
                    <p className="font-bold text-xs">ORDER PLACED</p>
                    <p>{new Date(timestamp).toDateString()}</p>
                    {shippingAddress && (
                        <p className="text-xs text-gray-500 mt-1">Shipped to: {shippingAddress.fullName}</p>
                    )}
                </div>

                <div>
                    <p className="text-xs font-bold">TOTAL</p>
                    <p>
                        {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                        }).format(amount)} - Next Day Delivery{" "}
                        {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                        }).format(amountShipping)}
                    </p>
                </div>

                <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
                    {items.length} items
                </p>

                <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">
                    ORDER # {id}
                </p>
            </div>

            <div className="p-5 sm:p-10">
                <div className="flex space-x-6 overflow-x-auto">
                    {images.map((image, i) => (
                        <div key={i} className="relative h-20 w-20 sm:h-32 sm:w-32 flex-shrink-0">
                            <Image src={image} height={200} width={200} alt="" className="object-contain h-full w-full" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Order;
