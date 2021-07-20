import "./styles.css";
import { FieldGroup } from "./components/FieldGroup/FieldGroup";
import { OrSeparator } from "./components/OrSeparator/OrSeparator";
import { CardFooter } from "./components/CardFooter/CardFooter";
import { useState, useRef } from "react";

export default function App() {
  const [dragging, setDragging] = useState(false);
  const dragItem = useRef();
  const dragNode = useRef();
  const dragTarget = useRef();

  const [fieldGrps, setFieldGrps] = useState([
    {
      display: "block",
      field: [
        {
          type: "tel",
          placeholder: "Phone",
          style: {
            borderRadius: "0.25em",
            display: "flex"
          }
        }
      ]
    },
    {
      display: "block",
      field: [
        {
          type: "email",
          placeholder: "Email",
          style: {}
        },
        {
          type: "password",
          placeholder: "Password",
          style: {}
        }
      ]
    }
  ]);

  const [checks, setChecks] = useState([
    {
      text: "Validate using Email and Password",
      checked: true
    },
    {
      text: "Validate using Phone Number",
      checked: true
    }
  ]);

  const handleDragStart = (event, fields, index) => {
    console.log("dragging starting");
    setTimeout(() => {
      setDragging(true);
    }, 0);
    dragNode.current = event.target;
  };

  const handleDragEnd = (event) => {
    event.preventDefault();
    console.log("dragging ending");
    if (
      dragTarget.current &&
      dragNode.current &&
      dragTarget.current !== dragNode.current
    ) {
      const newGrps = JSON.parse(JSON.stringify(fieldGrps));
      [newGrps[0], newGrps[1]] = [newGrps[1], newGrps[0]];
      setFieldGrps(newGrps);
    }
    setDragging(false);
    dragTarget.current = null;
    dragNode.current = null;
  };

  const handleDragEnter = (event) => {
    dragTarget.current = event.target;
  };

  return (
    <div className="App">
      <div class="align">
        <div class="grid">
          <div class="checkboxes">
            {checks.map(({ text, checked }, index) => (
              <div
                class="form-field primary-bg bg-inherit"
                key={`${index}`}
                style={{ margin: "1rem" }}
                onClick={(event) => {
                  event.preventDefault();
                  setChecks((checks) => {
                    return checks.map((check) => {
                      if (check.text === text) {
                        return { ...check, checked: !check?.checked };
                      }
                      return check;
                    });
                  });
                  setFieldGrps((fieldGrps) => {
                    return fieldGrps.map((grp) => {
                      if (
                        (grp.field[0].type === "tel" &&
                          text.includes("Phone")) ||
                        (grp.field[0].type !== "tel" && text.includes("Email"))
                      ) {
                        return {
                          ...grp,
                          display: grp?.display === "none" ? "block" : "none"
                        };
                      }
                      return grp;
                    });
                  });
                }}
              >
                <label class="checkbox-label">
                  <input
                    type="checkbox"
                    class="input-checkbox"
                    checked={checked}
                  />
                  <p
                    style={{
                      top: "4px",
                      borderColor: "var(--teal-dark-color)"
                    }}
                    class="tick-icon"
                  ></p>
                  <small>{text}</small>
                </label>
              </div>
            ))}
          </div>
          <form class="form login">
            <header class="login__header">
              <h3 class="login__title">Login</h3>
            </header>

            <h2
              className={`choose-text ${
                checks.some((check) => check.checked) ? "not-visible" : ""
              }`}
            >
              Please choose the verification method
            </h2>

            {fieldGrps.map((fieldGrp, index) => {
              const allChecked = checks.every((check) => check.checked);
              return (
                <>
                  <FieldGroup
                    key={`${index}grp`}
                    fields={fieldGrp}
                    draggable={allChecked}
                    dragging={dragging}
                    index={index}
                    handleDragStart={handleDragStart}
                    handleDragEnter={handleDragEnter}
                    handleDragEnd={handleDragEnd}
                  />
                  {!index && allChecked ? (
                    <OrSeparator key={`${index}sep`} />
                  ) : (
                    ""
                  )}
                </>
              );
            })}

            <CardFooter />
          </form>
        </div>
      </div>
    </div>
  );
}
