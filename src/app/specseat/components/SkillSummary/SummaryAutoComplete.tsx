/* eslint-disable react/jsx-key */
import styles from '../../style.module.css';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const SummaryAutoComplete = ({
  defaultData,
  setDefaultData,
  options,
  skillType,
  placeholder,
}: {
  defaultData: any;
  setDefaultData: any;
  options: any;
  skillType: string;
  placeholder: string;
}) => {
  return (
    <Autocomplete
      className={`${styles.focus} border-2 border-transparent block w-3/4 bg-white px-1`}
      multiple
      id="tags-filled"
      value={defaultData?.skillSummaries?.[skillType] || []}
      options={options.map((option: { skill: any }) => option.skill)}
      onChange={(event, newValue) => {
        setDefaultData((prev: { skillSummaries: any }) => ({
          ...prev,
          skillSummaries: {
            ...prev.skillSummaries,
            [skillType]: newValue,
          },
        }));
      }}
      freeSolo
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
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

export default SummaryAutoComplete;
