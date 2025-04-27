import React, { useState } from 'react';
import { Category, Subcategory } from '../types';
import Select from './ui/Select';
import { ChevronRight } from 'lucide-react';

interface CategorySelectorProps {
  categories: Category[];
  onCategoryChange: (categoryId: string) => void;
  onSubcategoryChange: (subcategoryId: string) => void;
  selectedCategory: string;
  selectedSubcategory: string;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  onCategoryChange,
  onSubcategoryChange,
  selectedCategory,
  selectedSubcategory
}) => {
  const [showSubcategories, setShowSubcategories] = useState(true);
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value;
    onCategoryChange(categoryId);
    
    // Auto-select the first subcategory when category changes
    const category = categories.find(c => c.id === categoryId);
    if (category && category.subcategories.length > 0) {
      onSubcategoryChange(category.subcategories[0].id);
      setShowSubcategories(true);
    } else {
      setShowSubcategories(false);
    }
  };
  
  const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSubcategoryChange(e.target.value);
  };
  
  // Prepare the category options
  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.name
  }));
  
  // Find the selected category
  const currentCategory = categories.find(c => c.id === selectedCategory);
  
  // Prepare the subcategory options if a category is selected
  const subcategoryOptions = currentCategory
    ? currentCategory.subcategories.map(subcategory => ({
        value: subcategory.id,
        label: subcategory.name
      }))
    : [];
  
  // Get the selected subcategory description
  const selectedSubcategoryObj = currentCategory?.subcategories.find(
    s => s.id === selectedSubcategory
  );
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Category"
          options={categoryOptions}
          value={selectedCategory}
          onChange={handleCategoryChange}
        />
        
        {showSubcategories && subcategoryOptions.length > 0 && (
          <Select
            label="Subcategory"
            options={subcategoryOptions}
            value={selectedSubcategory}
            onChange={handleSubcategoryChange}
          />
        )}
      </div>
      
      {selectedSubcategoryObj && (
        <div className="bg-gray-50 p-3 rounded-md flex items-start">
          <div className="text-blue-500 mr-2 mt-0.5">
            <ChevronRight size={16} />
          </div>
          <p className="text-sm text-gray-600">
            {selectedSubcategoryObj.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default CategorySelector;