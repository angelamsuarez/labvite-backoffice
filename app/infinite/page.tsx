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
  const params = { skip: skip.toString(), limit: LIMIT.toString() }
  const searchParams = new URLSearchParams(params);

  return `${url}?${searchParams.toString()}`
}


export default function TestPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isFetching, setIsFetching] = useState(false);
  const [total, setTotal] = useState(0);
  const divsito = useRef(null)

  async function getData (skip: number) {
    try {
      setIsFetching(true)
      const url = getUrl(BASE_URL, skip)
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = (await response.json()) as ProductsAPIResponse
      setTotal(data.total)
      setProducts(prevData => [...prevData, ...data.products])
      console.log(data, 'response')
    } catch(e) {
      console.log('there has been an error', e)
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    getData(0);
  }, [])


  const options = {
    root: null,
    rootMargin: "0px",
  };

  const intersectionCallback: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isFetching && products.length < total) {
        getData(products.length);
      }
    });
  }

  useEffect(() => {
    if (!divsito.current) {
      return
    }
    const observer = new IntersectionObserver(intersectionCallback, options);
    observer.observe(divsito.current)


    return () => observer.disconnect();
  }, [divsito, isFetching])

  return (
   <div className="text-black bg-white w-screen h-screen">

    {products.map((product, index) => {
      return <div key={product.id}> {product.id} ---- {product.title}</div>
    })}
    <div ref={divsito}/>
   </div>
  );
} 


function Paginator ({ pages, handleClick }: { pages: number | null, handleClick: (index:number) => void}){

  if (!pages) {
    return <div>Loading Pages...</div>
  }

 

  return (
 <div className='flex flex-row'>
 { Array.from({ length: pages }).map((_, index) => {
  console.log('hello', index)
  return <button key={index} onClick={() => handleClick(index)} className="text-black bg-white w-screen border-solid border-black bg-[red]" >{index + 1}</button>
})}
 
 </div>
  )
 


}