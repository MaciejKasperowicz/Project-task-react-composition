import fetchData from "./fetchData";
export const loadData = async () => {
    const data = await fetchData();
    return data
}

export default loadData;