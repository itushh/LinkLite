import { getUrl } from "@/lib/firebase"

export async function GET(req){
    const url = new URL(req.url, `http://${req.headers.host}`)
    const shorturl = url.searchParams.get('shorturl')
    
    return getUrl(shorturl)
}