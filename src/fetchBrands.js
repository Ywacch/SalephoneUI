async function fetchBrands() {

    const res = await fetch(
        `https://salephone.works/phones/brands`
    );

    if (!res.ok) {
        throw new Error(`brands fetch not ok`);
    }
    
    return res.json();
      
}

export default fetchBrands;