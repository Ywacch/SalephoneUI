import { useQuery } from "@tanstack/react-query";
import fetchBrands from "./fetchBrands";

export default function useBrands(){
    const results = useQuery(["brands"], fetchBrands);

    return [results?.data?.brands ?? [], results.status];
}