import { useState } from "react";
import useSeries from "./useSeries";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchSearch";
import useBrands from "./useBrands";
import Catalogue from './Catalogue';

const SearchParams = () => {
    const [BRANDS] = useBrands();

    const [requestParams, setRequestParams] = useState({
        brand: "",
        series: "",
    });

    const[brand, setBrand] = useState("");
    const[series] = useSeries(brand);

    const results = useQuery(["search", requestParams], fetchSearch);
    const phones = results?.data ?? [];

    return(
        <div>
            <form 
                onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const obj = {
                        brand: formData.get("brand") ?? "",
                        series: formData.get("series") ?? "",
                    };
                    setRequestParams(obj);
                }}>
                    <label htmlFor="brand">
                        Brand
                        <select
                        id="brand"
                        name="brand"
                        onChange={(e) => {
                            setBrand(e.target.value);
                        }}
                        >
                            <option/>

                            {BRANDS.map((brand) => (
                                <option key={brand} value={brand}>
                                {brand}
                                </option>
                            ))} 
                        </select>
                    </label>

                    <label htmlFor="series">
                        Series
                        <select disabled={!series.length} id="series" name="series">
                            <option/>
                            {series.map((serie) => (
                                <option key={serie} value={serie}>
                                    {serie}
                                </option>
                            ))}
                        </select>
                    </label>

                    <button>
                        Submit
                    </button>
            </form>
            <Catalogue phones={phones}/>
        </div>
    );
}

export default SearchParams;