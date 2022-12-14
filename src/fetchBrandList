async function fetchBrandList(){
    const res = await fetch(
        `https://salephone.works/phones/brands`
    );

    if (!res.ok) {
        throw new Error(`Brands fetch not ok`);
    }
    
      return res.json();
}

export default fetchBrandList;