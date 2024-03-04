import {
  Box,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Divider,
} from "@mui/material";
import { FC, useState, ChangeEvent } from "react";
import { Layout } from "../types/Layout";

interface LayoutComponentProps {
  layoutOptions: Layout[];
  value: Layout;
  onChange: (arg0: Layout) => void;
}

export const LayoutComponent: FC<LayoutComponentProps> = (props) => {
  const [selectedOption, setSelectedOption] = useState<Layout | null>();
  const [mediaVol, setMediaVol] = useState("");
  const [textfieldError, setTextfieldError] = useState(false);
  const handleCheckboxChange = (option: Layout) => {
    if (selectedOption === option) {
      setSelectedOption(null);
    } else {
      setSelectedOption(option);
      props.onChange(option);
    }
  };
  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      if (/^\d*$/.test(event.target.value)) {
        setMediaVol(event.target.value);
        setTextfieldError(false);
        props.value.params.mediaVolume = parseInt(event.target.value);
      } else {
        setTextfieldError(true);
      }
    }
  };
  return (
    <>
      <Box component="form" noValidate autoComplete="off" width={"100%"}>
        <FormGroup>
          {props.layoutOptions.map((option, index) => {
            return (
              <>
                <FormControlLabel
                  sx={{ marginTop: 2 }}
                  key={index}
                  label={option.name}
                  control={
                    <Checkbox
                      value={props.value}
                      onChange={() => handleCheckboxChange(option)}
                      checked={selectedOption === option}
                    />
                  }
                />
                {selectedOption === option && (
                  <TextField
                    variant="filled"
                    label="Volume of media (ml)"
                    value={mediaVol}
                    onChange={handleTextChange}
                    defaultValue={""}
                    error={textfieldError}
                    helperText={
                      textfieldError ? "Please input numbers only" : ""
                    }
                  />
                )}
                <Divider />
              </>
            );
          })}
        </FormGroup>
      </Box>
    </>
  );
};
