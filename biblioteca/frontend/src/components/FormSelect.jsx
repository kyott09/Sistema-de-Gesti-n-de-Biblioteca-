export function FormSelect({ label, name, value, onChange, options = [], error }) {
  return (
    <label className="field">
      <span>{label}</span>
      <select name={name} value={value ?? ''} onChange={onChange}>
        <option value="">Seleccionar</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <small>{error}</small> : null}
    </label>
  );
}
