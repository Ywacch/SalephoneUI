import { useQuery } from "@tanstack/react-query";
import fetchSeries from "./fetchSeries";

export default function useSeries(brand){
    const results = useQuery(["series", brand], fetchSeries);

    return [results?.data?.series ?? [], results.status];
}