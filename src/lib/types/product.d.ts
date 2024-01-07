
export type EtsyDescription = {
    product_title?: string,
    product_description?: string,
    product_keywords?: string
}

export type chatImageSetting = {
    storeDescription: string
    productDescription: string
    imageUrl: string
} 

export type chatProductSetting = {
    storeDescription: string
    productDescription: string
    imageDescription: string
    temperature: number
    charatorCount: number
} 
