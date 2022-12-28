import Phone from './Phone'

const Catalogue = ({phones}) => {
    return (
        <div>
            {!phones.length ? (
                <h1>No phones found</h1>
            ): (
                phones.map((phone) => {
                    return(
                        <Phone
                            id={phone.phone_id}
                            key={phone.phone_id}
                            brand={phone.brand}
                            series={phone.series}
                            model={phone.model}
                            name={phone.phone_name}
                            size={phone.storage_size}
                        />
                    );
                })
            )}
        </div>
    );
};

export default Catalogue;