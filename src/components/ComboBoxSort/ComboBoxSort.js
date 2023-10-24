import React from 'react';

export default function ComboBoxSort() {
    return (
        <div className="combobox-sort">
            <label>Sắp xếp theo</label>
            <select class="form-select" aria-label="Default select example">
                <option selected>Chọn</option>
                <option value="1">Tăng dần</option>
                <option value="2">Giảm dần </option>
                <option value="3">Giảm giá</option>
            </select>
        </div>
    );
}
