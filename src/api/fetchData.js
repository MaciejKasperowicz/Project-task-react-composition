export const fetchData = async (options = {}, additionalPath = "") => {
    const urlAPI = "http://localhost:3005/meetings";
    const url = `${urlAPI}${additionalPath}`;
    const response = await fetch(url, options);
    const data = await response.json();
    return data
}

export default fetchData