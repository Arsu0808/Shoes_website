import './services.css'

export function ServiceFilters({
  categories,
  priceFilters,
  durationFilters,
  sortOptions,
  filters,
  onChange,
}) {
  const handleChange = (key) => (event) => {
    onChange({ ...filters, [key]: event.target.value })
  }

  return (
    <div className="services-filters">
      <div className="services-filters__search">
        <label htmlFor="service-search">Search</label>
        <input
          id="service-search"
          type="text"
          placeholder="Search service name..."
          value={filters.search}
          onChange={handleChange('search')}
        />
      </div>

      <div className="services-filters__controls">
        <FilterSelect
          id="category"
          label="Category"
          value={filters.category}
          onChange={handleChange('category')}
          options={categories}
        />
        <FilterSelect
          id="price"
          label="Price"
          value={filters.price}
          onChange={handleChange('price')}
          options={priceFilters}
        />
        <FilterSelect
          id="duration"
          label="Duration"
          value={filters.duration}
          onChange={handleChange('duration')}
          options={durationFilters}
        />
        <FilterSelect
          id="sort"
          label="Sort by"
          value={filters.sort}
          onChange={handleChange('sort')}
          options={sortOptions}
        />
      </div>
    </div>
  )
}

function FilterSelect({ id, label, value, onChange, options }) {
  return (
    <label className="filter-select" htmlFor={id}>
      <span>{label}</span>
      <select id={id} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

