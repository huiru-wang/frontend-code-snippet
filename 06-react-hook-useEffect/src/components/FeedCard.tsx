// src/components/FeedCard.tsx
import React from 'react';
import { FeedItem } from '../lib/types';

interface FeedCardProps {
    feedItem: FeedItem;
}

export const FeedCard: React.FC<FeedCardProps> = ({ feedItem }) => {
    return (
        <div className="text-3xl border-4 border-black p-4s mb-12">
            <p>{feedItem.content}</p>
        </div>
    );
};