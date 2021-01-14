
import React, {useState, useEffect} from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";

function DropDown(props) {
    const {values, name, visibleLabel, initialValue, changeHandler, styleClasses} = props
    return (
    <FormControl className={styleClasses.formControl}>
      <InputLabel id={name+"-label"}>{visibleLabel}</InputLabel>
      <Select
        labelId={name+"label"}
        id={name}
        value={initialValue}
        onChange={changeHandler}
      >
        {Object.keys(values).map((label) => (
          <MenuItem value={label} key={label}>
            {values[label]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    )
}

export default DropDown
