"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RedirectPage() {
    const router = useRouter()
    const params = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/get?shorturl=${params?.shorturl}`)
                if(res.ok){
                    const url = await res.text()
                    router.push(url)
                }else{
                    router.push("/not-found")
                }
            } catch (error) {
                console.error("Error fetching URL:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <h1>Redirecting...</h1>
        </>
    );
}
