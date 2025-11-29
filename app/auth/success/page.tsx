"use client";

import { Suspense } from "react";
import SuccessHandler from "./success-handler";

export default function AuthSuccessPage() {
    return (
        <Suspense fallback={<p>로그인 처리중...</p>}>
            <SuccessHandler />
        </Suspense>
    );
}
