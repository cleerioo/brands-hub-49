import Image from "next/image";

interface Props {
    id: string;
    amount: number;
    amountShipping: number;
    items: any[];
    timestamp: number;
    images: string[];
    status?: string;
    trackingId?: string;
    courierName?: string;
    shippingAddress?: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
    };
}

function Order({ id, amount, amountShipping, items, timestamp, images, shippingAddress, status, trackingId, courierName }: Props) {
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
                    <p className="font-bold text-xs">STATUS</p>
                    <p className={`text-sm font-semibold uppercase ${status === 'paid' ? 'text-green-600' : status === 'shipped' ? 'text-blue-600' : 'text-orange-500'}`}>
                        {status}
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
                {/* Tracking Info */}
                {(trackingId || courierName) && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-md">
                        <p className="text-sm font-bold text-gray-700">Tracking Information</p>
                        <div className="flex flex-col sm:flex-row sm:space-x-4 text-sm text-gray-600 mt-1">
                            {courierName && <p>Courier: <span className="font-semibold text-gray-900">{courierName}</span></p>}
                            {trackingId && <p>Tracking ID: <span className="font-semibold text-gray-900">{trackingId}</span></p>}
                        </div>
                    </div>
                )}

                <div className="flex space-x-6 overflow-x-auto">
                    {images.map((image, i) => (
                        <div key={i} className="relative h-20 w-20 sm:h-32 sm:w-32 flex-shrink-0">
                            <Image src={image} height={200} width={200} alt="" className="object-contain h-full w-full" />
                        </div>
                    ))}
                </div>

                <div className="mt-4 flex justify-end">
                    <button
                        onClick={() => window.open(`/invoice/${id}`, '_blank')}
                        className="text-xs sm:text-sm text-blue-500 hover:text-blue-700 font-medium hover:underline flex items-center"
                    >
                        Download Invoice
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Order;
