export type Book = {
    id: number
    title: string
    author: string
    price: number
    category_id: number
    category: Category
  }
  
  export type Category = {
    id: number
    name: string
  }