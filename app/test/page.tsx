'use client';

import { useCallback, useMemo, useState, useRef, useEffect } from 'react';
import Test from '../component/Test';
import { Limelight } from 'next/font/google';

type Variant = 'elegant' | 'modern';

export interface ContentData {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
}

interface ProductsAPIResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const BASE_URL = 'https://dummyjson.com/products';
const LIMIT = 20;

function getUrl(url: string, skip: number) {
  const params = { skip: skip.toString(), limit: LIMIT.toString() };
  const searchParams = new URLSearchParams(params);

  return `${url}?${searchParams.toString()}`;
}

export default function TestPage() {
  const [data, setData] = useState<null | ProductsAPIResponse>(null);
  const [skip, setSkip] = useState(0);

  const totalPages = data ? Math.ceil(data.total / LIMIT) : null;

  async function getData() {
    try {
      const url = getUrl(BASE_URL, skip);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = (await response.json()) as ProductsAPIResponse;
      setData(data);
      console.log(data, 'response');
    } catch (e) {
      console.log('there has been an error', e);
    }
  }

  useEffect(() => {
    getData();
  }, [skip]);

  console.log(skip, 'SKEEP');

  const handleClick = (index: number) => {
    setSkip(index * LIMIT);
  };

  console.log(data?.products, 'data');
  return (
    <div className="text-black bg-white w-screen h-screen">
      PAGINATION
      <button onClick={getData}>fetch data</button>
      {data?.products.map((product, index) => {
        return (
          <div key={product.id}>
            {' '}
            {product.id} ---- {product.title}
          </div>
        );
      })}
      <Paginator pages={totalPages} handleClick={handleClick} />
    </div>
  );
}

function Paginator({
  pages,
  handleClick,
}: {
  pages: number | null;
  handleClick: (index: number) => void;
}) {
  if (!pages) {
    return <div>Loading Pages...</div>;
  }

  return (
    <div className="flex flex-row">
      {Array.from({ length: pages }).map((_, index) => {
        console.log('hello', index);
        return (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="text-black bg-white w-screen border-solid border-black bg-[red]"
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
}
