import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import  fetchPhone from "./fetchPhone";


const Details = () => {

    const {id} = useParams();
    const results = useQuery(["details", id], fetchPhone);

    if (results.isLoading){
        return(
            <div>
                <h2 className="loader">🌀</h2>
            </div>
        )
    }

    const phone = results.data;
    return(
        <div>
            <div>
                <h1>{phone.brand} {phone.series} {phone.model}</h1>
                <h2>{phone.storage_size}</h2>
            </div>
        </div>
    )
};

export default Details;