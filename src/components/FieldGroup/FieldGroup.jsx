import { useRef } from "react";
import { DragIcon } from "../DragIcon/DragIcon";
import { FormField } from "../FormField/FormField";

export function FieldGroup({
  fields,
  draggable,
  dragging,
  handleDragStart,
  handleDragEnter,
  handleDragEnd,
  index
}) {
  return (
    <div
      class={`login__body arrow display-${fields.display} ${
        dragging ? "dragging-item" : ""
      }`}
      onDragStart={(event) => handleDragStart(event, fields, index)}
      onDragEnter={(event) => handleDragEnter(event, fields, index)}
      onDragEnd={handleDragEnd}
      draggable={draggable}
    >
      {draggable && <DragIcon />}
      {fields?.field &&
        fields.field.map((field) => {
          return <FormField key={field.type} {...field} />;
        })}
    </div>
  );
}
