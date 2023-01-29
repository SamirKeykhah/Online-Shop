export const getProductsCategory = async ()=>{
    const data = await fetch("https://fakestoreapi.com/products/categories")
    .then((res) => {
      return res.json();
    })
    .catch(() => {
     // if (err instanceof Error) console.log(err.message);
    });
    return data
}