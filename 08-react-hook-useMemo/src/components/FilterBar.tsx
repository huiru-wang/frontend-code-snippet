import React from "react";

interface FilterBarProps {
    minPrice: number;
    maxPrice: number;
    keyword: string;
    onPriceChange: (min: number, max: number) => void;
    onSearchKeywordChange: (filter: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ minPrice, maxPrice, keyword, onPriceChange, onSearchKeywordChange }) => {
    return (
        <div className="filter-bar">
            <div className="filter-input">
                <h4>Min Price</h4>
                <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => onPriceChange(Number(e.target.value), maxPrice)}
                />
            </div>
            <div className="filter-input">
                <h4>Max Price</h4>
                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => onPriceChange(minPrice, Number(e.target.value))}
                />
            </div>
            <div className="filter-input">
                <h4>Search Keyword</h4>
                <input
                    type="text"
                    placeholder="Search Keyword"
                    value={keyword}
                    onChange={(e) => onSearchKeywordChange(e.target.value)}
                />
            </div>
        </div>
    )
};

export default React.memo(FilterBar);