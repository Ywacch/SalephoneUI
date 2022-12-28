const fetchPhone = async ({queryKey}) => {
    const id = queryKey[1];
    const result = await fetch(`https://salephone.works/phones/${id}?detailed=true`);

    if (!result.ok){
        throw new Error(`phones/${id} fetch not ok`);
    }

    return result.json();
}

export default fetchPhone;