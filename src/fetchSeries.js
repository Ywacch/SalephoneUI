async function fetchSeries({queryKey}) {
    const brand = queryKey[1];

    if(!brand) return[];

    const res = await fetch(
        `https://salephone.works/phones/series?brand=${brand}`
    );

    if (!res.ok) {
        throw new Error(`series: ${brand} fetch not ok`);
    }
    
    return res.json();
      
}

export default fetchSeries;