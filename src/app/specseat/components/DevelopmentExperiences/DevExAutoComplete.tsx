/* eslint-disable react/jsx-key */
import styles from '../../style.module.css';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const DevExAutoComplete = ({
  options,
  value,
  setValue,
  placeholder,
  index,
  skillType,
}: {
  options: any;
  value: any;
  setValue: any;
  placeholder: string;
  index: number;
  skillType: string;
}) => {
  return (
    <Autocomplete
      className={`${styles.focus} border-2 border-transparent block w-3/4 bg-white px-1`}
      multiple
      id="tags-filled"
      value={value}
      options={options.map((option: any) => option.skill)}
      onChange={(event, newValue) => {
        setValue((prev: any) => {
          const updatedValues = [...prev.developmentExperiences];
          updatedValues[index] = {
            ...updatedValues[index],
            [skillType]: newValue,
          };
          return {
            ...prev,
            developmentExperiences: updatedValues,
          };
        });
      }}
      freeSolo
      renderTags={(value: readonly any[], getTagProps) =>
        value.map((option: string, index: number) => (
          <Chip
            variant="outlined"
            label={option}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          placeholder={placeholder}
        />
      )}
    />
  );
};

export default DevExAutoComplete;
