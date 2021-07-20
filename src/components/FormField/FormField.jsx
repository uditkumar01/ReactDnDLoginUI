export function FormField({ required, type, placeholder, style }) {
  return (
    <div class="form__field">
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        style={style}
      />
    </div>
  );
}
