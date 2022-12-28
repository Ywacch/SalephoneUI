import { Link } from "react-router-dom";

const Phone = (props) =>{

    const {id, brand, series, model, name, size} = props;

    return(
        <Link to={`/details/${id}`}>
          <div>
            <h3>{name}</h3>
          </div>
        </Link>
    );
}

export default Phone;