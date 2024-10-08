"use client";

import React, { ChangeEvent, useState } from "react";
import SearchBar from "./SearchBar";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Tooggler from "./Tooggler";
import { useRouter, useSearchParams } from "next/navigation";

const FilterAndSearch = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [queries, setQueries] = useState({
    category: "",
    sort: "",
  });
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSelectValue = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    const params = new URLSearchParams(searchParams);
    //for category select
    if (name === "category") {
      if (value) {
        setQueries((prev) => ({ ...prev, category: value }));
        params.set("category", value);
      } else {
        setQueries((prev) => ({ ...prev, category: "" }));
        params.delete("category");
      }
    }
    //for sort select
    else if (name === "sort") {
      if (value) {
        setQueries((prev) => ({ ...prev, sort: value }));
        params.set("sort", value);
      } else {
        setQueries((prev) => ({ ...prev, sort: "" }));
        params.delete("sort");
      }
    }

    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  const handleSetInStock = (value: boolean | string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("inStock", String(value));
    } else {
      params.delete("inStock");
    }
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  return (
    <div>
      <div className="flex items-center">
        <SearchBar inputPlaceholder="Search with title" />
        {/* filter icon */}
        <div
          onClick={() => setShowFilters((p) => !p)}
          className="px-2 cursor-pointer"
        >
          <AdjustmentsHorizontalIcon className="w-5 h-5" />
        </div>
      </div>
      <div
        className={clsx(
          `mt-2 overflow-y-hidden overflow-x-auto h-0 flex flex-nowrap items-center gap-3 transition-all duration-500 `,
          { "h-10": !showFilters }
        )}
      >
        <select
          name="category"
          id=""
          className="border rounded-xl py-1 px-3 focus:outline-none appearance-none cursor-pointer"
          defaultValue={searchParams.get("category")?.toString()}
          onChange={handleSelectValue}
        >
          <option value="">Category</option>
          <option value="table">Table</option>
          <option value="chair">Chair</option>
          <option value="sofa">Sofa</option>
          <option value="lights">Lights</option>
        </select>
        <select
          name="sort"
          id=""
          className="border rounded-xl py-1 px-3 focus:outline-none appearance-none cursor-pointer "
          defaultValue={searchParams.get("sort")?.toString()}
          onChange={handleSelectValue}
        >
          <option value="">Sort by</option>
          <option value="title">Alphabetical order</option>
          <option value="price">Price</option>
          <option value="createdAt">Date created</option>
        </select>

        <div className="flex gap-2 items-center border rounded-xl py-1 px-3 cursor-pointer">
          <h4 className="shrink-0">In stock only</h4>
          <Tooggler onToggle={handleSetInStock} />
        </div>
      </div>
    </div>
  );
};

export default FilterAndSearch;
