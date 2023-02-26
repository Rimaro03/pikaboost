export interface User { 
    country: string,
    display_name: string,
    email: string,
    explicit_content: {
        filter_enabled: boolean,
        filter_locked: boolean
    },
    external_urls: object,
    followers: {
        total: number,
        href: string | null
    },
    href: string,
    id: string,
    images: [],
    product: string,
    type: string,
    uri: string
}