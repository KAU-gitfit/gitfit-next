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

export async function apiPost(url: string, body: any, includeAuth: boolean = false){
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    if (includeAuth && typeof window !== "undefined") {
        const token = localStorage.getItem("accessToken");
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
    }

    const res = await fetch(`https://api.gitfit.site${url}`,{
        method: "POST",
        headers,
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        throw new Error(`API request failed: ${res.status}`);
    }

    return res.json();
}