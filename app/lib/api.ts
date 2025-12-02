export async function apiGet(url: string){
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken"): null;

    const res = await fetch(`https://api.gitfit.site${url}`,{
        method : "GET",
        headers :{
            Authorization: token ? `Bearer ${token}` : "",
        },
    });
    return res.json();
}