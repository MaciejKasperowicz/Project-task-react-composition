import fetchData from "./fetchData";

export const addData = async (newData) => {
    const options = {
        method: "POST",
        body: JSON.stringify(newData),
        headers: { "Content-Type": "application/json" }
    }

    const data = await fetchData(options);
    return data
}

export default addData;