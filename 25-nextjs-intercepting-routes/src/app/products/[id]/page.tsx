'use server'
import { products } from "@/lib/data"
import Image from "next/image"
import React from "react";

export default async function Product({
    params,
}: {
    params: Promise<{ id: string }>
}) {

    const id = (await params).id;
    const product = products.find(item => item.id === id)!

    return (
        <div className="container mx-auto pt-8 flex flex-col items-center">
            <Image
                src={product.imageSrc}
                alt={product.imageAlt}
                height={400} width={400}
                className="rounded-lg"
            />

            <div>
                <p>
                    Name: {product.name}
                </p>
                <p>
                    Price: {product.price}
                </p>
            </div>
        </div>
    )
}