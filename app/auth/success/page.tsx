"use client";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

import {useEffect} from "react";
import {useSearchParams,useRouter} from "next/navigation";


export default function AuthSuccessPage(){
    const params = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const token = params.get("token");

        if (token){
            localStorage.setItem("accessToken",token);
            router.replace("/"); //로그인 완료후 메인으로 이동
        }
    }, [params,router]);

    return <p>로그인 처리중...</p>
}