import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { type ReactElement } from "react";

const themes = [
  {
    id: 1,
    label: "배경화",
  },
  {
    id: 2,
    label: "배경화",
  },
  {
    id: 3,
    label: "정물화",
  },
];

const styles = [
  { id: 1, label: "미니어처" },
  { id: 2, label: "제품샷" },
  { id: 3, label: "초상화" },
  { id: 4, label: "흑백" },
  { id: 5, label: "유화" },
  { id: 6, label: "도트" },
  { id: 7, label: "미니멀리즘" },
  { id: 8, label: "포스터" },
  { id: 9, label: "초현실주의" },
  { id: 10, label: "르네상스" },
  { id: 11, label: "팝아트" },
  { id: 12, label: "애니메이션" },
];

interface SelectProps {
  handleChange: (id: number) => void;
}
export const ThemeSelect = ({ handleChange }: SelectProps): ReactElement => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Theme</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        defaultValue={1}
        label="Theme"
        onChange={(e) => {
          handleChange(e.target.value as number);
        }}
      >
        {themes.map((theme) => (
          <MenuItem value={theme.id} key={theme.id}>
            {theme.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>테마는 그림의 종류를 결정합니다</FormHelperText>
    </FormControl>
  );
};
export const StyleSelect = ({ handleChange }: SelectProps): ReactElement => {
  return (
    <FormControl fullWidth>
      <InputLabel id="style-select-label">Style</InputLabel>
      <Select
        labelId="style-select-label"
        id="style-select-label"
        defaultValue={1}
        label="Theme"
        onChange={(e) => {
          handleChange(e.target.value as number);
        }}
      >
        {styles.map((styles) => (
          <MenuItem value={styles.id} key={styles.id}>
            {styles.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>스타일은 그림의 화풍을 결정합니다</FormHelperText>
    </FormControl>
  );
};
