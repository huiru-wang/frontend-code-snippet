'use client'
import { products } from "@/lib/data"
import Image from "next/image"
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'

export default function Page({ params,
}: {
    params: Promise<{ id: string }>
}) {

    const [product, setProduct] = useState<any>(null); // 使用状态存储产品

    const router = useRouter();

    useEffect(() => {
        params.then(({ id }) => {
            const foundProduct = products.find(item => item.id === id);
            setProduct(foundProduct); // 设置找到的产品
        });
    }, [params]);

    if (!product) return <div>产品未找到</div>;

    return (
        <div
            className="flex justify-center items-center fixed inset-0 bg-gray-500[.8]"
            onClick={router.back}
        >
            <Image
                src={product.imageSrc}
                alt={product.imageAlt}
                height={400} width={400}
                className="rounded-lg"
                onClick={(e) => e.stopPropagation()}
            />
        </div>
    )
}