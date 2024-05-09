import {
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  styled,
} from '@mui/material';
import React from 'react';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 8,
    width: '150px',
    // position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #00A0F7',
    fontSize: 16,
    padding: '10px 20px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 8,
      //   borderColor: '#00A0F7',
      //   boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

type Props = { values: string[] };

const CustomSelect: React.FC<Props> = ({ values }: Props) => {
  const [value, setValue] = React.useState();

  const handleChange = (event: { target: { value: string } }) => {
    setValue(event.target.value);
  };

  return (
    <>
      <div>
        <FormControl sx={{ m: 1 }} variant="standard">
          <InputLabel id="input-label">Sports</InputLabel>
          <Select
            labelId="custom-select-label"
            id="custom-select"
            value={value}
            onChange={handleChange}
            input={<BootstrapInput />}
          >
            {values?.map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
};

export default CustomSelect;
