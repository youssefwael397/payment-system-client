import React, { useContext, useEffect, useState } from "react";
import { CategoriesContext } from './../CategoriesProvider';
import EditCategory from './EditCategory'
import DeleteCategory from './DeleteCategory'
import {
    TextField
} from "@mui/material";

function Categories() {
    const { categories } = useContext(CategoriesContext)
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [searchValue, setSearchValue] = useState("");


    useEffect(() => {
        if (searchValue !== "") {
            setFilteredCategories(
                categories.filter(
                    (category) =>
                        category.category_name
                            .toLowerCase()
                            .includes(searchValue.toLowerCase().trim())
                )
            );
        } else {
            setFilteredCategories(categories);
        }
    }, [categories, searchValue]);


    if (categories) {
        return (
            <div>
                {/* search input */}
                <TextField
                    className="w-100 my-2 "
                    id="outlined-basic"
                    hiddenLabel
                    variant="filled"
                    placeholder="ابحث باسم التصنيف"
                    type="search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    required
                />
                {filteredCategories.map((category) => (
                    <div key={category.category_name} className={` w-100 bg-white my-4 rounded shadow-lg p-4 d-flex justify-content-between align-items-center`}>
                        <p>{category.category_name}</p>
                        <div className="d-flex justify-content-between">
                            <EditCategory categoryInfo={category} />
                            {/* <DeleteCategory categoryInfo={category} /> */}
                        </div>
                    </div>
                ))}
                {filteredCategories.length < 1 && searchValue ? (
                    <h4 className="mt-3">
                        لا يوجد تصنيف بهذا الإسم{" "}
                        <span className="text-primary">{searchValue.trim()}</span>
                    </h4>
                ) : null}
            </div>
        );

    } else {
        return (
            <div className={` w-100 bg-white my-4 rounded shadow-lg p-4 d-flex justify-content-between align-items-center`}>
                لا يوجد تصنيفات
            </div>
        );
    }
}


export default Categories;
