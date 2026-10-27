export function FormInput({ label, name, value, onChange, type = 'text', error }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input type={type} name={name} value={value ?? ''} onChange={onChange} />
      {error ? <small>{error}</small> : null}
    </label>
  );
}
