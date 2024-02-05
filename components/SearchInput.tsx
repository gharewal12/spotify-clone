'use client';
import qs from 'query-string';
import useDebounce from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Input from './Input';

const SearchInput = () => {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState<string>("");
    const debouncedValue = useDebounce<string>(searchValue, 500);

    useEffect(() => {
        const query = {
            title: debouncedValue,
        }

        const url = qs.stringifyUrl({
            url: '/search',
            query: query
        });

        router.push(url);
    }, [debouncedValue, router]);

    return (
        <Input
            placeholder='What do you want to listen to?'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
        />
    )
}

export default SearchInput