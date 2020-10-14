import { Category } from './CategoryModel';

export class SubCategory {
    id: number;
    subCategoryName: string;
    categoryId: number;
    category: Category;
}
