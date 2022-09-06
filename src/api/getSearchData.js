import fetchData from "./fetchData";

export const getSearchData = async (searchValue) => {
    const data = await fetchData({}, `?firstName_like=${searchValue}`);
    return data
}

export default getSearchData;