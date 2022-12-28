async function fetchSearch({queryKey}) {
    
    const {brand, series} = queryKey[1];
    const res = await fetch(
        `https://salephone.works/phones/?brand=${brand}&series=${series}`
    );

    if(!res.ok) throw new Error(`phone search not okay: ${brand}, ${series}`);

    return res.json();
}

export default fetchSearch;