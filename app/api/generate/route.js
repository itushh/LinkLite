import { setUrl } from "@/lib/firebase"

function isValidURL(url) {
    const pattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+|localhost)(:\d{1,5})?(\/[^\s]*)?$/;
    return pattern.test(url);
}

export async function POST(req){
    const formData = await req.formData();
    const url = formData.get("url");
    const shorturl = formData.get("shorturl"); 

    //Input Validation
    if(!url){
        return new Response(
            "URL cannot be blank", { status: 405 }
        )
    }else if(!shorturl){
        return new Response(
            "Short URL cannot be blank", { status: 405 }
        )
    }
    else if(!isValidURL(url)){
        return new Response(
            "Invalid URL", { status: 405 }
        )
    }

    return await setUrl(url, shorturl)
}